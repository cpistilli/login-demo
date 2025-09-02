import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './RegisterForm.css'
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
    const [username, setUsername]= useState('');
    const [password, setPassword]= useState('');
    const [message, setMessage]= useState('');
    const [errors, setErrors] = useState('');

    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!username.trim()) {
            newErrors.username = 'El nombre de usuario es obligatorio';
        }
        if (!password) {
            newErrors.password = 'La contrasena es obligatoria';
        } else if (password.length < 6) {
            newErrors.password = 'La contrasena debe tener al menos 6 caracteres';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            await axios.post('http://localhost:8080/register', {
               username, password
            });
            setMessage('¡Usuario registrado con exito!')
            setUsername('');
            setPassword('');

            setTimeout(() =>{
                navigate('/');
            }, 3000);

        } catch (error) {
            setMessage('¡Error al registrar usuario!');
        }
    };


    return (
        <div className="register-container">
            <form onSubmit={handleRegister} className="register-form">
                <h2>Registrarse</h2>
                <input type="text" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} />
                {errors.username && <p className={"input-error"}>{errors.username}</p>}
                <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
                {errors.password && <p className={"input-error"}>{errors.password}</p>}
                <button type="submit" disabled={Object.keys(errors).length > 0}>Registrarse</button>
                <p className="message">{message}</p>
            </form>
        </div>
    );
}

export default RegisterForm;