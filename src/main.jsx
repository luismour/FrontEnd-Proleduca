import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import HomePage from './pages/HomePage.jsx'
import BolsaPage from './pages/BolsaPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import CadastroBolsista from './pages/CadastroBolsista.jsx'
import Login from './pages/Login.jsx'
import RegisterForm from './pages/RegisterForm.jsx'
import MyOportunities from './pages/MyOportunities.jsx'
import MyCourses from './pages/MyCourses.jsx'

import AdminLayout from './components/admin/AdminLayout.jsx'
import Dashboard from  './pages/admin/Dashboard.jsx'
import Institutions from './pages/admin/Institutions.jsx'
import Courses from './pages/admin/Courses.jsx'
import Users from './pages/admin/Users.jsx'

import PrivateRoute from './components/PrivateRoute.jsx'

import { AppProvider } from './contexts/AppContext.jsx'
import { OpportunitiesProvider } from './contexts/OpportunitiesContext.jsx'

import './index.css'

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
    ],
  },
  {
    element: <PrivateRoute />, // Protege as rotas admin
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "institutions", element: <Institutions /> },
          { path: "courses", element: <Courses /> },
          { path: "users", element: <Users /> },
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <OpportunitiesProvider>
        <RouterProvider router={router} />
      </OpportunitiesProvider>
    </AppProvider>
  </StrictMode>
)
