import React, { useState, useEffect, Fragment, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import Spinner from "../layout/Spinner";

// Import cliente axios
import clienteAxios from "../../config/axios";

import Cliente from "./Cliente";

//importar context
import { CRMContext } from "../../context/CRMContext";

const Clientes = (props) => {
  const [clientes, setClientes] = useState([]);

  //usar los valores del context
  const [auth, setAuth] = useContext(CRMContext);

  useEffect(() => {
    if (auth.token !== "") {
      const consultarAPI = async () => {
        try {
            const clientesConsulta = await clienteAxios.get("/clientes", {
                headers: {
                  Authorization: `Bearer ${auth.token}`
                }
              });
      
              setClientes(clientesConsulta.data);
        } catch (error) {
            //error con autorizacion
            if(error.response.status === 500) {
                props.history.push('/iniciar-sesion');
            }
        }
      };

      consultarAPI();
    } else {
        props.history.push('/iniciar-sesion');
    }
  }, [clientes]);

  if(!auth.auth) {
      props.history.push('/iniciar-sesion');
  }

  if (!clientes.length) return <Spinner />;

  return (
    <Fragment>
      <h2>Clientes</h2>

      <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>Nuevo Cliente
      </Link>

      <ul className="listado-clientes">
        {clientes.map((cliente, index) => (
          <Cliente key={cliente._id} cliente={cliente} />
        ))}
      </ul>
    </Fragment>
  );
};

export default withRouter(Clientes);
