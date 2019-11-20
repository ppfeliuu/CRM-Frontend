import React from 'react'

export const Header = () => {
    return (
        <header className="barra">
            <div className="contenedor">
                <div className="contenido-barra">
                    <h1>CRM - Admin Clientes</h1>

                    <button type="button"><i className="far fa-times-circle"></i></button>
                </div>
               
            </div>            
        </header>
    )
}

export default Header;