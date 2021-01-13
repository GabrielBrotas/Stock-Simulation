import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/actions/usersActions';
import { StateProps } from '../../redux/store'

import {FiArrowLeft} from 'react-icons/fi'
import logoImg from '../../assets/images/logo-with-name.png';
import './styles.css'


function Register() {

    const {push} = useHistory();
    const dispatch = useDispatch();

    const {error} = useSelector( (state: StateProps) => state.user);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function handleRegister() {
        const userData = {email, password, confirmPassword}

        dispatch(registerUser(userData, push))
    }

    return (
        <div id="page-content">
            <aside className="aside-app-content">
                <img src={logoImg} alt="logo" />
            </aside>    

            <main className="register-content">
                <fieldset>
                    <h2>Registrar</h2>

                    <label>E-mail</label>
                    <input
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    {error.email && <span className="error">{error.email}</span>}

                    <label>Senha</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}    
                        required
                    />
                    {error.password && <span className="error">{error.password}</span>}

                    <label>Confirmar Senha</label>
                    <input 
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}    
                        required
                    />

                    <Link className="back-to-login" to="/login">Já possuo uma conta</Link>

                    <button 
                    className={(email === "" || password === "" || confirmPassword === "") ? "submit-button disabled" : "submit-button activated"} 
                    onClick={handleRegister} 
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