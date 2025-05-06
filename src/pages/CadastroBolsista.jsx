import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useOpportunities } from '../contexts/OpportunitiesContext.jsx';
import { locationsData } from '../data/localInfos';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function CadastroBolsista() {
  const { id } = useParams(); 
  const { opportunities } = useOpportunities(); 
  const navigate = useNavigate();

  const opportunity = opportunities.find(o => o.id === Number(id));
  const location = opportunity ? locationsData[opportunity.institution] : null;

  const user = JSON.parse(localStorage.getItem("user")); 

  if (!opportunity || !location || !user) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <p className="text-gray-600 text-lg">Dados da oportunidade não encontrados.</p>
      </main>
    );
  }

  const initialValues = {
    nome: '',
    cpf: '',
    nascimento: '',
    necessidades: '',
    raca: '',
  };

  function validarCPF(cpf) {
    // Remove os caracteres não numéricos
    cpf = cpf.replace(/[^\d]+/g, '');
  
    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
  
    // Verifica os dois dígitos verificadores
    let soma = 0;
    let resto;
  
    // Valida o primeiro dígito verificador
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
  
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(9))) {
      return false;
    }
  
    soma = 0;
    // Valida o segundo dígito verificador
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(10))) {
      return false;
    }
  
    return true;
  }

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório'),
    cpf: Yup.string()
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Formato inválido. Use XXX.XXX.XXX-XX')
      .test('valid-cpf', 'CPF inválido', (value) => validarCPF(value)) // Aqui adiciona a verificação do CPF
      .required('Campo obrigatório'),
    nascimento: Yup.date()
      .max(new Date(), 'Data inválida')
      .required('Campo obrigatório'),
    necessidades: Yup.string().required('Campo obrigatório'),
    raca: Yup.string().required('Campo obrigatório'),
  });
  

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // 1. Criar bolsista
      const bolsistaResponse = await axios.post('http://localhost:5000/bolsistas', {
        cliente_id: user.id, // precisa ter sido salvo no login
        nome_completo: values.nome,
        cpf: values.cpf,
        data_nascimento: values.nascimento,
        necessidades: values.necessidades.toLowerCase() !== 'nenhuma',
        raca_cor: values.raca,
      });

      const bolsistaId = bolsistaResponse.data.id;

      // 2. Criar inscrição
      await axios.post('http://localhost:5000/bolsistas', {
        bolsista_id: bolsistaId,
        curso_id: opportunity.id,
        data_inscricao: new Date().toISOString().split('T')[0],
        status: 'Pendente',
      });

      alert('Inscrição realizada com sucesso!');
      navigate('/minhas-bolsas');

    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert('Erro ao realizar inscrição. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <main className="min-h-[calc(100vh-300px)] bg-gray-100 flex items-center justify-center px-20">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-20 mt-20">
          <div className="flex items-center gap-3 mb-6">
            <img src={location.icon} alt="Logo da instituição" className="w-20 h-20" />
            <h1 className="text-xl font-semibold text-gray-800">
              {opportunity.course} na {opportunity.institution}
            </h1>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                  <Field
                    type="text"
                    name="nome"
                    placeholder="Ex: Pedro Ferreira Moura"
                    className="mt-1 w-full p-3 bg-gray-100 border border-gray-300 rounded-md placeholder-gray-500 text-sm"
                  />
                  <ErrorMessage name="nome" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">CPF</label>
                  <Field
                    type="text"
                    name="cpf"
                    placeholder="Ex: 000.000.000-00"
                    className="mt-1 w-full p-3 bg-gray-100 border border-gray-300 rounded-md placeholder-gray-500 text-sm"
                  />
                  <ErrorMessage name="cpf" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Data de nascimento</label>
                  <Field
                    type="date"
                    name="nascimento"
                    className="mt-1 w-full p-3 bg-gray-100 border border-gray-300 rounded-md placeholder-gray-500 text-sm"
                  />
                  <ErrorMessage name="nascimento" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Necessidades especiais</label>
                  <Field
                    type="text"
                    name="necessidades"
                    placeholder="Ex: Nenhuma"
                    className="mt-1 w-full p-3 bg-gray-100 border border-gray-300 rounded-md placeholder-gray-500 text-sm"
                  />
                  <ErrorMessage name="necessidades" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Raça/Cor</label>
                  <Field
                    as="select"
                    name="raca"
                    className="mt-1 w-full p-3 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-700"
                  >
                    <option value="">Selecione...</option>
                    <option value="Branca">Branca</option>
                    <option value="Preta">Preta</option>
                    <option value="Parda">Parda</option>
                    <option value="Amarela">Amarela</option>
                    <option value="Indígena">Indígena</option>
                    <option value="Prefiro não dizer">Prefiro não dizer</option>
                  </Field>
                  <ErrorMessage name="raca" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                <div className="md:col-span-2 mt-6 text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-10 py-4 rounded-md shadow-md hover:bg-blue-700 transition text-sm font-medium"
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
