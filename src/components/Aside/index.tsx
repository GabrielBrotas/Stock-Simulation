import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiBriefcase, FiSearch, FiShoppingBag, FiDollarSign, FiClock, FiPower } from 'react-icons/fi';

import logoImg from '../../assets/images/logo.png';
import './styles.css'

function Aside() {

    const history = useHistory();

    const [pathName, setPathName] = useState('')

    useEffect( () => {
        setPathName(history.location.pathname.split('/')[1])
    }, [history])

    function handleGoToAppPage() {
        history.push('/wallet')
    }

    function handleLogoutUser() {

    }

    return (
        <aside className="aside-container">
            <img src={logoImg} alt="Stocks Simulation" onClick={handleGoToAppPage} style={{cursor: 'pointer'}}/>

            <div className="aside-main-content">
                <Link to="/wallet" className={ pathName === "wallet" ? "active" : ""}>
                    <FiBriefcase size={24} color={pathName === "wallet" ? "#0000ff" : "#fff"} />
                    Carteira
                </Link>

                <Link to="/quote" className={ pathName === "quote" ? "active" : ""}>
                    <FiSearch size={24} color={pathName === "quote" ? "#0000ff" : "#fff"} />
                    Cotar
                </Link>

                <Link to="/buy" className={ pathName === "buy" ? "active" : ""}>
                    <FiShoppingBag size={24} color={pathName === "buy" ? "#0000ff" : "#fff"} />
                    Comprar
                </Link>

                <Link to="/sell" className={ pathName === "sell" ? "active" : ""}>
                    <FiDollarSign size={24} color={pathName === "sell" ? "#0000ff" : "#fff"} />
                    Vender
                </Link>

                <Link to="/history"  className={ pathName === "history" ? "active" : ""}>
                    <FiClock size={24} color={pathName === "history" ? "#0000ff" : "#fff"}/>
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