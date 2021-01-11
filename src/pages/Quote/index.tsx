import React from "react"
import AppHeader from "../../components/AppHeader"

import Aside from "../../components/Aside"

function Quote() {
    
    return (
        <div id="app-container">
            
            <Aside />

            <main>
                <div className="app-main-wrapper">
                    <AppHeader title="Cotação de Ações" />

                </div>       
                
            </main>
        </div>
    )
}

export default Quote