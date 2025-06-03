// src/pages/ProfilePage.jsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../api/axiosInstance";
import LoadingSpinner from "../components/LoadingSpinner";

const BackArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
    <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.56l2.72 2.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 1 1 1.06 1.06L5.56 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
  </svg>
);

const raceColorOptions = ["Parda", "Branca", "Preta", "Amarela", "Indígena", "Não Declarada"];

const formatCpf = (cpf) => {
  if (!cpf) return '';
  const cleanCpf = String(cpf).replace(/\D/g, '');
  if (cleanCpf.length === 11) {
    return cleanCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  return cpf;
};

const formatPhone = (phone) => {
    if (!phone) return '';
    const cleanPhone = String(phone).replace(/\D/g, '');
    if (cleanPhone.length === 11) {
        return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (cleanPhone.length === 10) {
        return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return phone;
};


export default function ProfilePage() {
  const [initialValues, setInitialValues] = useState({
    fullName: "",
    email: "",
    cpf: "",
    dateOfBirth: "",
    phone: "",
    needs: false,
    raceColor: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  // Obtém o ID do usuário logado do localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || !user.id) {
      setApiError("Usuário não autenticado. Por favor, faça login.");
      setIsLoading(false);
      navigate("/login");
      return;
    }

    // Faz a requisição GET usando o ID do usuário do localStorage
    axiosInstance.get(`/customers/${user.id}`)
      .then(res => {
        const data = res.data;
        // Lida com a possível duplicidade de chaves de data de nascimento e valores nulos
        const dob = data.dateOfBirth || data.dateOfbirth || null;
        setInitialValues({
          fullName: data.fullName || "",
          email: data.email || "",
          cpf: data.cpf || "",
          dateOfBirth: dob ? dob.split('T')[0] : "",
          phone: data.phone || "",
          needs: typeof data.needs === 'boolean' ? data.needs : false, // Valor padrão se ausente
          raceColor: data.raceColor || "", // Valor padrão se ausente
        });
      })
      .catch(err => {
        console.error("Erro ao buscar dados do perfil:", err.response?.data || err.message);
        setApiError("Não foi possível carregar os dados do perfil. Tente novamente mais tarde.");
      })
      .finally(() => setIsLoading(false));
  }, [user, navigate]);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Nome completo é obrigatório."),
    dateOfBirth: Yup.date()
      .max(new Date(), 'Data de nascimento não pode ser no futuro.')
      .required('Data de nascimento é obrigatória.'),
    phone: Yup.string()
      .required("Telefone é obrigatório.")
      .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$|^\d{10,11}$/, "Formato de telefone inválido (ex: (DD) XXXXX-XXXX ou 11999998888)."),
    needs: Yup.boolean(),
    raceColor: Yup.string().required('Raça/Cor é obrigatória.'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setApiError(null);
    setIsLoading(true);

    const payload = {
      fullName: values.fullName,
      dateOfBirth: values.dateOfBirth,
      phone: String(values.phone).replace(/\D/g, ''), // Remove formatação para envio
      needs: values.needs,
      raceColor: values.raceColor,
    };

    try {
      // Faz a requisição PUT para atualizar os dados do perfil
      await axiosInstance.put(`/customers/${user.id}`, payload);
      alert("Perfil atualizado com sucesso!");
      // Atualiza o localStorage para refletir o novo nome (se houver)
      const updatedUser = { ...user, fullName: values.fullName };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err.response?.data || err.message);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || "Falha ao atualizar perfil. Tente novamente.";
      setApiError(errorMessage);
    } finally {
      setSubmitting(false);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <LoadingSpinner size="h-12 w-12" />
        <p className="ml-3 text-gray-600">Carregando dados do perfil...</p>
      </div>
    );
  }

  // Mensagem para usuários não logados após o carregamento
  if (!user || !user.id) {
    return (
        <div className="p-8 text-center text-red-600 bg-gray-100 min-h-screen">
            <p>Você precisa estar logado para acessar esta página.</p>
            <Link to="/login" className="text-blue-600 hover:underline mt-4 block">Ir para Login</Link>
        </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Meu Perfil
        </h1>
        <Link
          to="/"
          className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <BackArrowIcon />
          Voltar para Home
        </Link>
      </header>

      {apiError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md shadow" role="alert">
          <p className="font-bold">Erro</p>
          <p>{apiError}</p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 max-w-3xl mx-auto">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, errors, touched, values }) => (
            <Form className="space-y-6">
              <fieldset>
                <legend className="text-lg font-medium text-gray-900 mb-4">Informações Pessoais</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  <div>
                    <label htmlFor="fullName" className="form-label">Nome Completo</label>
                    <Field
                      id="fullName"
                      type="text"
                      name="fullName"
                      placeholder="Seu nome completo"
                      className={`form-input ${touched.fullName && errors.fullName ? 'border-red-500' : ''}`}
                    />
                    <ErrorMessage name="fullName" component="p" className="text-red-600 text-xs mt-1" />
                  </div>

                  <div>
                    <label htmlFor="email" className="form-label">E-mail</label>
                    <Field
                      id="email"
                      type="email"
                      name="email"
                      className="form-input bg-gray-100 cursor-not-allowed"
                      disabled
                    />
                  </div>

                  <div>
                    <label htmlFor="cpf" className="form-label">CPF</label>
                    <Field
                      id="cpf"
                      type="text"
                      name="cpf"
                      value={formatCpf(values.cpf)}
                      className="form-input bg-gray-100 cursor-not-allowed"
                      disabled
                    />
                  </div>

                  <div>
                    <label htmlFor="dateOfBirth" className="form-label">Data de Nascimento</label>
                    <Field
                      id="dateOfBirth"
                      type="date"
                      name="dateOfBirth"
                      className={`form-input ${touched.dateOfBirth && errors.dateOfBirth ? 'border-red-500' : ''}`}
                    />
                    <ErrorMessage name="dateOfBirth" component="p" className="text-red-600 text-xs mt-1" />
                  </div>

                  <div>
                    <label htmlFor="phone" className="form-label">Telefone</label>
                    <Field
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="(DD) XXXXX-XXXX"
                      value={values.phone ? formatPhone(values.phone) : ''}
                      className={`form-input ${touched.phone && errors.phone ? 'border-red-500' : ''}`}
                    />
                    <ErrorMessage name="phone" component="p" className="text-red-600 text-xs mt-1" />
                  </div>

                  <div>
                    <label htmlFor="raceColor" className="form-label">Raça/Cor</label>
                    <Field
                      id="raceColor"
                      as="select"
                      name="raceColor"
                      className={`form-select ${touched.raceColor && errors.raceColor ? 'border-red-500' : ''}`}
                    >
                      <option value="">Selecione...</option>
                      {raceColorOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </Field>
                    <ErrorMessage name="raceColor" component="p" className="text-red-600 text-xs mt-1" />
                  </div>

                  <div className="md:col-span-2 flex items-center pt-2">
                    <Field
                      type="checkbox"
                      id="needs"
                      name="needs"
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <label htmlFor="needs" className="ml-2 text-sm font-medium text-gray-700">
                      Possui Necessidades Especiais
                    </label>
                  </div>
                </div>
              </fieldset>

              <div className="pt-6 border-t border-gray-200 mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="btn btn-primary w-full sm:w-auto flex items-center justify-center py-3"
                >
                  {isSubmitting || isLoading ? (
                    <>
                      <LoadingSpinner size="h-5 w-5 mr-2" />
                      Salvando...
                    </>
                  ) : (
                    "Salvar Alterações"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}