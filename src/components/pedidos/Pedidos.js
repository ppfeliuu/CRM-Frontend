import React, { useState, useEffect, Fragment } from "react";
import clienteAxios from "../../config/axios";
import DetallesPedido from "./DetallesPedido";

const Pedidos = () => {

    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        const consultarAPI = async () => {
            const resultado = await clienteAxios.get(`/pedidos`);
            setPedidos(resultado.data);
        }

        consultarAPI();
    }, []);

    return (
        <Fragment>
            <h2>Pedidos</h2>
                <ul className="listado-pedidos">
                {pedidos.map(pedido => (
                    <DetallesPedido key={pedido._id}
                    pedido={pedido}/>
                ))}                  
            </ul>
        </Fragment>
    )
}

export default Pedidos;
