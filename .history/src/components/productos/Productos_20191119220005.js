import React, { useEffect, useState, Fragment, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Producto from './Producto';
import Spinner from '../layout/Spinner';


//importar context
import { CRMContext } from "../../context/CRMContext";

const Productos = (props) => {
    
  const [productos, setProductos] = useState([]);

//usar los valores del context
const [auth, setAuth] = useContext(CRMContext);

  useEffect(() => {

      if(!auth.token !== '') {
        try {
          const consultarAPI = async () => {
            const productosConsulta = await clienteAxios.get('/productos', {
              headers: {
                Authorization: `Bearer ${auth.token}`
              }
            });
            setProductos(productosConsulta.data);

        }
        consultarAPI();
        } catch (error) {
          //error con autorizacion
          if(error.response.status === 500) {
            props.history.push('/iniciar-sesion');
        }
        }
      } else {
        props.history.push('/iniciar-sesion');
      }

  }, [productos]);

  if(!auth.auth) {
    props.history.push('/iniciar-sesion');
  }

  // Spinner
  if(!productos.length) return <Spinner />

  return (
    <Fragment>
      <h2>Productos</h2>

      <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>

      <ul className="listado-productos">
        {productos.map(producto => (
            <Producto
                key={producto._id}
                producto={producto}
            />
        ))}
      </ul>
    </Fragment>
  );
};

export default withRouter(Productos);
