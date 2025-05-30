// src/pages/admin/Courses.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
  </svg>
);
const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M2.695 14.763l-1.262 3.154a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.885L17.5 5.5a2.121 2.121 0 0 0-3-3L3.58 13.42a4 4 0 0 0-.885 1.343Z" />
    </svg>
);
const TrashIcon = () => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.58.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25V4.075c.827-.05 1.66-.075 2.5-.075Z" clipRule="evenodd" />
</svg>
);

export default function Courses() {
  const [coursesByInstitution, setCoursesByInstitution] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCoursesAndGroup();
  }, []);

  const fetchCoursesAndGroup = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get("/courses");
      const fetchedCourses = Array.isArray(res.data) ? res.data : [];
      
      const grouped = fetchedCourses.reduce((acc, course) => {
        const institutionName = course.institutions?.name || "Instituição Desconhecida";
        if (!acc[institutionName]) {
          acc[institutionName] = { id: course.institutions?.id, courses: [] };
        }
        acc[institutionName].courses.push(course);
        return acc;
      }, {});
      setCoursesByInstitution(grouped);

    } catch (err) {
      console.error("Erro ao buscar cursos:", err);
      setError("Falha ao carregar cursos. Tente novamente mais tarde.");
      setCoursesByInstitution({});
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    if (window.confirm("Tem certeza que deseja excluir este curso?")) {
      setIsLoading(true);
      setError(null);
      try {
        await axiosInstance.delete(`/courses/${courseId}`);
        alert("Curso excluído com sucesso!");
        fetchCoursesAndGroup(); 
      } catch (err) {
        console.error("Erro ao excluir curso:", err.response?.data || err.message);
        const apiError = err.response?.data?.message || `Falha ao excluir curso.`;
        setError(apiError);
        alert(apiError);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const institutionGroupNames = Object.keys(coursesByInstitution);

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <header className="mb-6 md:mb-8 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
          Cursos por Instituição
        </h1>
        <Link
          to="/admin/courses/new"
          className="btn btn-primary inline-flex items-center w-full sm:w-auto justify-center"
        >
          <PlusIcon />
          Adicionar Curso
        </Link>
      </header>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md shadow" role="alert">
          <p className="font-bold">Erro</p>
          <p>{error}</p>
        </div>
      )}

      {isLoading && institutionGroupNames.length === 0 && <p className="p-8 text-center text-gray-500">Carregando cursos...</p>}
      {!isLoading && institutionGroupNames.length === 0 && !error && (
         <div className="p-8 text-center text-gray-500 bg-white rounded-xl shadow-xl">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhum curso cadastrado</h3>
            <p className="mt-1 text-sm text-gray-500">Comece adicionando um novo curso.</p>
          </div>
      )}

      {institutionGroupNames.map(institutionName => (
        <div key={coursesByInstitution[institutionName].id || institutionName} className="mb-8 bg-white rounded-xl shadow-xl overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-800 bg-gray-50 p-4 sm:p-6 border-b border-gray-200">
            {institutionName}
          </h2>
          {coursesByInstitution[institutionName].courses.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {coursesByInstitution[institutionName].courses.map(course => (
                <li key={course.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                        <p className="text-md font-medium text-gray-900">{course.name}</p>
                        <p className="text-sm text-gray-500">
                           ID: {course.id} 
                           {course.shift && ` | Turno: ${course.shift}`}
                           {course.percentageScholarship !== null && ` | Bolsa: ${course.percentageScholarship}%`}
                           {course.status !== null && ` | Status: ${course.status ? 'Ativo' : 'Inativo'}`}
                        </p>
                    </div>
                    <div className="mt-3 sm:mt-0 flex-shrink-0 flex space-x-1 sm:space-x-3">
                      <button 
                        onClick={() => navigate(`/admin/courses/edit/${course.id}`)} 
                        className="p-1.5 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-100 rounded-md transition-colors"
                        title="Editar Curso"
                        disabled={isLoading}
                      >
                        <EditIcon />
                      </button>
                      <button 
                        onClick={() => handleDelete(course.id)} 
                        className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-md transition-colors"
                        title="Excluir Curso"
                        disabled={isLoading}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : ( /* Este caso não deveria ocorrer se a instituição só aparece se tiver cursos */
            <p className="p-6 text-gray-500">Nenhum curso encontrado para esta instituição.</p>
          )}
        </div>
      ))}
    </div>
  );
}