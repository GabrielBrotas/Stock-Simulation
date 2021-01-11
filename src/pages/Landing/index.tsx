import React from 'react'
import {Link} from 'react-router-dom'

import logoImg from '../../assets/images/logo-with-name.png'
import './styles.css'

function Landing() {

    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <main>
                    <h1>
                        Invista, simule investimentos e aprenda. <br />
                        Sem riscos.
                    </h1>
                    <p className="app-description">
                        insera ativos financeiros com suas cotações na sua carteira para aprender a investir
                    </p>
                                    
                    <Link to="/app" className="enter-app">
                        <p>Acessar</p>
                    </Link>
                    
                </main>
                
                <section>
                    <img src={logoImg} alt="happy" />
                </section>
            </div>
        </div>
    )
}

export default Landing
