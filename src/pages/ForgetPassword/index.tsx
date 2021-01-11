import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import {FiArrowLeft} from 'react-icons/fi'

import logoImg from '../../assets/images/logo-with-name.png';
import './styles.css'

function Login() {

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

            <main className="forget-password-content">
                <fieldset>
                    <h2>Esqueci minha senha</h2>
                    
                    <p>
                        Sua redefinição de senha será enviada para o e-mail cadastrado.
                    </p>

                    <label>E-mail</label>
                    <input
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <button 
                    className="submit-button" 
                    onClick={handleLogIn} 
                    disabled={email === "" || password === ""}
                    >
                        Entrar
                    </button>

                    <Link to="/login" className="goBack-button">
                        <FiArrowLeft size={24} color="#FFFFFF" />
                    </Link>

                </fieldset>
            </main>
        </div>
    )
}

export default Login