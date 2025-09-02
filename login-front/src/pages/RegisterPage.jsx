import React from 'react';
import RegisterForm from '../components/RegisterForm'
import { Link } from 'react-router-dom';
import LoginForm from "../components/LoginForm";
import './Page.css'

function RegisterPage() {
    return (
        <div className="page-container">
            <div className="form-opcion">
                <RegisterForm />
                <div className="page-footer">
                    <p> Ya tienes una cuenta? <Link to="/">Inicia Sesion</Link></p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;