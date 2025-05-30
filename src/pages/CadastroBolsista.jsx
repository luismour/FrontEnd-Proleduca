// src/pages/CadastroBolsista.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../api/axiosInstance';

export default function CadastroBolsista() {
  const { id } = useParams(); // ID do curso/oportunidade
  const navigate = useNavigate();

  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user")); // Dados do usuário logado

  useEffect(() => {
    async function fetchOpportunity() {
      try {
        const res = await axiosInstance.get(`/courses/${id}`);
        setOpportunity(res.data);
      } catch (error) {
        console.error("Erro ao buscar dados da oportunidade:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchOpportunity();
    } else {
      setLoading(false);
      console.error("ID da oportunidade não encontrado na URL.");
    }
  }, [id]);

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
        <p className="text-gray-600 text-lg">Dados da oportunidade não puderam ser carregados ou não foram encontrados.</p>
      </main>
    );
  }
  
  if (!user || !user.id) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <p className="text-gray-600 text-lg">
          Usuário não autenticado ou ID do usuário não encontrado. Por favor, faça login novamente.
        </p>
      </main>
    );
  }


  const inst = opportunity?.institutions;
  const location = inst
    ? `${inst.street || '-'}, ${inst.number || '-'} - ${inst.city || '-'} / ${inst.state || '-'}`
    : 'Localização não disponível';

  const initialValues = {
    fullName: user?.fullName || '', // Pré-popula se disponível no objeto user
    cpf: user?.cpf || '', // Pré-popula se disponível
    dateOfBirth: user?.dateOfBirth || '', // Pré-popula se disponível
    needs: '',
    raceColor: '',
  };

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

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Campo obrigatório'),
    cpf: Yup.string()
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Formato inválido (000.000.000-00)')
      .test('valid-cpf', 'CPF inválido', (value) => validarCPF(value))
      .required('Campo obrigatório'),
    dateOfBirth: Yup.date()
      .max(new Date(), 'Data de nascimento não pode ser no futuro.')
      .required('Campo obrigatório')
      .transform((value, originalValue) => { // Permite que o backend receba YYYY-MM-DD
        if (originalValue && typeof originalValue === 'string') {
          const [day, month, year] = originalValue.split('/');
          if (day && month && year && day.length === 2 && month.length === 2 && year.length === 4) {
            return new Date(`${year}-${month}-${day}`);
          }
          // Se já estiver no formato YYYY-MM-DD ou outro formato Date parseable
          const date = new Date(originalValue);
          return isNaN(date.getTime()) ? undefined : date;
        }
        return value;
      }),
    needs: Yup.string().required('Campo obrigatório. Digite "Nenhuma" se aplicável.'),
    raceColor: Yup.string().required('Campo obrigatório'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const cpfSemFormatacao = values.cpf.replace(/[^\d]/g, '');
      const needsBoolean = values.needs.toLowerCase() !== 'nenhuma';

      // 1. Criar o bolsista
      const bolsistaPayload = {
        customers: user.id, 
        fullName: values.fullName,
        dateOfBirth: values.dateOfBirth
, // Formato YYYY-MM-DD
        needs: needsBoolean,
        cpf: cpfSemFormatacao, 
        raceColor: values.raceColor,
      };
      
      console.log("Payload para criar bolsista:", bolsistaPayload);
      const bolsistaRes = await axiosInstance.post('/scholarship-holders/create', bolsistaPayload);
      
      const bolsistaId = bolsistaRes.data.id;
      console.log("Bolsista criado com ID:", bolsistaId);
      console.log("Dados da resposta da API (bolsistaRes.data):", bolsistaRes.data);

      if (!bolsistaId) {
        throw new Error("ID do bolsista não retornado após a criação.");
      }

      

      // 2. Criar a inscrição
      const inscricaoPayload = {
        scholarshipHolders: bolsistaId,
        courses: opportunity.id,
        registrationDate: new Date().toISOString().split('T')[0], // Campo corrigido e formato YYYY-MM-DD
        status: 'Ativo', 
      };

      console.log("Payload para criar inscrição:", inscricaoPayload);
      await axiosInstance.post('/registrations/create', inscricaoPayload);

      alert('Inscrição realizada com sucesso!');
      resetForm();
      navigate('/minhas-bolsas'); 
    } catch (error) {
      console.error('Erro ao enviar dados:', error.response ? error.response.data : error.message);
      alert(`Erro ao realizar inscrição: ${error.response?.data?.message || error.message}. Por favor, tente novamente.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <main className="min-h-[calc(100vh-300px)] bg-gray-100 flex items-center justify-center px-4 md:px-20">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6 md:p-10 mt-10 mb-10">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-800">
              Inscrição para: {opportunity.name} na {inst.name}
            </h1>
            <p className="text-sm text-gray-600">Local: {location}</p>
          </div>

          <Formik 
            initialValues={initialValues} 
            validationSchema={validationSchema} 
            onSubmit={handleSubmit}
            enableReinitialize // Permite que o formulário reaja a mudanças em initialValues
          >
            {({ isSubmitting, dirty, isValid }) => (
              <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nome Completo */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                  <Field
                    id="fullName"
                    type="text"
                    name="fullName"
                    placeholder="Ex: João da Silva"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* CPF */}
                <div>
                  <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                  <Field
                    id="cpf"
                    type="text"
                    name="cpf"
                    placeholder="000.000.000-00"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage name="cpf" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Data de Nascimento */}
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                  <Field
                    id="dateOfBirth"
                    type="date" // Input type date espera YYYY-MM-DD
                    name="dateOfBirth"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Necessidades Especiais */}
                <div>
                  <label htmlFor="needs" className="block text-sm font-medium text-gray-700 mb-1">Necessidades Especiais</label>
                  <Field
                    id="needs"
                    type="text"
                    name="needs"
                    placeholder="Ex: Nenhuma, Visual, Auditiva..."
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage name="needs" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Raça/Cor */}
                <div className="md:col-span-2">
                  <label htmlFor="raceColor" className="block text-sm font-medium text-gray-700 mb-1">Raça/Cor</label>
                  <Field
                    id="raceColor"
                    as="select"
                    name="raceColor"
                    className="w-full p-3 border border-gray-300 rounded-md bg-white"
                  >
                    <option value="">Selecione...</option>
                    <option value="Branca">Branca</option>
                    <option value="Preta">Preta</option>
                    <option value="Parda">Parda</option>
                    <option value="Amarela">Amarela</option>
                    <option value="Indígena">Indígena</option>
                    <option value="Prefiro não dizer">Prefiro não dizer</option>
                  </Field>
                  <ErrorMessage name="raceColor" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Botão de Enviar */}
                <div className="md:col-span-2 text-center mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting || !dirty || !isValid}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md shadow-md transition disabled:opacity-50"
                  >
                    {isSubmitting ? 'Cadastrando...' : 'Confirmar Inscrição'}
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