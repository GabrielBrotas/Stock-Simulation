import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiBriefcase, FiSearch, FiShoppingBag, FiDollarSign, FiClock, FiPower } from 'react-icons/fi';

import logoImg from '../../assets/images/logo.png';
import './styles.css'

function Aside() {

    const {push} = useHistory();

    function handleGoToAppPage() {
        push('/wallet')
    }

    function handleLogoutUser() {

    }

    return (
        <aside className="aside-container">
            <img src={logoImg} alt="Stocks Simulation" onClick={handleGoToAppPage} style={{cursor: 'pointer'}}/>

            <div className="aside-main-content">
                <Link to="/wallet">
                    <FiBriefcase size={24} color="#fff" />
                    Carteira
                </Link>

                <Link to="/wallet">
                    <FiSearch size={24} color="#fff" />
                    Cotar
                </Link>

                <Link to="/wallet">
                    <FiShoppingBag size={24} color="#fff" />
                    Comprar
                </Link>

                <Link to="/wallet">
                    <FiDollarSign size={24} color="#fff" />
                    Vender
                </Link>

                <Link to="/wallet">
                    <FiClock size={24} color="#fff" />
                    Histórico
                </Link>
            </div>

            <footer>
                <button type="button" onClick={handleLogoutUser}>
                    <FiPower size={24} color="#fff" />
                </button>
            </footer>
    </aside>
    )

}

export default Aside