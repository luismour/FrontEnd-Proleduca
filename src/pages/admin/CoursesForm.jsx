// src/pages/admin/CoursesForm.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../api/axiosInstance';
import LoadingSpinner from '../../components/LoadingSpinner';

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-1.5">
        <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.56l2.72 2.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 1 1 1.06 1.06L5.56 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
    </svg>
);

// Ícone de Lupa para o campo de busca
const SearchIconInput = ({ className = "w-4 h-4 text-gray-400" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);


export default function CoursesForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);
    const [initialValues, setInitialValues] = useState({
        institutionsId: '',
        name: '',
        vacancies: '',
        percentageScholarship: '',
        originalValue: '',
        discountValue: '',
        shift: '',
        imageUrl: '',
        discountEntrance: '',
        status: true,
        description: ''
    });
    const [allInstitutions, setAllInstitutions] = useState([]);
    const [institutionSearchTerm, setInstitutionSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState('');

    const shifts = ["Matutino", "Vespertino", "Noturno", "Integral", "Flexível"];

    useEffect(() => {
        async function fetchInstitutions() {
            try {
                const res = await axiosInstance.get('/institutions');
                if (Array.isArray(res.data)) {
                    setAllInstitutions(res.data);
                } else {
                    setAllInstitutions([]);
                }
            } catch (error) {
                console.error("Erro ao buscar instituições:", error);
                setFormError("Não foi possível carregar as instituições.");
                setAllInstitutions([]);
            }
        }
        fetchInstitutions();

        if (isEditing) {
            setLoading(true);
            axiosInstance.get(`/courses/${id}`)
                .then(response => {
                    const courseData = response.data;
                    setInitialValues({
                        institutionsId: courseData.institutions?.id || '',
                        name: courseData.name || '',
                        vacancies: courseData.vacancies || '',
                        percentageScholarship: courseData.percentageScholarship || '',
                        originalValue: courseData.originalValue || '',
                        discountValue: courseData.discountValue || '',
                        shift: courseData.shift || '',
                        imageUrl: courseData.imageUrl || '',
                        discountEntrance: courseData.discountEntrance || '',
                        status: courseData.status === undefined ? true : Boolean(courseData.status),
                        description: courseData.description || ''
                    });
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Erro ao buscar dados do curso:", error);
                    setFormError(`Não foi possível carregar os dados do curso: ${error.message}`);
                    setLoading(false);
                });
        }
    }, [id, isEditing]);

    const filteredInstitutions = useMemo(() => {
        if (!institutionSearchTerm) {
            return allInstitutions;
        }
        return allInstitutions.filter(inst =>
            inst.name.toLowerCase().includes(institutionSearchTerm.toLowerCase())
        );
    }, [allInstitutions, institutionSearchTerm]);

    const validationSchema = Yup.object().shape({
        // ... (validações como antes)
        institutionsId: Yup.number().required('Instituição é obrigatória.'),
        name: Yup.string().required('Nome do curso é obrigatório.'),
        vacancies: Yup.number().required('Número de vagas é obrigatório.').min(0, 'Vagas não podem ser negativas.').integer('Vagas devem ser um número inteiro.'),
        percentageScholarship: Yup.number().required('Percentual da bolsa é obrigatório.').min(0, 'Não pode ser negativo.').max(100, 'Não pode ser maior que 100.'),
        originalValue: Yup.number().required('Valor original é obrigatório.').min(0, 'Valor não pode ser negativo.'),
        discountValue: Yup.number().required('Valor com desconto é obrigatório.').min(0, 'Valor não pode ser negativo.')
            .test('is-less-than-original', 'Valor com desconto deve ser menor ou igual ao valor original.', function (value) {
                const { originalValue } = this.parent;
                return !originalValue || !value || parseFloat(value) <= parseFloat(originalValue);
            }),
        shift: Yup.string().required('Turno é obrigatório.'),
        imageUrl: Yup.string().url('URL da imagem inválida.').nullable(),
        discountEntrance: Yup.number().min(0, 'Não pode ser negativo.').nullable(),
        status: Yup.boolean(),
        description: Yup.string().max(1000, 'Descrição muito longa (máx. 1000 caracteres).').nullable()
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        // ... (handleSubmit como antes)
        setFormError('');
        setSubmitting(true);
        const payload = {
            name: values.name,
            vacancies: parseInt(values.vacancies, 10),
            percentageScholarship: parseFloat(values.percentageScholarship),
            originalValue: parseFloat(values.originalValue),
            discountValue: parseFloat(values.discountValue),
            shift: values.shift,
            imageUrl: values.imageUrl || null,
            discountEntrance: values.discountEntrance ? parseFloat(values.discountEntrance) : null,
            status: Boolean(values.status),
            description: values.description || null,
            institutionsId: parseInt(values.institutionsId, 10)
        };
        
        console.log("Payload para API:", payload);
        try {
            if (isEditing) {
                await axiosInstance.put(`/courses/${id}`, payload);
                alert('Curso atualizado com sucesso!');
            } else {
                await axiosInstance.post('/courses/create', payload);
                alert('Curso criado com sucesso!');
                resetForm({ 
                    values: { 
                        ...initialValues, 
                        institutionsId: '', 
                        name: '', 
                        description: '',
                        vacancies: '',
                        percentageScholarship: '',
                        originalValue: '',
                        discountValue: '',
                        shift: '',
                        imageUrl: '',
                        discountEntrance: '',
                        status: true,
                    } 
                });
                setInstitutionSearchTerm('');
            }
            navigate('/admin/courses');
        } catch (error) {
            console.error("Erro ao salvar curso:", error.response?.data || error.message);
            setFormError(error.response?.data?.message || `Ocorreu um erro ao salvar o curso: ${error.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading && isEditing) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <LoadingSpinner size="h-10 w-10" />
                <p className="ml-3 text-gray-600">Carregando dados do curso...</p>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-3xl mx-auto">
                 <button
                    onClick={() => navigate('/admin/courses')}
                    className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 mb-6 group"
                >
                    <BackArrowIcon />
                    Voltar para Lista de Cursos
                </button>

                <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
                        {isEditing ? 'Editar Curso' : 'Adicionar Novo Curso'}
                    </h1>

                    {formError && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md" role="alert">
                            <p className="font-bold">Erro ao Salvar</p>
                            <p>{formError}</p>
                        </div>
                    )}

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        {({ isSubmitting, dirty, isValid, errors, touched }) => (
                            <Form className="space-y-6">
                                <div>
                                    <label htmlFor="institutionsId" className="form-label">Instituição*</label>
                                    {/* Input de busca/filtro para instituições, estilizado para parecer parte do campo */}
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <SearchIconInput />
                                        </div>
                                        <input
                                            type="text"
                                            id="institutionSearch"
                                            placeholder="Buscar instituição pelo nome..."
                                            value={institutionSearchTerm}
                                            onChange={(e) => setInstitutionSearchTerm(e.target.value)}
                                            className="form-input pl-10 mb-2 w-full" // Adicionado w-full
                                        />
                                    </div>
                                    <Field 
                                        as="select" 
                                        name="institutionsId" 
                                        id="institutionsId" 
                                        className={`form-input ${touched.institutionsId && errors.institutionsId ? 'border-red-500' : ''}`}
                                        disabled={allInstitutions.length === 0 && !institutionSearchTerm}
                                    >
                                        <option value="">
                                            {allInstitutions.length === 0 && !institutionSearchTerm ? "Carregando..." : 
                                             filteredInstitutions.length === 0 && institutionSearchTerm ? "Nenhuma encontrada" :
                                             "Selecione na lista"}
                                        </option>
                                        {filteredInstitutions.map(inst => (
                                            <option key={inst.id} value={inst.id}>{inst.name}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="institutionsId" component="div" className="form-error" />
                                </div>

                                <div>
                                    <label htmlFor="name" className="form-label">Nome do Curso*</label>
                                    <Field type="text" name="name" id="name" placeholder="Ex: Engenharia de Software" className={`form-input ${touched.name && errors.name ? 'border-red-500' : ''}`} />
                                    <ErrorMessage name="name" component="div" className="form-error" />
                                </div>
                                
                                <div>
                                    <label htmlFor="description" className="form-label">Descrição</label>
                                    <Field 
                                        as="textarea" 
                                        name="description" 
                                        id="description" 
                                        placeholder="Descreva brevemente o curso, seus objetivos, público-alvo, etc." 
                                        rows="4"
                                        className={`form-input ${touched.description && errors.description ? 'border-red-500' : ''}`} 
                                    />
                                    <ErrorMessage name="description" component="div" className="form-error" />
                                </div>

                                {/* ... (outros campos do formulário como antes) ... */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="vacancies" className="form-label">Vagas*</label>
                                        <Field type="number" name="vacancies" id="vacancies" placeholder="Ex: 50" className={`form-input ${touched.vacancies && errors.vacancies ? 'border-red-500' : ''}`} />
                                        <ErrorMessage name="vacancies" component="div" className="form-error" />
                                    </div>
                                    <div>
                                        <label htmlFor="percentageScholarship" className="form-label">Percentual da Bolsa (%)*</label>
                                        <Field type="number" name="percentageScholarship" id="percentageScholarship" placeholder="Ex: 50" className={`form-input ${touched.percentageScholarship && errors.percentageScholarship ? 'border-red-500' : ''}`} />
                                        <ErrorMessage name="percentageScholarship" component="div" className="form-error" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="originalValue" className="form-label">Valor Original (R$)*</label>
                                        <Field type="number" step="0.01" name="originalValue" id="originalValue" placeholder="Ex: 1200.00" className={`form-input ${touched.originalValue && errors.originalValue ? 'border-red-500' : ''}`} />
                                        <ErrorMessage name="originalValue" component="div" className="form-error" />
                                    </div>
                                    <div>
                                        <label htmlFor="discountValue" className="form-label">Valor com Desconto (R$)*</label>
                                        <Field type="number" step="0.01" name="discountValue" id="discountValue" placeholder="Ex: 600.00" className={`form-input ${touched.discountValue && errors.discountValue ? 'border-red-500' : ''}`} />
                                        <ErrorMessage name="discountValue" component="div" className="form-error" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="shift" className="form-label">Turno*</label>
                                        <Field as="select" name="shift" id="shift" className={`form-input ${touched.shift && errors.shift ? 'border-red-500' : ''}`}>
                                            <option value="">Selecione o turno</option>
                                            {shifts.map(s => <option key={s} value={s}>{s}</option>)}
                                        </Field>
                                        <ErrorMessage name="shift" component="div" className="form-error" />
                                    </div>
                                    <div>
                                        <label htmlFor="discountEntrance" className="form-label">Desconto na Matrícula (R$)</label>
                                        <Field type="number" step="0.01" name="discountEntrance" id="discountEntrance" placeholder="Ex: 300.00 (opcional)" className={`form-input ${touched.discountEntrance && errors.discountEntrance ? 'border-red-500' : ''}`} />
                                        <ErrorMessage name="discountEntrance" component="div" className="form-error" />
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="imageUrl" className="form-label">URL da Imagem do Curso</label>
                                    <Field type="url" name="imageUrl" id="imageUrl" placeholder="https://exemplo.com/imagem.jpg" className={`form-input ${touched.imageUrl && errors.imageUrl ? 'border-red-500' : ''}`} />
                                    <ErrorMessage name="imageUrl" component="div" className="form-error" />
                                </div>
                                
                                <div className="flex items-center space-x-3 mt-4">
                                    <Field type="checkbox" name="status" id="status" className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                                    <label htmlFor="status" className="text-sm text-gray-700 select-none">
                                        Curso Ativo
                                    </label>
                                </div>
                                <ErrorMessage name="status" component="div" className="form-error" />

                                <div className="pt-6 border-t border-gray-200 mt-8">
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-full flex justify-center items-center py-3 text-base"
                                        disabled={isSubmitting || !dirty || !isValid || loading}
                                    >
                                        {isSubmitting || loading ? (
                                            <>
                                                <LoadingSpinner size="h-5 w-5 mr-2" />
                                                Salvando...
                                            </>
                                        ) : (isEditing ? 'Atualizar Curso' : 'Adicionar Curso')}
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