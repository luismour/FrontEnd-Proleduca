// src/pages/RegisterForm.jsx
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import LoadingSpinner from "../components/LoadingSpinner"; // Importe o spinner

export default function RegisterForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    confirmationEmail: "",
    password: "",
    confirmationPassword: "",
    cpf: "",
    dateOfBirth: "",
    phone: "",
  };

  const validateCPF = (cpf) => {
    if (!cpf) return false;
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return false;
    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    return rev === parseInt(cpf.charAt(10));
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nome completo é obrigatório"),
    email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
    confirmationEmail: Yup.string()
      .oneOf([Yup.ref("email"), null], "Os e-mails não coincidem")
      .required("Confirmação de e-mail é obrigatória"),
    password: Yup.string().min(6, "A senha deve ter no mínimo 6 caracteres").required("Senha é obrigatória"),
    confirmationPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "As senhas não coincidem")
      .required("Confirmação de senha é obrigatória"),
    cpf: Yup.string()
      .required("CPF é obrigatório")
      .test("cpf-valid", "CPF inválido", (value) => validateCPF(value || "")),
    dateOfBirth: Yup.string()
      .required("Data de nascimento é obrigatória")
      .test("over-18", "Você deve ter mais de 18 anos.", (value) => {
        if (!value) return false;
        const dob = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
          age--;
        }
        return age >= 18;
      }),
    phone: Yup.string().required("Telefone é obrigatório"),
  });

  const handleSubmit = (values, { setSubmitting, setFieldError }) => {
    setSubmitError(null); 
    const payload = {
      fullName: values.name,
      email: values.email,
      password: values.password,
      cpf: values.cpf.replace(/[^\d]/g, ''), 
      dateOfBirth: values.dateOfBirth, 
      phone: values.phone.replace(/[^\d]/g, ''), 
      status: true, 
    };

    axiosInstance
      .post("/customers/create", payload)
      .then(() => {
        setSubmitted(true);

        setTimeout(() => navigate("/login", { state: { registrationSuccess: true } }), 3000);
      })
      .catch((err) => {
        console.error("Erro ao cadastrar:", err.response?.data || err.message);
        const errorMessage = err.response?.data?.message || err.response?.data?.error || "Ocorreu um erro ao tentar realizar o cadastro. Verifique os dados ou tente novamente mais tarde.";
        if (err.response?.data?.errors) {
            Object.entries(err.response.data.errors).forEach(([key, value]) => {
                const formikField = key.includes('.') ? key.split('.')[1] : key;
                if (initialValues.hasOwnProperty(formikField)) {
                    setFieldError(formikField, value);
                }
            });
        }
        setSubmitError(errorMessage);
      })
      .finally(() => {

         if (typeof setSubmitting === 'function') { 
            setSubmitting(false);
        }
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center px-4 py-8 md:py-12">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        {/* Lado Esquerdo */}
        <div className="w-full md:w-2/5 bg-blue-600 p-8 md:p-12 text-white flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Já tem uma conta?
          </h1>
          <p className="text-base md:text-lg text-blue-100 mb-8">
            Faça login para acessar seus cursos e oportunidades exclusivas.
          </p>
          <Link
            to="/login"
            className="px-8 py-3 font-semibold rounded-lg bg-white text-blue-600 hover:bg-blue-50 shadow-md transition-all duration-150 ease-in-out transform hover:scale-105"
          >
            Entrar
          </Link>
        </div>

        {/* Lado Direito - Formulário */}
        <div className="w-full md:w-3/5 p-6 sm:p-8 md:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 text-center md:text-left">
            Crie sua Conta Edupass
          </h2>
          <p className="text-gray-600 mb-8 text-center md:text-left">
            Preencha os campos abaixo para começar.
          </p>

          {submitted ? (
            <div className="text-center py-10">
              <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-2xl font-semibold text-green-600">Cadastro Realizado!</h3>
              <p className="mt-2 text-gray-600">
                Você será redirecionado para a página de login em alguns segundos...
              </p>
            </div>
          ) : (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="space-y-5">
                  {submitError && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                      <p className="font-bold">Erro no Cadastro</p>
                      <p>{submitError}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    {/* ... seus Fields ... */}
                    <div>
                      <label htmlFor="name" className="form-label">Nome Completo*</label>
                      <Field id="name" name="name" placeholder="Seu nome completo" className={`form-input ${touched.name && errors.name ? 'border-red-500' : ''}`} />
                      <ErrorMessage name="name" component="p" className="text-red-600 text-xs mt-1" />
                    </div>
                    <div>
                      <label htmlFor="cpf" className="form-label">CPF*</label>
                      <Field id="cpf" name="cpf" placeholder="000.000.000-00" className={`form-input ${touched.cpf && errors.cpf ? 'border-red-500' : ''}`} />
                      <ErrorMessage name="cpf" component="p" className="text-red-600 text-xs mt-1" />
                    </div>
                    <div>
                      <label htmlFor="email" className="form-label">E-mail*</label>
                      <Field id="email" name="email" type="email" placeholder="seuemail@example.com" className={`form-input ${touched.email && errors.email ? 'border-red-500' : ''}`} />
                      <ErrorMessage name="email" component="p" className="text-red-600 text-xs mt-1" />
                    </div>
                    <div>
                      <label htmlFor="confirmationEmail" className="form-label">Confirmar E-mail*</label>
                      <Field id="confirmationEmail" name="confirmationEmail" type="email" placeholder="Confirme seu e-mail" className={`form-input ${touched.confirmationEmail && errors.confirmationEmail ? 'border-red-500' : ''}`} />
                      <ErrorMessage name="confirmationEmail" component="p" className="text-red-600 text-xs mt-1" />
                    </div>
                     <div>
                      <label htmlFor="phone" className="form-label">Telefone*</label>
                      <Field id="phone" name="phone" placeholder="(00) 90000-0000" className={`form-input ${touched.phone && errors.phone ? 'border-red-500' : ''}`} />
                      <ErrorMessage name="phone" component="p" className="text-red-600 text-xs mt-1" />
                    </div>
                    <div>
                      <label htmlFor="dateOfBirth" className="form-label">Data de Nascimento*</label>
                      <Field id="dateOfBirth" name="dateOfBirth" type="date" className={`form-input ${touched.dateOfBirth && errors.dateOfBirth ? 'border-red-500' : ''}`} />
                      <ErrorMessage name="dateOfBirth" component="p" className="text-red-600 text-xs mt-1" />
                    </div>
                    <div>
                      <label htmlFor="password" className="form-label">Senha*</label>
                      <Field id="password" name="password" type="password" placeholder="Mínimo 6 caracteres" className={`form-input ${touched.password && errors.password ? 'border-red-500' : ''}`} />
                      <ErrorMessage name="password" component="p" className="text-red-600 text-xs mt-1" />
                    </div>
                    <div>
                      <label htmlFor="confirmationPassword" className="form-label">Confirmar Senha*</label>
                      <Field id="confirmationPassword" name="confirmationPassword" type="password" placeholder="Repita sua senha" className={`form-input ${touched.confirmationPassword && errors.confirmationPassword ? 'border-red-500' : ''}`} />
                      <ErrorMessage name="confirmationPassword" component="p" className="text-red-600 text-xs mt-1" />
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn btn-primary text-base py-3 flex justify-center items-center" // Adicionado flex para centralizar spinner e texto
                    >
                      {isSubmitting ? (
                        <>
                          <LoadingSpinner size="h-5 w-5" color="text-white" />
                          <span className="ml-2">Cadastrando...</span>
                        </>
                      ) : (
                        "Criar Conta"
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
}