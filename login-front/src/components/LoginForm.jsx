import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';

function LoginForm() {
    const navigate = useNavigate();
    const [username, setUsername]= useState('');
    const [password, setPassword]= useState('');
    const [message, setMessage]= useState('');
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!username.trim()) {
            newErrors.username = 'El nombre de usuario es obligatorio';
        }
        if (!password) {
            newErrors.password = 'La contrasena es obligatoria';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        setMessage('');
        try {
            await axios.post('http://localhost:8080/login', {
                username, password,
            });
            setMessage('¡Login Exitoso!');
            setUsername('');
            setPassword('');
            localStorage.setItem('loggedIn', 'true');
            navigate('/app/cities', { replace: true });
        } catch (error) {
            setMessage('¡Error, credenciales invalidas!');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Iniciar Sesion</h2>
                <input type="text" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} />
                {errors.username && <p className={"input-error"}>{errors.username}</p>}
                <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
                {errors.password && <p className={"input-error"}>{errors.password}</p>}
                <button type="submit" disabled={Object.keys(errors).length > 0}>Ingresar</button>
                <p className="message">{message}</p>
            </form>
        </div>
    );
}

export default LoginForm;