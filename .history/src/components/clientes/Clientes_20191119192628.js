import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

// Import cliente axios
import clienteAxios from '../../config/axios';

import Cliente from './Cliente';

const Clientes = () => {

    const [clientes, setClientes] = useState([]);

    

    useEffect(() => {
        
        const consultarAPI = async () => {
            const clientesConsulta = await clienteAxios.get('/clientes');
    
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
