// src/pages/Login.jsx
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import LoadingSpinner from "../components/LoadingSpinner"; // Assumindo que este componente existe

// Ícones para mostrar/esconder senha
const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
        <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.18l.82-1.425a1.651 1.651 0 011.518-.888h1.908a1.651 1.651 0 011.518.888l.82 1.425a1.651 1.651 0 010 1.18l-.82 1.425a1.651 1.651 0 01-1.518.888H2.998a1.651 1.651 0 01-1.518-.888l-.819-1.425zM6.25 10a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0z" clipRule="evenodd" />
    </svg>
);

const EyeSlashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38c-.351-.99-.936-1.896-1.663-2.688a18.29 18.29 0 00-7.092-4.311A18.182 18.182 0 0010 4.5c-.832 0-1.646.095-2.428.27l-1.21-.292a18.049 18.049 0 00-3.092-2.258zM10 6.364A3.636 3.636 0 006.364 10a3.636 3.636 0 001.012 2.573L10 10.012A3.636 3.636 0 0010 6.364zM1.01 10a18.008 18.008 0 003.282 5.056l1.705-1.705A10.09 10.09 0 013.25 10c.241-.807.656-1.542 1.185-2.171A18.188 18.188 0 0110 4.5c.227 0 .453.01.677.029l.98-.98A19.757 19.757 0 0010 3C4.305 3 .75 6.632.75 10c.087.433.222.85.391 1.243l-1.132 1.131a.75.75 0 001.061 1.06l1.932-1.932z" clipRule="evenodd" />
    </svg>
);
// Logo Edupass (opcional)
const EdupassLogo = ({ className = "w-auto h-10", textColor = "text-white", accentColor = "text-yellow-300" }) => (
    <div className={`font-bold text-3xl ${className}`}>
        <span className={textColor}>Edu</span>
        <span className={accentColor}>pass</span>
    </div>
);


const validationSchema = Yup.object().shape({
  email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
  password: Yup.string().min(6, "A senha deve ter no mínimo 6 caracteres").required("Campo obrigatório"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate();
  const { setUserLoggedIn } = useOutletContext();

  const handleLogin = async (values, { setSubmitting, setFieldError }) => {

    setMessage(""); 
    try {
      const response = await axiosInstance.post("/edupass/login", values);
      if (response.status === 200 && response.data?.accessToken) {
        const { accessToken, customerId, roles = [] } = response.data;
        localStorage.setItem("token", accessToken);
        const userToStore = { email: values.email, id: customerId, roles };
        localStorage.setItem("user", JSON.stringify(userToStore));
        setUserLoggedIn(true);
        setMessage("Login realizado com sucesso! Redirecionando...");
        setTimeout(() => {
            if (roles.includes("ROLE_ADMIN")) {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }
        }, 1500); 
      } else {
        const apiMessage = response.data?.message || response.data?.error || "E-mail ou senha inválidos.";
        setMessage(apiMessage);
        setSubmitting(false);
      }
    } catch (error) {
      console.error("Erro no login:", error.response?.data || error.message);
      const apiMessage = error.response?.data?.message || error.response?.data?.error || "Erro ao conectar com o servidor.";
      setMessage(apiMessage);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        
        {/* Seção Esquerda - Informativa/Branding - COM INFORMAÇÕES MELHORADAS */}
        <div className="w-full md:w-2/5 bg-blue-600 p-8 sm:p-10 md:p-12 text-white flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <EdupassLogo className="h-10 md:h-12 mb-8 self-center md:self-start" textColor="text-white" accentColor="text-yellow-300"/>
          
          <h1 className="text-2xl sm:text-2xl lg:text-2xl font-bold mb-4 leading-tight">
            Novo por aqui?
          </h1>
          <p className="text-blue-100 text-base lg:text mb-8 leading-relaxed">
            Crie sua conta e tenha acesso a bolsas de estudo exclusivas e cursos para impulsionar sua carreira!
          </p>
          <Link
            to="/cadastro" 
            className="px-8 py-3.5 font-semibold rounded-xl bg-yellow-400 hover:bg-yellow-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-75 shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-150 ease-in-out self-center md:self-auto"
          >
            Criar Minha Conta Agora
          </Link>
          <p className="text-xs text-blue-200 mt-10">
            Ao se registrar, você concorda com nossos <a href="/termos" className="underline hover:text-yellow-300">Termos de Serviço</a> e <a href="/privacidade" className="underline hover:text-yellow-300">Política de Privacidade</a>.
          </p>
        </div>

        {/* Seção Direita - Formulário de Login (mantém o design anterior) */}
        <div className="w-full md:w-3/5 p-8 sm:p-10 md:p-12 bg-white">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Acesse sua Conta
            </h2>
            <p className="text-gray-500 mt-1">Bem-vindo(a) de volta!</p>
          </div>

          {message && (
            <div 
              className={`p-3 mb-6 text-sm rounded-lg text-center ${
                message.includes("sucesso") 
                ? "bg-green-50 text-green-700 border border-green-300" 
                : "bg-red-50 text-red-700 border border-red-300"
              }`} 
              role="alert"
            >
              {message}
            </div>
          )}

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="email-login" className="form-label">E-mail</label>
                  <Field id="email-login" type="email" name="email" className={`form-input ${touched.email && errors.email ? 'border-red-500' : 'border-gray-300'}`} placeholder="seuemail@example.com"/>
                  <ErrorMessage name="email" component="p" className="text-red-600 text-xs mt-1"/>
                </div>

                <div>
                  <label htmlFor="password-login" className="form-label">Senha</label>
                  <div className="relative">
                    <Field id="password-login" type={showPassword ? "text" : "password"} name="password" className={`form-input pr-10 ${touched.password && errors.password ? 'border-red-500' : 'border-gray-300'}`} placeholder="Digite sua senha"/>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600" aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}>
                      {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="p" className="text-red-600 text-xs mt-1"/>
                </div>
                
                <div className="flex items-center justify-end text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
                    Esqueceu a senha?
                  </a>
                </div>

                <div>
                  <button type="submit" disabled={isSubmitting} className="w-full btn btn-primary text-base py-3 flex justify-center items-center">
                    {isSubmitting ? (<><LoadingSpinner size="h-5 w-5" color="text-white" /><span className="ml-2">Entrando...</span></>) : ("Entrar na Plataforma")}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}