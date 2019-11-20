import React, { useContext } from 'react';
//importar context
import { CRMContext } from "../../context/CRMContext";

export const Header = () => {
    //usar los valores del context
  const [auth, setAuth] = useContext(CRMContext);

  
    return (
        <header className="barra">
            <div className="contenedor">
                <div className="contenido-barra">
                    <h1>CRM - Admin Clientes</h1>
                    {auth.auth ? (<button type="button" className="btn btn-rojo"><i className="far fa-times-circle"></i>Cerrar Sesión</button>) : null}
                    
                </div>
               
            </div>            
        </header>
    )
}

export default Header;