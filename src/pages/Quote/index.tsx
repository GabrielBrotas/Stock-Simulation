import React from "react"
import AppHeader from "../../components/AppHeader"

import Aside from "../../components/Aside"
import './styles.css'

function Quote() {
    
    return (
        <div id="app-container">
            
            <Aside />

            <main>
                <div className="app-main-wrapper">
                    <AppHeader title="Cotação de Ações" />
                    
                    <fieldset className="quote-container">
                        <label>Código da Ação</label>

                        <input type="text" />

                        <span>Uma ação de TSLA34 vale U$137,60</span>

                        <button>
                            Cotar
                        </button>
                    </fieldset>

                </div>                       
            </main>
        </div>
    )
}

export default Quote