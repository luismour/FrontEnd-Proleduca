import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
  password: Yup.string().min(6, "Mínimo 6 caracteres").required("Campo obrigatório"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { setUserLoggedIn } = useOutletContext();

  const useMock = false; // Agora o login real será usado

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      if (useMock) {
        const mockUser = {
          email: "proleduca@proleduca.com",
          password: "123456",
        };

        await new Promise((resolve) => setTimeout(resolve, 500));

        if (
          values.email === mockUser.email &&
          values.password === mockUser.password
        ) {
          const mockCliente = {
            id: 1,
            nome_completo: "João da Silva",
            email: mockUser.email,
          };

          localStorage.setItem("user", JSON.stringify(mockCliente));

          setMessage("Login realizado com sucesso!");
          setUserLoggedIn(true);
          navigate("/");
        } else {
          setMessage("E-mail ou senha inválidos.");
        }
      } else {

        const response = await axiosInstance.post("/edupass/login", values);

          if (response.status === 200 && response.data?.accessToken) {
            const accessToken = response.data.accessToken;

            console.log("TOKEN JWT:", accessToken); 

            localStorage.setItem("token", accessToken);
            localStorage.setItem("user", JSON.stringify({ email: values.email, id: response.data.customerId }));

            const user = { email: values.email, id: response.data.customerId };
            console.log("ID do usuário:", user?.id);
            

            setMessage("Login realizado com sucesso!");
            setUserLoggedIn(true);
            navigate("/");
          } else {
            setMessage("E-mail ou senha inválidos.");
          }
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      setMessage("Erro ao conectar com o servidor.");
    } finally {
      setSubmitting(false);
    }
    console.log("Valores do formulário:", values);

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4744d6]">
      <div className="flex flex-col md:flex-row w-full max-w-4xl max-h-6x1 md:h-[500px] bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Lado azul com imagem e botão de registro */}
        <div className="md:w-1/2 w-full bg-[#23a3dd] h-[300px] md:h-full flex flex-col justify-center items-center p-4 text-white">
          <img src="" alt="Ilustração Login" className="w-20 h-10 mb-6" />
          <p className="text-lg mb-2">Não tem uma conta?</p>
          <button
            onClick={() => navigate("/cadastro")}
            className="bg-white text-[#23a3dd] px-6 py-2 rounded-full hover:bg-gray-100 transition"
          >
            Registre-se
          </button>
        </div>

        {/* Formulário de login */}
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center h-auto md:h-full">
          <h2 className="text-2xl font-bold mb-6 text-[#23a3dd]">Log in</h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-6">
                <div>
                  <label className="text-sm block mb-1">E-mail</label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
                    placeholder="E-mail"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-sm text-red-600 mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm block mb-1">Senha</label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 outline-none"
                      placeholder="Senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-sm text-red-600 mt-1"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#2ba4da] text-white px-6 py-2 rounded-full hover:bg-[#2190c4] transition disabled:opacity-50"
                  >
                    {isSubmitting ? "Entrando..." : "Log in"}
                  </button>
                  <a href="#" className="text-gray-500 hover:underline">
                    Esqueceu a senha?
                  </a>
                </div>

                {message && (
                  <div className="text-center text-sm text-red-600">
                    {message}
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
