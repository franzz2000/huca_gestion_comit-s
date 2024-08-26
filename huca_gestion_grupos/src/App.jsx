import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Navbar from "./components/Navbar"
import Reuniones from "./pages/Reuniones"
import Miembros from "./pages/miembros"
import Grupos  from "./pages/Grupos"
import Footer from "./components/Footer"
import LoginPage from "./pages/LoginPage"
import AuthProvider from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  return (
    <AuthProvider>
      <div className="bg-secondary min-h-screen">
        <Navbar></Navbar>
        <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/grupos"></Navigate>}></Route>
              /<Route path="/miembros" element={<ProtectedRoute><Miembros></Miembros></ProtectedRoute>}></Route>
              <Route path="/grupos" element={<ProtectedRoute><Grupos></Grupos></ProtectedRoute>}></Route>
              <Route path="/reuniones" element={<ProtectedRoute><Reuniones></Reuniones></ProtectedRoute>}></Route>
              <Route path="/login" element={<LoginPage></LoginPage>}></Route>
              <Route path="/*" element={<ProtectedRoute><Navigate to="/grupos"></Navigate></ProtectedRoute>}></Route>
            </Routes>
        </Layout>
        <Footer></Footer>
      </div>
    </AuthProvider>
  )
}

export default App
