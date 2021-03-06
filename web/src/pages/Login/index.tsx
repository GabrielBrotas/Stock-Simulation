import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/usersActions';
import { StateProps } from '../../redux/store';

import {FiArrowLeft} from 'react-icons/fi';
import logoImg from '../../assets/images/logo-with-name.png';
import './styles.css';

function Login() {

    const {push} = useHistory();
    const dispatch = useDispatch();

    const {error} = useSelector( (state: StateProps) => state.user)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogIn() {
        const userData = {email, password}
        dispatch(loginUser(userData, push))
    }

    return (
        <div id="page-content">
            <aside className="aside-app-content">
                <img src={logoImg} alt="logo" />
            </aside>    

            <main className="login-content">
                <fieldset>
                    <h2>Fazer Login</h2>

                    <label>E-mail</label>
                    <input
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {error.email && <span className="error">{error.email}</span>}

                    <label>Senha</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={e => setPassword( e.target.value)}    
                    />
                    {error.password && <span className="error">{error.password}</span>}

                    <div className="login-options">
                        <div className="input-check-box">
                            <input type="checkbox" />
                            <p>Lembrar-me</p>
                        </div>
                        <Link to="/forget-password">Esqueci minha senha</Link>
                    </div>

                    <button 
                    className={(email === "" || password === "") ? "submit-button disabled" : "submit-button activated"}
                    onClick={handleLogIn} 
                    disabled={email === "" || password === ""}
                    >
                        Entrar
                    </button>

                    <Link to="/" className="goBack-button">
                        <FiArrowLeft size={24} color="#FFFFFF" />
                    </Link>

                    <Link to="/register" className="register-text">
                     Ainda não tem uma conta? Clique aqui
                    </Link>

                </fieldset>
            </main>
        </div>
    )
}

export default Login