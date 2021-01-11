import React from "react"
import AppHeader from "../../components/AppHeader"

import Aside from "../../components/Aside"

function Buy() {
    
    return (
        <div id="app-container">
            
            <Aside />

            <main>
                <div className="app-main-wrapper">
                    <AppHeader title="Comprar" />

                </div>       
                
            </main>
        </div>
    )
}

export default Buy