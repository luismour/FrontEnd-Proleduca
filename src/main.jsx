import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import HomePage from './pages/HomePage.jsx'
import BolsaPage from './pages/BolsaPage.jsx'
import './index.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import FavoritesPage from './pages/FavoritesPage.jsx'
import { AppProvider } from './contexts/AppContext.jsx'
import { OpportunitiesProvider } from './contexts/OpportunitiesContext.jsx'
import CadastroBolsista from './pages/CadastroBolsista.jsx'
import Login from './pages/Login.jsx'
import RegisterForm from './pages/RegisterForm.jsx'
import MyOportunities from './pages/MyOportunities.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
      path: "/cadastro",
      element: <RegisterForm />,
      },
      {
      path: "/bolsa/:id",
      element: <BolsaPage />,
      },
      {
      path: "/inscricao/:id",
      element: <CadastroBolsista />, 
      },
      {
        path: "/minhas-bolsas",
        element: <MyOportunities />,
      },
      {
      path: "/favoritos",
      element: <FavoritesPage />,
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <OpportunitiesProvider>
        <RouterProvider router={router} />
      </OpportunitiesProvider>
    </AppProvider>
  </StrictMode>,
)
