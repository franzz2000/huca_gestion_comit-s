import { Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "./components/layout"
import { Navbar } from "./components/navbar"
import { Inicio } from "./pages/inicio"
import Reuniones from "./pages/reuniones"
import Miembros from "./pages/miembros"
import { Grupos } from "./pages/grupos"
import { Footer } from "./components/footer"
import { Login } from "./pages/login"

function App() {

  return (
    <>
      <div className="bg-secondary min-h-screen">
        <Navbar></Navbar>
        <Layout>
            <Routes>
              <Route path="/" element={<Inicio></Inicio>}></Route>
              <Route path="/miembros" element={<Miembros></Miembros>}></Route>
              <Route path="/grupos" element={<Grupos></Grupos>}></Route>
              <Route path="/reuniones" element={<Reuniones></Reuniones>}></Route>
              <Route path="/login" element={<Login></Login>}></Route>
              <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
            </Routes>
        </Layout>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
