import React from "react"
import AppHeader from "../../components/AppHeader"

import Aside from "../../components/Aside"

function History() {
    
    return (
        <div id="app-container">
            
            <Aside />

            <main>
                <div className="app-main-wrapper">
                    <AppHeader title="Histórico" />

                </div>       
            </main>
        </div>
    )
}

export default History