// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MemberList from './components/Members/MemberList';
// Importar otros componentes

function App() {
  return (
    <Router>
      <div>
        <nav>
          {/* Agregar navegación */}
        </nav>
        <Switch>
          <Route path="/members" component={MemberList} />
          {/* Agregar más rutas */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;