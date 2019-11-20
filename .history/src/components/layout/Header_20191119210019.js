import React, { useContext } from 'react';
//importar context
import { CRMContext } from "../../context/CRMContext";
import { withRouter } from 'react-router-dom';

export const Header = (props) => {
    //usar los valores del context
  const [auth, setAuth] = useContext(CRMContext);

  const cerrarSesion = () => {
      setAuth({
          token: '',
          auth: false
      });

      localStorage.setItem('token', '');

      props.history.psuh('/iniciar-sesion');
  }

  
  
    return (
        <header className="barra">
            <div className="contenedor">
                <div className="contenido-barra">
                    <h1>CRM - Admin Clientes</h1>
                    {auth.auth ? (<button type="button" className="btn btn-rojo" onClick={cerrarSesion}><i className="far fa-times-circle"></i>Cerrar Sesión</button>) : null}
                    
                </div>
               
            </div>            
        </header>
    )
}

export default withRouter(Header);