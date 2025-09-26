import React, { useState } from 'react'
import './login.css' 
const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.username === 'ibrohim' && credentials.password === '20102009') {
            localStorage.setItem('isAuthenticated', 'true');
            window.location.href = '/';
        } else {
            alert('Login yoki parol noto‘g‘ri');
        }
    };
    return (
        <div>
            <div className="background-login">
                <div className="max-width">
                    <div className="div-login">
                        <div className="login-left">
                            
                        </div>
                        <div className="login-right">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <h2>Instagram</h2> <br />
                                    <label>Foydalanuvchi nomi</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={credentials.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Parol</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit">Kirish</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login