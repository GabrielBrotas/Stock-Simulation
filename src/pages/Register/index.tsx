import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import {FiArrowLeft} from 'react-icons/fi'

import logoImg from '../../assets/images/logo-with-name.png';
import './styles.css'

function Register() {

    const {push} = useHistory();
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleLogIn() {
        const userData = {email, password}
    }

    return (
        <div id="page-content">
            <aside className="aside-app-content">
                <img src={logoImg} alt="logo" />
            </aside>    

            <main className="login-content">
                <fieldset>
                    <h2>Registrar</h2>

                    <label>E-mail</label>
                    <input
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <label>Senha</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={e => setPassword( e.target.value)}    
                    />

                    <label>Confirmar Senha</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={e => setPassword( e.target.value)}    
                    />

                    <Link className="back-to-login" to="/login">Já possuo uma conta</Link>

                    <button 
                    className="submit-button" 
                    onClick={handleLogIn} 
                    disabled={email === "" || password === ""}
                    >
                        Cadastrar
                    </button>

                    <Link to="/login" className="goBack-button">
                        <FiArrowLeft size={24} color="#FFFFFF" />
                    </Link>

                </fieldset>
            </main>
        </div>
    )
}

export default Register