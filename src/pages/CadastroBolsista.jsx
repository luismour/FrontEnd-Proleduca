// src/pages/CadastroBolsista.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../api/axiosInstance';
// Supondo que você tenha a função validarCPF em um arquivo de utilitários
// Se não, defina-a aqui ou importe do local correto.
// Exemplo: import { validarCPF } from '../utils/validations';

// Definição da função validarCPF (se não estiver importando)
const validarCPF = (cpf) => {
  if (!cpf) return false;
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let soma = 0, resto;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.charAt(10));
};


export default function CadastroBolsista() {
  const { id: opportunityId } = useParams(); // ID do curso/oportunidade
  const navigate = useNavigate();

  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user")); // Dados do usuário logado

  useEffect(() => {
    async function fetchOpportunity() {
      try {
        const res = await axiosInstance.get(`/courses/${opportunityId}`);
        setOpportunity(res.data);
      } catch (error) {
        console.error("Erro ao buscar dados da oportunidade:", error);
      } finally {
        setLoading(false);
      }
    }

    if (opportunityId) {
      fetchOpportunity();
    } else {
      setLoading(false);
      console.error("ID da oportunidade não encontrado na URL.");
    }
  }, [opportunityId]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </main>
    );
  }

  if (!opportunity) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <p className="text-gray-600 dark:text-gray-300 text-lg">Dados da oportunidade não puderam ser carregados ou não foram encontrados.</p>
      </main>
    );
  }
  
  if (!user || !user.id) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Usuário não autenticado ou ID do usuário não encontrado. Por favor, faça login novamente.
        </p>
      </main>
    );
  }

  const inst = opportunity?.institutions;
  const location = inst
    ? `${inst.street || ''}, ${inst.number || ''} - ${inst.city || ''} / ${inst.state || ''}`.replace(/ , |, - | - /g, ', ').replace(/^,|, $/g, '')
    : 'Localização não disponível';

  // Tenta pré-popular com dados do 'user' do localStorage se disponíveis
  // Certifique-se que 'user.fullName' e 'user.cpf' existam no objeto 'user' do localStorage
  const initialValues = {
    fullName: user?.fullName || '', 
    cpf: user?.cpf || '', 
    dateOfBirth: user?.dateOfBirth ? user.dateOfBirth.split('T')[0] : '', // Formato YYYY-MM-DD
    needs: '', // 'Nenhuma' ou descrição da necessidade
    raceColor: '', // ['Branca', 'Preta', 'Parda', 'Amarela', 'Indígena', 'Prefiro não dizer']
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Nome completo é obrigatório.'),
    cpf: Yup.string()
      .required('CPF é obrigatório.')
      .test('valid-cpf', 'CPF inválido.', (value) => validarCPF(value)),
    dateOfBirth: Yup.date()
      .max(new Date(), 'Data de nascimento não pode ser no futuro.')
      .required('Data de nascimento é obrigatória.')
      .transform((value, originalValue) => {
        if (originalValue && typeof originalValue === 'string') {
          // Tenta converter DD/MM/YYYY para YYYY-MM-DD para o Yup.date()
          const parts = originalValue.split('/');
          if (parts.length === 3 && parts[2].length === 4) {
            return new Date(`${parts[2]}-${parts[1]}-${parts[0]}T00:00:00`); // Adiciona T00:00:00 para evitar problemas de fuso
          }
          // Se já for YYYY-MM-DD ou outro formato que Date entenda
          const date = new Date(originalValue + "T00:00:00"); // Adiciona T00:00:00
          return isNaN(date.getTime()) ? undefined : date;
        }
        return value;
      }),
    needs: Yup.string().required('Campo obrigatório. Digite "Nenhuma" se não aplicável.'),
    raceColor: Yup.string().required('Raça/Cor é obrigatória.'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm, setFieldError }) => {
    try {
      const cpfSemFormatacao = values.cpf.replace(/[^\d]/g, '');
      const needsBoolean = values.needs.toLowerCase().trim() !== 'nenhuma';

      const bolsistaPayload = {
        customers: user.id,
        fullName: values.fullName,
        dateOfBirth: values.dateOfBirth, // O input type="date" já envia YYYY-MM-DD
        needs: needsBoolean,
        cpf: cpfSemFormatacao, // Enviando CPF sem formatação. Verifique se o backend espera assim ou formatado.
        raceColor: values.raceColor,
      };

      console.log("Payload para criar bolsista:", bolsistaPayload);
      const bolsistaRes = await axiosInstance.post('/scholarship-holders/create', bolsistaPayload);

      console.log("Resposta completa da API (criação bolsista):", bolsistaRes);
      console.log("Dados da resposta da API (bolsistaRes.data):", bolsistaRes.data);


      const bolsistaId = bolsistaRes.data?.scholarshipHoldeId

      console.log("Bolsista ID extraído:", bolsistaId);

      if (!bolsistaId && bolsistaId !== 0) { 
        let errorMessage = "ID do bolsista não retornado corretamente após a criação.";
        if (bolsistaRes.data && typeof bolsistaRes.data === 'object') {
          errorMessage += ` Resposta recebida: ${JSON.stringify(bolsistaRes.data)}`;
        } else {
          errorMessage += ` Resposta recebida: ${String(bolsistaRes.data)}`;
        }
        throw new Error(errorMessage);
      }

      const inscricaoPayload = {
        scholarshipHolderId: bolsistaId,         
        courseId: parseInt(opportunityId),     
        registrationDate: new Date().toISOString().split('T')[0], 
        status: 'Ativo',
      };

      console.log("Payload para criar inscrição:", inscricaoPayload);
      await axiosInstance.post('/registrations/create', inscricaoPayload);

      alert('Inscrição realizada com sucesso!');
      resetForm();
      navigate('/minhas-bolsas');
    } catch (error) {
      console.error('Erro ao enviar dados:', error.response?.data || error.message);
      const apiError = error.response?.data?.message || error.message || "Ocorreu um erro desconhecido.";
      if (error.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(([key, value]) => {
          const formikField = key.includes('.') ? key.split('.')[1] : key;
          if (initialValues.hasOwnProperty(formikField)) {
            setFieldError(formikField, value);
          }
        });
      }
      alert(`Erro ao realizar inscrição: ${apiError}. Por favor, tente novamente.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <main className="min-h-[calc(100vh-384px)] bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full max-w-3xl bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 sm:p-8 md:p-10 my-8">
          <div className="mb-6 text-center md:text-left">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Inscrição para: <span className="text-blue-600 dark:text-blue-400">{opportunity.name}</span>
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Instituição: {inst?.name || 'N/A'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Local: {location}</p>
          </div>

          <Formik 
            initialValues={initialValues} 
            validationSchema={validationSchema} 
            onSubmit={handleSubmit}
            enableReinitialize 
          >
            {({ isSubmitting, dirty, isValid, errors, touched }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  <div>
                    <label htmlFor="fullName" className="form-label">Nome Completo do Bolsista*</label>
                    <Field id="fullName" type="text" name="fullName" placeholder="Nome completo do bolsista" className={`form-input ${touched.fullName && errors.fullName ? 'border-red-500 dark:border-red-400' : ''}`} />
                    <ErrorMessage name="fullName" component="p" className="text-red-500 dark:text-red-400 text-xs mt-1" />
                  </div>
                  <div>
                    <label htmlFor="cpf" className="form-label">CPF do Bolsista*</label>
                    <Field id="cpf" type="text" name="cpf" placeholder="000.000.000-00" className={`form-input ${touched.cpf && errors.cpf ? 'border-red-500 dark:border-red-400' : ''}`} />
                    <ErrorMessage name="cpf" component="p" className="text-red-500 dark:text-red-400 text-xs mt-1" />
                  </div>
                  <div>
                    <label htmlFor="dateOfBirth" className="form-label">Data de Nascimento do Bolsista*</label>
                    <Field id="dateOfBirth" type="date" name="dateOfBirth" className={`form-input ${touched.dateOfBirth && errors.dateOfBirth ? 'border-red-500 dark:border-red-400' : ''}`} />
                    <ErrorMessage name="dateOfBirth" component="p" className="text-red-500 dark:text-red-400 text-xs mt-1" />
                  </div>
                  <div>
                    <label htmlFor="needs" className="form-label">Necessidades Especiais*</label>
                    <Field id="needs" type="text" name="needs" placeholder="Nenhuma, Visual, Auditiva..." className={`form-input ${touched.needs && errors.needs ? 'border-red-500 dark:border-red-400' : ''}`} />
                    <ErrorMessage name="needs" component="p" className="text-red-500 dark:text-red-400 text-xs mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="raceColor" className="form-label">Raça/Cor do Bolsista*</label>
                    <Field id="raceColor" as="select" name="raceColor" className={`form-select ${touched.raceColor && errors.raceColor ? 'border-red-500 dark:border-red-400' : ''}`}>
                      <option value="">Selecione...</option>
                      <option value="Branca">Branca</option>
                      <option value="Preta">Preta</option>
                      <option value="Parda">Parda</option>
                      <option value="Amarela">Amarela</option>
                      <option value="Indígena">Indígena</option>
                      <option value="Prefiro não dizer">Prefiro não dizer</option>
                    </Field>
                    <ErrorMessage name="raceColor" component="p" className="text-red-500 dark:text-red-400 text-xs mt-1" />
                  </div>
                </div>

                <div className="md:col-span-2 text-center pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || !dirty || !isValid}
                    className="w-full sm:w-auto btn btn-primary px-8 py-3 text-base" 
                  >
                    {isSubmitting ? 'Enviando Inscrição...' : 'Confirmar Inscrição'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </main>
      <Footer />
    </>
  );
}