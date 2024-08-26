import {useState} from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
  try {
    const response = await axios.post('http://localhost:3001/api/auth/login', {username, password}, {withCredentials: true})
    if(response.status === 200) {
      navigate('/')
    }
  } catch (error) {
      console.error('Login failed', error)
      alert('Contraseña o usuario erróneos')
  }
  }
  return (
    <section className='text-gray-600 body-font'>
      <div className='container px-5 py-24 mx-auto flex flex-wrap items-center'>
        <div className='lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0'>
          <h1 className='title-font font-medium text-3xl text-white'>
            Programa gestor de grupos para el SESPA
          </h1>
          <p className='leading-relaxed mt-4 text-red-200'>
            Programa para la gestión de grupos del HUCA
          </p>
        </div>
        <div className='lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0'>
        <form onSubmit={handleLogin}>
          <h2 className='text-gray-900 text-lg font-medium title-font mb-5'>
           Login 
          </h2>
          <div className='relative mb-4'>
            <label
              htmlFor='full-name'
              className='leading-7 text-sm text-gray-600'
            >
             Usuario 
            </label>
            <input
              type='text'
              id='full-name'
              name='full-name'
              className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              value = {username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='relative mb-4'>
            <label htmlFor='password' className='leading-7 text-sm text-gray-600'>
              Contraseña
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>
          <button
             className='text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'
             type='submit'
             >
            Acceder
          </button>
          <p className='text-xs text-gray-500 mt-3'>
            Introduzca usuario y contraseña para acceder a la aplicación.
          </p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default LoginPage