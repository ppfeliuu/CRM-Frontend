import React, { useContext } from 'react';
//importar context
import { CRMContext } from "../../context/CRMContext";

export const Header = () => {
    //usar los valores del context
  const [auth, setAuth] = useContext(CRMContext);

  console.log(auth)
    return (
        <header className="barra">
            <div className="contenedor">
                <div className="contenido-barra">
                    <h1>CRM - Admin Clientes</h1>

                    <button type="button" className="btn btn-rojo"><i className="far fa-times-circle"></i>Cerrar Sesión</button>
                </div>
               
            </div>            
        </header>
    )
}

export default Header;