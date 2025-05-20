import { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [submitted, setSubmitted] = useState(false);
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
    name: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
    confirmationEmail: Yup.string()
      .oneOf([Yup.ref("email")], "E-mails não coincidem.")
      .required("Campo obrigatório"),
    password: Yup.string().min(6, "Mínimo 6 caracteres").required("Campo obrigatório"),
    confirmationPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Senhas não coincidem.")
      .required("Campo obrigatório"),
    cpf: Yup.string()
      .required("Campo obrigatório")
      .test("cpf-valid", "CPF inválido", (value) => validateCPF(value || "")),
    dateOfBirth: Yup.string()
      .required("Campo obrigatório")
      .test("over-18", "Você precisa ter mais de 18 anos.", (value) => {
        if (!value) return false;
        const dob = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        return age > 18 || (age === 18 && m >= 0);
      }),
    phone: Yup.string().required("Campo obrigatório"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const payload = {
      fullName: values.name,
      email: values.email,
      password: values.password,
      cpf: values.cpf,
      dateOfBirth: values.dateOfBirth,
      phone: values.phone,
      status: true
    };

    axios
      .post("http://localhost:8080/customers/create", payload) // 
      .then(() => {
        setSubmitted(true);
        setSubmitting(false);
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch((err) => {
        console.error("Erro ao cadastrar:", err);
        setSubmitting(false);
      });
  };

  return (
    <div className="flex min-h-screen bg-[#1f2fd3] items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        <div className="flex flex-col justify-center items-center bg-[#1652f0] text-white w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-2">Bem-vindo de volta!</h2>
          <p className="text-center text-sm mb-6">Acesse sua conta agora mesmo.</p>
          <a href="/login">
            <button className="border border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-[#1652f0] transition">
              Entrar
            </button>
          </a>
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-10">
          <h2 className="text-xl font-bold text-[#1652f0] text-center mb-6">Crie sua conta</h2>

          {submitted ? (
            <div className="text-green-600 text-center font-semibold">
              Cadastro realizado com sucesso! Redirecionando para a página de login...
            </div>
          ) : (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label htmlFor="name" className="text-sm text-[#1652f0]">Nome</label>
                    <Field
                      id="name"
                      name="name"
                      placeholder="Nome"
                      className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage name="name" component="p" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="email" className="text-sm text-[#1652f0]">E-mail</label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="E-mail"
                      className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="confirmationEmail" className="text-sm text-[#1652f0]">Confirmar E-mail</label>
                    <Field
                      id="confirmationEmail"
                      name="confirmationEmail"
                      type="email"
                      placeholder="Confirmar E-mail"
                      className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage name="confirmationEmail" component="p" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="cpf" className="text-sm text-[#1652f0]">CPF</label>
                    <Field
                      id="cpf"
                      name="cpf"
                      placeholder="CPF"
                      className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage name="cpf" component="p" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="phone" className="text-sm text-[#1652f0]">Telefone</label>
                    <Field
                      id="phone"
                      name="phone"
                      placeholder="Telefone"
                      className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage name="phone" component="p" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="dateOfBirth" className="text-sm text-[#1652f0]">Data de Nascimento</label>
                    <Field
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      placeholder="Data de nascimento"
                      className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage name="dateOfBirth" component="p" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="password" className="text-sm text-[#1652f0]">Senha</label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Senha"
                      className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="confirmationPassword" className="text-sm text-[#1652f0]">Confirmar Senha</label>
                    <Field
                      id="confirmationPassword"
                      name="confirmationPassword"
                      type="password"
                      placeholder="Confirmar senha"
                      className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage name="confirmationPassword" component="p" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div className="col-span-2 flex justify-center mt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="text-[#1652f0] border border-[#1652f0] font-semibold py-2 px-8 rounded-full hover:bg-[#1652f0] hover:text-white transition"
                    >
                      Cadastrar
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
