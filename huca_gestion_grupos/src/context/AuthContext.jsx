// src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null)

    useEffect(() => {
        // Aquí se puede hacer una solicitud para comprobar si el JWT es válido
        axios.get('http://localhost:3001/api/auth', { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    setIsAuthenticated(true);
                    setUser(response.data.user)
                } else {
                    setIsAuthenticated(false);
                }
            })
            .catch(error => {
                console.error('Error checking authentication', error);
                setIsAuthenticated(false);
            });
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider