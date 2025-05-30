// src/pages/CadastroBolsista.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../api/axiosInstance';

export default function CadastroBolsista() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("Usuário logado:", user);
  console.log("ID do usuário:", user?.id);

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

    fetchOpportunity();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </main>
    );
  }

  const inst = opportunity?.institutions;
  const location = inst
    ? `${inst.street ?? '-'}, ${inst.number ?? '-'} - ${inst.city ?? '-'} / ${inst.state ?? '-'}`
    : 'Localização não disponível';

  if (!opportunity || !inst || !user) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <p className="text-gray-600 text-lg">Dados da oportunidade não encontrados.</p>
      </main>
    );
  }

  const initialValues = {
    fullName: '',
    cpf: '',
    dateOfBirth: '',
    needs: '',
    raceColor: '',
  };

  const validarCPF = (cpf) => {
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
      .test('valid-cpf', 'CPF inválido', validarCPF)
      .required('Campo obrigatório'),
    dateOfBirth: Yup.date().max(new Date(), 'Data inválida').required('Campo obrigatório'),
    needs: Yup.string().required('Campo obrigatório'),
    raceColor: Yup.string().required('Campo obrigatório'),
  });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Formata o CPF removendo caracteres
      const cpfSemFormatacao = values.cpf.replace(/[^\d]/g, '');

      // Converte a necessidade especial para booleano
      const needsBoolean = values.needs.toLowerCase() !== 'nenhuma';

      // Cria o bolsista
      const bolsistaRes = await axiosInstance.post('/scholarship-holders/create', {
        customers: user.id,
        fullName: values.fullName,
        cpf: cpfSemFormatacao,
        dateOfBirth: values.dateOfBirth,
        needs: needsBoolean,
        raceColor: values.raceColor,
      });

      const bolsistaId = bolsistaRes.data.id;

      // Cria a inscrição
      await axiosInstance.post('/registrations/create', {
        scholarshipHolders: bolsistaId,
        courses: opportunity.id,
        registrationDate: new Date().toISOString().split('T')[0],
        status: 'Ativo',
      });

      alert('Inscrição realizada com sucesso!');
      resetForm();
      navigate('/minhas-bolsas');
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert('Erro ao realizar inscrição. Por favor, tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <>
      <main className="min-h-[calc(100vh-300px)] bg-gray-100 flex items-center justify-center px-4 md:px-20">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6 md:p-10 mt-10">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-800">
              {opportunity.name} na {inst.name}
            </h1>
            <p className="text-sm text-gray-600">Local: {location}</p>
          </div>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nome Completo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                  <Field
                    type="text"
                    name="fullName"
                    placeholder="Ex: João da Silva"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* CPF */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                  <Field
                    type="text"
                    name="cpf"
                    placeholder="000.000.000-00"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage name="cpf" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Data de Nascimento */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                  <Field
                    type="date"
                    name="dateOfBirth"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Necessidades Especiais */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Necessidades Especiais</label>
                  <Field
                    type="text"
                    name="needs"
                    placeholder="Ex: Nenhuma"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage name="needs" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Raça/Cor */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Raça/Cor</label>
                  <Field
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
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md shadow-md transition"
                  >
                    {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
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
