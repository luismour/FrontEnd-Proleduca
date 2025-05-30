// src/pages/admin/CourseForm.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const initialCourseFormState = {
  name: "",
  institutionId: "", // Para o select, virá de courseData.institutions.id
  vacancies: 0,
  percentageScholarship: 0.0,
  originalValue: 0.0,
  discountValue: 0.0,
  shift: "Noturno", // Valor padrão, pode ser um select se houver mais opções
  imageUrl: "",
  discountEntrance: 0.0,
  status: true,
};

const BackArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
    <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.56l2.72 2.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 1 1 1.06 1.06L5.56 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
  </svg>
);

export default function CourseForm() {
  const [formData, setFormData] = useState(initialCourseFormState);
  const [institutions, setInstitutions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id: courseId } = useParams(); // ID do curso para edição

  const shiftOptions = ["Noturno", "Diurno", "Integral", "Matutino", "Vespertino"]; // Exemplo de opções

  useEffect(() => {
    axiosInstance.get("/institutions")
      .then(res => setInstitutions(Array.isArray(res.data) ? res.data : []))
      .catch(err => {
        console.error("Erro ao buscar instituições:", err);
        setError("Não foi possível carregar a lista de instituições.");
      });

    if (courseId) {
      setIsLoading(true);
      axiosInstance.get(`/courses/${courseId}`)
        .then(res => {
          const courseData = res.data;
          setFormData({
            name: courseData.name || "",
            institutionId: courseData.institutions?.id?.toString() || "", // API GET aninhada
            vacancies: courseData.vacancies || 0,
            percentageScholarship: courseData.percentageScholarship || 0.0,
            originalValue: courseData.originalValue || 0.0,
            discountValue: courseData.discountValue || 0.0,
            shift: courseData.shift || "Noturno",
            imageUrl: courseData.imageUrl || "",
            discountEntrance: courseData.discountEntrance || 0.0,
            status: typeof courseData.status === 'boolean' ? courseData.status : true,
          });
        })
        .catch(err => {
          console.error("Erro ao buscar dados do curso:", err);
          setError("Não foi possível carregar os dados do curso para edição.");
        })
        .finally(() => setIsLoading(false));
    } else {
      setFormData(initialCourseFormState);
    }
  }, [courseId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue = value;
    if (type === 'checkbox') {
      processedValue = checked;
    } else if (['vacancies', 'institutionId'].includes(name)) {
      processedValue = value === '' ? '' : parseInt(value, 10);
    } else if (['percentageScholarship', 'originalValue', 'discountValue', 'discountEntrance'].includes(name)) {
      processedValue = value === '' ? '' : parseFloat(value);
    }
    setFormData(prev => ({ ...prev, [name]: processedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.institutionId) {
      setError("Nome do curso e Instituição são obrigatórios.");
      alert("Nome do curso e Instituição são obrigatórios.");
      return;
    }
    setIsLoading(true);
    setError(null);

    let payload;
    let apiPath;
    let method;

    if (courseId) { // Editando (PUT)
      method = "put";
      apiPath = `/courses/${courseId}`;
      payload = {
        id: parseInt(courseId), // ID no corpo para PUT, conforme seu exemplo
        name: formData.name,
        institutions_id: parseInt(formData.institutionId), // snake_case
        vacancies: parseInt(formData.vacancies),
        percentage_scholarship: parseFloat(formData.percentageScholarship), // snake_case
        original_value: parseFloat(formData.originalValue),       // snake_case
        discount_value: parseFloat(formData.discountValue),       // snake_case
        shift: formData.shift,
        image_url: formData.imageUrl,                           // snake_case
        discount_entrance: parseFloat(formData.discountEntrance),   // snake_case
        status: formData.status,
      };
    } else { // Criando (POST)
      method = "post";
      apiPath = "/courses/create"; // Endpoint de criação
      payload = {
        name: formData.name,
        institutionsId: parseInt(formData.institutionId), // camelCase com 's'
        vacancies: parseInt(formData.vacancies),
        percentageScholarship: parseFloat(formData.percentageScholarship), // camelCase
        originalValue: parseFloat(formData.originalValue),         // camelCase
        discountValue: parseFloat(formData.discountValue),         // camelCase
        shift: formData.shift,
        imageUrl: formData.imageUrl,                               // camelCase
        discountEntrance: parseFloat(formData.discountEntrance),       // camelCase
        status: formData.status,
      };
    }

    try {
      await axiosInstance[method](apiPath, payload);
      alert(`Curso ${courseId ? 'atualizado' : 'criado'} com sucesso!`);
      navigate("/admin/courses");
    } catch (err) {
      console.error(`Erro ao ${courseId ? 'atualizar' : 'criar'} curso:`, err.response?.data || err.message);
      const apiError = err.response?.data?.message || err.response?.data?.error || `Falha ao ${courseId ? 'atualizar' : 'criar'} curso.`;
      setError(apiError);
      alert(apiError);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading && courseId) {
    return <div className="p-8 text-center">Carregando dados do curso...</div>;
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {courseId ? "Editar Curso" : "Adicionar Novo Curso"}
        </h1>
        <Link 
            to="/admin/courses" 
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
          <legend className="text-lg font-medium text-gray-900 mb-3">Detalhes do Curso</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 border-t border-gray-200 pt-4">
            <div>
              <label htmlFor="name" className="form-label">Nome do Curso*</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className="form-input"/>
            </div>
            <div>
              <label htmlFor="institutionId" className="form-label">Instituição*</label>
              <select name="institutionId" id="institutionId" value={formData.institutionId} onChange={handleInputChange} required className="form-select" disabled={institutions.length === 0}>
                <option value="" disabled>{institutions.length === 0 ? "Carregando..." : "Selecione"}</option>
                {institutions.map(inst => (<option key={inst.id} value={inst.id}>{inst.name}</option>))}
              </select>
            </div>
            <div>
              <label htmlFor="vacancies" className="form-label">Vagas</label>
              <input type="number" name="vacancies" id="vacancies" value={formData.vacancies} onChange={handleInputChange} className="form-input" min="0"/>
            </div>
            <div>
              <label htmlFor="percentageScholarship" className="form-label">Bolsa (%)</label>
              <input type="number" name="percentageScholarship" id="percentageScholarship" value={formData.percentageScholarship} onChange={handleInputChange} className="form-input" step="0.01" min="0" max="100"/>
            </div>
            <div>
              <label htmlFor="originalValue" className="form-label">Valor Original (R$)</label>
              <input type="number" name="originalValue" id="originalValue" value={formData.originalValue} onChange={handleInputChange} className="form-input" step="0.01" min="0"/>
            </div>
            <div>
              <label htmlFor="discountValue" className="form-label">Valor com Desconto (R$)</label>
              <input type="number" name="discountValue" id="discountValue" value={formData.discountValue} onChange={handleInputChange} className="form-input" step="0.01" min="0"/>
            </div>
            <div>
              <label htmlFor="shift" className="form-label">Turno</label>
              <select name="shift" id="shift" value={formData.shift} onChange={handleInputChange} className="form-select">
                {shiftOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="imageUrl" className="form-label">URL da Imagem do Curso</label>
              <input type="url" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleInputChange} placeholder="https://..." className="form-input"/>
            </div>
            <div>
              <label htmlFor="discountEntrance" className="form-label">Desconto na Matrícula (R$)</label>
              <input type="number" name="discountEntrance" id="discountEntrance" value={formData.discountEntrance} onChange={handleInputChange} className="form-input" step="0.01" min="0"/>
            </div>
            <div className="flex items-center pt-5 self-end">
                <input type="checkbox" name="status" id="status" checked={formData.status} onChange={handleInputChange} className="form-checkbox h-5 w-5 text-blue-600"/>
                <label htmlFor="status" className="ml-2 text-sm font-medium text-gray-700">Ativo</label>
            </div>
          </div>
        </fieldset>

        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end sm:space-x-3 space-y-3 sm:space-y-0">
          <Link to="/admin/courses" type="button" className="btn btn-secondary w-full sm:w-auto text-center">
            Cancelar
          </Link>
          <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={isLoading || (institutions.length === 0 && !courseId)}>
            {isLoading ? "Salvando..." : (courseId ? "Salvar Alterações" : "Adicionar Curso")}
          </button>
        </div>
      </form>
    </div>
  );
}