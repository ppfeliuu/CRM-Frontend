import React, { useState, useEffect, Fragment, useContext } from 'react'
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

// Import cliente axios
import clienteAxios from '../../config/axios';

import Cliente from './Cliente';

//importar contect
import { CRMContext } from '../../context/CRMContext';

const Clientes = () => {

    const [clientes, setClientes] = useState([]);

    //usar los valores del context
    const [auth, setAuth] = useContext(CRMContext);

    useEffect(() => {
        
        const consultarAPI = async () => {
            const clientesConsulta = await clienteAxios.get('/clientes', {
                headers: {
                    Authorization: ''
                }
            });
    
            setClientes(clientesConsulta.data);
        }
        
        consultarAPI();

       /*  return () => {
            consultarAPI();
        }; */
    }, [clientes]);

    if(!clientes.length) return <Spinner />

    return (
        <Fragment>
            <h2>Clientes</h2>

            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"><i className="fas fa-plus-circle"></i>Nuevo Cliente</Link>

            <ul className="listado-clientes">
                {clientes.map( (cliente, index) => (
                    <Cliente 
                        key={cliente._id}
                        cliente={cliente}
                    />
                    )                    
                )}
            </ul>
        </Fragment>
    )
}

export default Clientes;
