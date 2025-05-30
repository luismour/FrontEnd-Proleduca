// src/pages/Login.jsx
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// Removido 'axios' se axiosInstance for usado para tudo
import { useNavigate, useOutletContext } from "react-router-dom";
import axiosInstance from "../api/axiosInstance"; //

const validationSchema = Yup.object().shape({
  email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
  password: Yup.string().min(6, "Mínimo 6 caracteres").required("Campo obrigatório"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setUserLoggedIn } = useOutletContext();

  // Assume que o endpoint de login é o mesmo para todos os usuários
  // e a resposta da API incluirá 'roles' para administradores.
  const handleLogin = async (values, { setSubmitting }) => {
    try {
      // Substitua "/edupass/login" pelo seu endpoint de login real, se for diferente
      const response = await axiosInstance.post("/edupass/login", values);

      if (response.status === 200 && response.data?.accessToken) {
        const accessToken = response.data.accessToken;
        const customerId = response.data.customerId; // Vem da sua API
        const userRoles = response.data.roles || [];   // Pega as roles da resposta da API

        localStorage.setItem("token", accessToken);
        
        // Monta o objeto do usuário para salvar no localStorage, incluindo as roles
        const userToStore = {
          email: values.email, // Email do formulário
          id: customerId,      // ID do cliente/usuário
          roles: userRoles     // Array de roles (ex: ["ROLE_ADMIN"] ou ["ROLE_USER"])
        };
        localStorage.setItem("user", JSON.stringify(userToStore));

        console.log("Usuário autenticado e salvo:", userToStore);
        
        setMessage("Login realizado com sucesso!");
        setUserLoggedIn(true); // Atualiza o estado de login no AppContext/OutletContext

        // Decide para onde navegar com base na role
        if (userRoles.includes("ROLE_ADMIN")) {
          navigate("/admin/dashboard"); // Redireciona admin para o dashboard
        } else {
          navigate("/"); // Redireciona usuário comum para a home page
        }

      } else {
        // Se a resposta não for 200 ou não tiver accessToken, trata como falha
        setMessage(response.data?.message || "E-mail ou senha inválidos.");
      }
    } catch (error) {
      console.error("Erro no login:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Erro ao conectar com o servidor. Verifique os dados e tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4744d6]">
      <div className="flex flex-col md:flex-row w-full max-w-4xl max-h-6x1 md:h-[500px] bg-white rounded-xl shadow-lg overflow-hidden">
        
        <div className="md:w-1/2 w-full bg-[#23a3dd] h-[300px] md:h-full flex flex-col justify-center items-center p-4 text-white">
          <img src="" alt="Ilustração Login" className="w-20 h-10 mb-6" /> {/* Considere adicionar uma imagem real */}
          <p className="text-lg mb-2">Não tem uma conta?</p>
          <button
            onClick={() => navigate("/cadastro")}
            className="bg-white text-[#23a3dd] px-6 py-2 rounded-full hover:bg-gray-100 transition"
          >
            Registre-se
          </button>
        </div>

        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center h-auto md:h-full">
          <h2 className="text-2xl font-bold mb-6 text-[#23a3dd]">Log in</h2>
          {message && (
            <div className={`p-3 mb-4 text-sm rounded-lg ${message.includes("sucesso") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`} role="alert">
              {message}
            </div>
          )}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-6">
                <div>
                  <label htmlFor="email-login" className="text-sm block mb-1 text-gray-700">E-mail</label>
                  <Field
                    id="email-login"
                    type="email"
                    name="email"
                    className="form-input w-full" // Usando a classe global .form-input
                    placeholder="seuemail@example.com"
                  />
                  <ErrorMessage name="email" component="div" className="text-xs text-red-600 mt-1"/>
                </div>

                <div>
                  <label htmlFor="password-login" className="text-sm block mb-1 text-gray-700">Senha</label>
                  <div className="relative">
                    <Field
                      id="password-login"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="form-input w-full pr-10" // pr-10 para dar espaço ao ícone
                      placeholder="Sua senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                      aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                    >
                      {showPassword ? 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" /><path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.18l.82-1.425a1.651 1.651 0 011.518-.888h1.908a1.651 1.651 0 011.518.888l.82 1.425a1.651 1.651 0 010 1.18l-.82 1.425a1.651 1.651 0 01-1.518.888H2.998a1.651 1.651 0 01-1.518-.888l-.819-1.425zM6.25 10a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0z" clipRule="evenodd" /></svg>
                        : 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38c-.351-.99-.936-1.896-1.663-2.688a18.29 18.29 0 00-7.092-4.311A18.182 18.182 0 0010 4.5c-.832 0-1.646.095-2.428.27l-1.21-.292a18.049 18.049 0 00-3.092-2.258zM10 6.364A3.636 3.636 0 006.364 10a3.636 3.636 0 001.012 2.573L10 10.012A3.636 3.636 0 0010 6.364zM1.01 10a18.008 18.008 0 003.282 5.056l1.705-1.705A10.09 10.09 0 013.25 10c.241-.807.656-1.542 1.185-2.171A18.188 18.188 0 0110 4.5c.227 0 .453.01.677.029l.98-.98A19.757 19.757 0 0010 3C4.305 3 .75 6.632.75 10c.087.433.222.85.391 1.243l-1.132 1.131a.75.75 0 001.061 1.06l1.932-1.932z" clipRule="evenodd" /></svg>
                      }
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-xs text-red-600 mt-1"/>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary" // Usando a classe global .btn .btn-primary
                  >
                    {isSubmitting ? "Entrando..." : "Log in"}
                  </button>
                  <a href="#" className="text-gray-600 hover:underline hover:text-blue-600">
                    Esqueceu a senha?
                  </a>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}