// src/pages/admin/InstitutionForm.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance"; //

const initialFormState = {
  name: "",
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
  cep: "",
  nameResponsible: "",
  cellResponsible: "",
  emailResponsible: "",
  type: "Superior", // Valor padrão
  urlImage: "",
  status: true,
};

// Ícone de Voltar (Exemplo SVG)
const BackArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
    <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.56l2.72 2.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 1 1 1.06 1.06L5.56 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
  </svg>
);


export default function InstitutionForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingCep, setIsFetchingCep] = useState(false);
  const [error, setError] = useState(null);
  const [cepError, setCepError] = useState(null);
  const navigate = useNavigate();
  const { id: institutionId } = useParams(); // Pega o 'id' da URL se estiver editando

  const institutionTypes = ["Superior", "Escola", "Técnico", "Idiomas", "Pós"];

  useEffect(() => {
    if (institutionId) {
      setIsLoading(true);
      axiosInstance.get(`/institutions/${institutionId}`)
        .then(res => {
          const { id, ...institutionData } = res.data; // Não queremos o 'id' no formData
          setFormData({ ...initialFormState, ...institutionData, status: typeof institutionData.status === 'boolean' ? institutionData.status : true });
        })
        .catch(err => {
          console.error("Erro ao buscar dados da instituição para edição:", err);
          setError("Não foi possível carregar os dados da instituição para edição.");
          // Poderia redirecionar ou mostrar uma mensagem mais proeminente
        })
        .finally(() => setIsLoading(false));
    } else {
      setFormData(initialFormState); // Garante que o formulário está limpo para criação
    }
  }, [institutionId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCepBlur = async (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    setCepError(null);

    if (cep.length === 8) {
      setIsFetchingCep(true);
      setError(null);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Falha ao buscar CEP. Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.erro) throw new Error('CEP não encontrado ou inválido.');
        setFormData(prev => ({
          ...prev,
          street: data.logradouro || prev.street,
          neighborhood: data.bairro || prev.neighborhood,
          city: data.localidade || prev.city,
          state: data.uf || prev.state,
          complement: data.complemento || prev.complement,
        }));
      } catch (errCep) {
        setCepError(errCep.message || "Erro ao processar CEP.");
      } finally {
        setIsFetchingCep(false);
      }
    } else if (cep.length > 0) {
        setCepError("CEP deve conter 8 dígitos.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.city.trim() || !formData.type.trim() || !formData.state.trim()) {
      setError("Nome, Tipo, Cidade e Estado são campos obrigatórios.");
      alert("Nome, Tipo, Cidade e Estado são campos obrigatórios.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setCepError(null);

    const apiPath = institutionId ? `/institutions/${institutionId}` : "/institutions/create";
    const method = institutionId ? "put" : "post";

    try {
      await axiosInstance[method](apiPath, formData);
      alert(`Instituição ${institutionId ? 'atualizada' : 'criada'} com sucesso!`);
      navigate("/admin/institutions"); // Volta para a lista após sucesso
    } catch (err) {
      console.error(`Erro ao ${institutionId ? 'atualizar' : 'criar'} instituição:`, err.response?.data || err.message);
      const apiError = err.response?.data?.message || err.response?.data?.error || `Falha ao ${institutionId ? 'atualizar' : 'criar'} instituição.`;
      setError(apiError);
      alert(apiError);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && institutionId) { // Mostra carregando apenas se estiver buscando dados para edição
    return <div className="p-8 text-center">Carregando dados da instituição...</div>;
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {institutionId ? "Editar Instituição" : "Adicionar Nova Instituição"}
        </h1>
        <Link 
            to="/admin/institutions" 
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
      {cepError && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md shadow" role="alert">
          <p className="font-bold">Aviso CEP</p>
          <p>{cepError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-xl">
        <fieldset className="mb-8">
          <legend className="text-lg font-medium text-gray-900 mb-3">Informações Principais</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 border-t border-gray-200 pt-4">
            <div className="lg:col-span-2">
              <label htmlFor="name" className="form-label">Nome da Instituição*</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className="form-input"/>
            </div>
            <div>
              <label htmlFor="type" className="form-label">Tipo*</label>
              <select name="type" id="type" value={formData.type} onChange={handleInputChange} required className="form-select">
                <option value="" disabled>Selecione o tipo</option>
                {institutionTypes.map(typeValue => <option key={typeValue} value={typeValue}>{typeValue}</option>)}
              </select>
            </div>
            <div className="lg:col-span-2">
              <label htmlFor="urlImage" className="form-label">URL da Imagem/Logo</label>
              <input type="url" name="urlImage" id="urlImage" value={formData.urlImage} onChange={handleInputChange} placeholder="https://exemplo.com/logo.png" className="form-input"/>
            </div>
            <div className="flex items-center pt-5 self-end">
                <input type="checkbox" name="status" id="status" checked={formData.status} onChange={handleInputChange} className="form-checkbox h-5 w-5 text-blue-600"/>
                <label htmlFor="status" className="ml-2 text-sm font-medium text-gray-700">Ativa</label>
            </div>
          </div>
        </fieldset>

        <fieldset className="mb-8">
          <legend className="text-lg font-medium text-gray-900 mb-3">Endereço</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 border-t border-gray-200 pt-4">
            <div>
              <label htmlFor="cep" className="form-label">CEP {isFetchingCep ? '(Buscando...)' : ''}</label>
              <input type="text" name="cep" id="cep" value={formData.cep} onChange={handleInputChange} onBlur={handleCepBlur} placeholder="00000-000" maxLength="9" className="form-input"/>
            </div>
            <div className="lg:col-span-2">
              <label htmlFor="street" className="form-label">Rua/Logradouro</label>
              <input type="text" name="street" id="street" value={formData.street} onChange={handleInputChange} className="form-input"/>
            </div>
            <div>
              <label htmlFor="number" className="form-label">Número</label>
              <input type="text" name="number" id="number" value={formData.number} onChange={handleInputChange} className="form-input"/>
            </div>
            <div>
              <label htmlFor="neighborhood" className="form-label">Bairro</label>
              <input type="text" name="neighborhood" id="neighborhood" value={formData.neighborhood} onChange={handleInputChange} className="form-input"/>
            </div>
            <div>
              <label htmlFor="complement" className="form-label">Complemento</label>
              <input type="text" name="complement" id="complement" value={formData.complement} onChange={handleInputChange} className="form-input"/>
            </div>
            <div>
              <label htmlFor="city" className="form-label">Cidade*</label>
              <input type="text" name="city" id="city" value={formData.city} onChange={handleInputChange} required className="form-input"/>
            </div>
            <div>
              <label htmlFor="state" className="form-label">Estado (UF)*</label>
              <input type="text" name="state" id="state" value={formData.state} onChange={handleInputChange} required maxLength="2" placeholder="Ex: PE" className="form-input"/>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-lg font-medium text-gray-900 mb-3">Contato do Responsável</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 border-t border-gray-200 pt-4">
            <div>
              <label htmlFor="nameResponsible" className="form-label">Nome</label>
              <input type="text" name="nameResponsible" id="nameResponsible" value={formData.nameResponsible} onChange={handleInputChange} className="form-input"/>
            </div>
            <div>
              <label htmlFor="cellResponsible" className="form-label">Celular</label>
              <input type="tel" name="cellResponsible" id="cellResponsible" value={formData.cellResponsible} onChange={handleInputChange} placeholder="(00) 90000-0000" className="form-input"/>
            </div>
            <div>
              <label htmlFor="emailResponsible" className="form-label">Email</label>
              <input type="email" name="emailResponsible" id="emailResponsible" value={formData.emailResponsible} onChange={handleInputChange} placeholder="email@example.com" className="form-input"/>
            </div>
          </div>
        </fieldset>

        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end sm:space-x-3 space-y-3 sm:space-y-0">
          <Link 
            to="/admin/institutions"
            type="button" 
            className="btn btn-secondary w-full sm:w-auto text-center" // Adicionado text-center
          >
            Cancelar
          </Link>
          <button 
            type="submit" 
            className="btn btn-primary w-full sm:w-auto" 
            disabled={isLoading || isFetchingCep}
          >
            {isLoading ? "Salvando..." : (institutionId ? "Salvar Alterações" : "Adicionar Instituição")}
          </button>
        </div>
      </form>
    </div>
  );
}

