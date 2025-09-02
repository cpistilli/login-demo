import React from 'react';
import LoginForm from '../components/LoginForm'
import { Link } from 'react-router-dom';
import './Page.css'

function LoginPage() {
    return (
        <div className="page-container">
            <div className="form-opcion">
                <LoginForm />
                <div className="page-footer">
                     <p> Aun no tienes una cuenta? <Link to="/register">Registrate Aqui</Link></p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;