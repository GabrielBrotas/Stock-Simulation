import React from "react"
import AppHeader from "../../components/AppHeader"

import Aside from "../../components/Aside"
import './styles.css'

function Buy() {
    
    return (
        <div id="app-container">
            
            <Aside />

            <main>
                <div className="app-main-wrapper">
                    <AppHeader title="Comprar" />
                    
                    <fieldset className="buy-container">
                        <label>Código da Ação</label>
                        <input type="text" />
                        
                        <label>Quantidade</label>
                        <input type="text" />

                        <button>
                            Comprar
                        </button>
                    </fieldset>

                </div>       
                
            </main>
        </div>
    )
}

export default Buy