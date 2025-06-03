// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import BolsaPage from './pages/BolsaPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import CadastroBolsista from './pages/CadastroBolsista.jsx';
import Login from './pages/Login.jsx';
import RegisterForm from './pages/RegisterForm.jsx';
import MyOportunities from './pages/MyOportunities.jsx';
import MyCourses from './pages/MyCourses.jsx';

// Componentes do Admin
import AdminLayout from './components/admin/AdminLayout.jsx';
import Dashboard from  './pages/admin/Dashboard.jsx';
import Institutions from './pages/admin/Institutions.jsx';
import InstitutionForm from './pages/admin/InstitutionForm.jsx';
import Courses from './pages/admin/Courses.jsx';
import CourseForm from './pages/admin/CoursesForm.jsx'; 
import Users from './pages/admin/Users.jsx';
// import UserForm from './pages/admin/UserForm.jsx'; 
import ScholarshipHolders from './pages/admin/ScholarshipHolders.jsx';
import ScholarshipHolderForm from './pages/admin/ScholarshipHolderForm.jsx';
import Inscriptions from './pages/admin/Inscriptions.jsx';
import InscriptionDetails from './pages/admin/InscripitionDetails.jsx'; 
// import Dependents from './pages/admin/Dependents.jsx'; 
// import DependentForm from './pages/admin/DependentForm.jsx'; 

import PrivateRoute from './components/PrivateRoute.jsx';

import { AppProvider } from './contexts/AppContext.jsx';
import { OpportunitiesProvider } from './contexts/OpportunitiesContext.jsx';

import './index.css';
import ProfilePage from './pages/ProfilePage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "cadastro", element: <RegisterForm /> },
      { path: "bolsa/:id", element: <BolsaPage /> },
      { path: "inscricao/:id", element: <CadastroBolsista /> },
      { path: "minhas-bolsas", element: <MyOportunities /> },
      { path: "favoritos", element: <FavoritesPage /> },
      { path: "meus-cursos", element: <MyCourses /> },
      { path: "perfil", element: <ProfilePage /> },
    ],
  },
  {
    element: <PrivateRoute roles={["ROLE_ADMIN"]} redirectTo="/login" />, 
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "institutions", element: <Institutions /> },
          { path: "institutions/new", element: <InstitutionForm /> },
          { path: "institutions/edit/:id", element: <InstitutionForm /> },
          { path: "courses", element: <Courses /> },
          { path: "courses/new", element: <CourseForm /> },
          { path: "courses/edit/:id", element: <CourseForm /> },
          { path: "users", element: <Users /> },
          { path: "scholarship-holders", element: <ScholarshipHolders /> },
          { path: "scholarship-holders/new", element: <ScholarshipHolderForm /> }, 
          { path: "scholarship-holders/edit/:id", element: <ScholarshipHolderForm /> },
          { path: "inscriptions", element: <Inscriptions /> },
          { path: "inscriptions/:id", element: <InscriptionDetails /> },
        ]
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <OpportunitiesProvider>
        {/*  */}
        <RouterProvider router={router} />
      </OpportunitiesProvider>
    </AppProvider>
  </StrictMode>
);