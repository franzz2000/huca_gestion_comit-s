import { Route, Routes } from "react-router-dom"
import { Layout } from "./components/layout"
import { Navbar } from "./components/navbar"
import { Inicio } from "./pages/inicio"
import { Cursos } from "./pages/cursos"

function App() {

  return (
    <>
      <div className="bg-secondary min-h-screen">
        <Navbar></Navbar>
        <Layout>
            <Routes>
              <Route path="/" element={<Inicio></Inicio>}></Route>
              <Route path="/cursos" element={<Cursos></Cursos>}></Route>
            </Routes>
        </Layout>
      </div>
    </>
  )
}

export default App
