// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MemberList from './components/Members/MemberList';
// Importar otros componentes

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          {/* Agregar navegación */}
        </nav>
        <Routes>
          <Route path="/members" element={<MemberList />} />
          {/* Agregar más rutas */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;