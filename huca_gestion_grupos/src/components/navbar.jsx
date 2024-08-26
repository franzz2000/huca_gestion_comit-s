import { useContext } from 'react';
import { NavLink } from "react-router-dom"
import { AuthContext } from '../context/AuthContext';
import axios from 'axios'

const Navbar = () => {
  const btnLink = 'block py-1 text-white hover:text-accent cursor-pointer mr-4'
  const btnActive = 'block py-1 text-accent mr-4'
  const {user}  = useContext(AuthContext)

  return (
    <header className="text-gray-600 body-font">
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span className="ml-3 text-xl font-semibold text-white">HCGrupos</span>
      </a>
      <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
        <NavLink to="/miembros" className={({isActive}) => isActive?btnActive:btnLink}>Miembros</NavLink>
        <NavLink to="/grupos" className={({isActive}) => isActive?btnActive:btnLink}>Grupos</NavLink>
        <NavLink to="/reuniones" className={({isActive}) => isActive?btnActive:btnLink}>Reuniones</NavLink>
      </nav>
      {user ? (
          <p>Bienvenido, {user.fullname} <button onClick={()=>axios.post('http://localhost:3001/api/auth/logout')}>Logout</button></p> // Mostrar el nombre del usuario
        ) : (
          <NavLink to="/login" className={({isActive})=> isActive?btnActive:btnLink}>Login</NavLink>
        )}
    </div>
  </header>
  )
}

export default Navbar
