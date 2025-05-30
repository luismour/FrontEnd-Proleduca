// src/pages/admin/ScholarshipHolderForm.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { validarCPF } from "../../utils/validations"; 


const initialFormState = {
  customers: "", // ID do cliente
  fullName: "",
  dateOfBirth: "", // Formato YYYY-MM-DD
  needs: false,
  cpf: "",
  raceColor: "",
};

const BackArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
    <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.56l2.72 2.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 1 1 1.06 1.06L5.56 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
  </svg>
);

// Opções para Raça/Cor (ajuste conforme necessário)
const raceColorOptions = ["Parda", "Branca", "Preta", "Amarela", "Indígena", "Não Declarada"];

export default function ScholarshipHolderForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [customersList, setCustomersList] = useState([]); // Para o select de clientes
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const { id: bolsistaId } = useParams(); // ID do bolsista para edição

  useEffect(() => {
    // Buscar lista de clientes (usuários) para o select
    axiosInstance.get("/customers") // Endpoint que lista usuários (customers)
      .then(res => {
        setCustomersList(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => {
        console.error("Erro ao buscar clientes:", err);
        setError("Não foi possível carregar a lista de clientes.");
      });

    if (bolsistaId) {
      setIsLoading(true);
      axiosInstance.get(`/scholarship-holders/${bolsistaId}`)
        .then(res => {
          const data = res.data;
          setFormData({
            customers: data.customers?.id?.toString() || "",
            fullName: data.fullName || "",
            dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : "", // Formato YYYY-MM-DD
            needs: typeof data.needs === 'boolean' ? data.needs : false,
            cpf: data.cpf || "", // O CPF aqui pode vir formatado ou não da API
            raceColor: data.raceColor || "",
          });
        })
        .catch(err => {
          console.error("Erro ao buscar dados do bolsista:", err);
          setError("Não foi possível carregar os dados do bolsista para edição.");
        })
        .finally(() => setIsLoading(false));
    } else {
      setFormData(initialFormState); // Limpa para novo bolsista
    }
  }, [bolsistaId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (formErrors[name]) { // Limpa erro do campo ao digitar
        setFormErrors(prev => ({...prev, [name]: null}));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.customers) errors.customers = "Cliente é obrigatório.";
    if (!formData.fullName.trim()) errors.fullName = "Nome completo é obrigatório.";
    if (!formData.cpf.trim()) errors.cpf = "CPF é obrigatório.";
    else if (!validarCPF(formData.cpf)) errors.cpf = "CPF inválido.";
    if (!formData.dateOfBirth) errors.dateOfBirth = "Data de nascimento é obrigatória.";
    // Adicione mais validações se necessário (ex: raceColor)
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setError("Por favor, corrija os erros no formulário.");
      return;
    }
    setIsLoading(true);
    setError(null);

    const cpfUnformatted = formData.cpf.replace(/[^\d]/g, '');

    const payload = {
      customers: parseInt(formData.customers), // Deve ser o ID do cliente
      fullName: formData.fullName,
      dateOfBirth: formData.dateOfBirth, // YYYY-MM-DD
      needs: formData.needs,
      cpf: cpfUnformatted, // CPF sem formatação (ajuste se o backend espera formatado para este endpoint)
      raceColor: formData.raceColor,
    };

    const apiPath = bolsistaId ? `/scholarship-holders/${bolsistaId}` : "/scholarship-holders/create";
    const method = bolsistaId ? "put" : "post";

    try {
      await axiosInstance[method](apiPath, payload);
      alert(`Bolsista ${bolsistaId ? 'atualizado' : 'criado'} com sucesso!`);
      navigate("/admin/scholarship-holders");
    } catch (err) {
      console.error(`Erro ao ${bolsistaId ? 'atualizar' : 'criar'} bolsista:`, err.response?.data || err.message);
      const apiError = err.response?.data?.message || err.response?.data?.error || `Falha ao ${bolsistaId ? 'atualizar' : 'criar'} bolsista.`;
      setError(apiError);
      alert(apiError);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading && bolsistaId) { // Mostra carregando apenas se estiver buscando dados para edição
    return <div className="p-8 text-center text-gray-500">Carregando dados do bolsista...</div>;
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {bolsistaId ? "Editar Bolsista" : "Adicionar Novo Bolsista"}
        </h1>
        <Link 
            to="/admin/scholarship-holders" 
            className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
            <BackArrowIcon />
            Voltar para Lista
        </Link>
      </header>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md shadow" role="alert">
          <p className="font-bold">Erro na Operação</p>
          <p>{typeof error === 'object' ? JSON.stringify(error) : error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-xl space-y-6">
        <fieldset>
          <legend className="text-lg font-medium text-gray-900 mb-3">Dados do Bolsista</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 border-t border-gray-200 pt-4">
            <div>
              <label htmlFor="customers" className="form-label">Cliente (Usuário Associado)*</label>
              <select name="customers" id="customers" value={formData.customers} onChange={handleInputChange} required className="form-select" disabled={customersList.length === 0}>
                <option value="" disabled>{customersList.length === 0 ? "Carregando clientes..." : "Selecione um cliente"}</option>
                {customersList.map(cust => (
                  <option key={cust.id} value={cust.id}>{cust.email} (ID: {cust.id})</option>
                ))}
              </select>
              {formErrors.customers && <p className="text-xs text-red-600 mt-1">{formErrors.customers}</p>}
            </div>
            <div>
              <label htmlFor="fullName" className="form-label">Nome Completo*</label>
              <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleInputChange} required className="form-input"/>
              {formErrors.fullName && <p className="text-xs text-red-600 mt-1">{formErrors.fullName}</p>}
            </div>
            <div>
              <label htmlFor="cpf" className="form-label">CPF*</label>
              <input type="text" name="cpf" id="cpf" value={formData.cpf} onChange={handleInputChange} required placeholder="000.000.000-00" className="form-input"/>
              {formErrors.cpf && <p className="text-xs text-red-600 mt-1">{formErrors.cpf}</p>}
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="form-label">Data de Nascimento*</label>
              <input type="date" name="dateOfBirth" id="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required className="form-input"/>
              {formErrors.dateOfBirth && <p className="text-xs text-red-600 mt-1">{formErrors.dateOfBirth}</p>}
            </div>
            <div>
              <label htmlFor="raceColor" className="form-label">Raça/Cor</label>
              <select name="raceColor" id="raceColor" value={formData.raceColor} onChange={handleInputChange} className="form-select">
                <option value="">Selecione...</option>
                {raceColorOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="flex items-center pt-5 self-end">
                <input type="checkbox" name="needs" id="needs" checked={formData.needs} onChange={handleInputChange} className="form-checkbox h-5 w-5 text-blue-600"/>
                <label htmlFor="needs" className="ml-2 text-sm font-medium text-gray-700">Possui Necessidades Especiais</label>
            </div>
          </div>
        </fieldset>

        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end sm:space-x-3 space-y-3 sm:space-y-0">
          <Link to="/admin/scholarship-holders" type="button" className="btn btn-secondary w-full sm:w-auto text-center">
            Cancelar
          </Link>
          <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={isLoading}>
            {isLoading ? "Salvando..." : (bolsistaId ? "Salvar Alterações" : "Adicionar Bolsista")}
          </button>
        </div>
      </form>
    </div>
  );
}