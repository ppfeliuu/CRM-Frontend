import React, { useState, useEffect, Fragment, useContext } from "react";
import clienteAxios from "../../config/axios";
import FormBuscarProducto from "./FormBuscarProducto";
import FormCantidadProducto from "./FormCantidadProducto";
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

//importar context
import { CRMContext } from "../../context/CRMContext";

const NuevoPedido = (props) => {

    const {id} = props.match.params;

    const [cliente, setCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [productos, setProductos] = useState([]);
    const [total, setTotal] = useState(0);


    useEffect(() => {
        const consultarAPI = async () => {
            const resultado = await clienteAxios.get(`/clientes/${id}`);
            setCliente(resultado.data);
        }

        consultarAPI();

        actualizarTotal();
    },[productos])

    const buscarProducto = async e => {
        e.preventDefault();

        //Obtener los productos de la busqueda
        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);
        
        if(resultadoBusqueda.data[0]) {
            let productoResultado = resultadoBusqueda.data[0];

            //copia del Id
            productoResultado.producto = resultadoBusqueda.data[0]._id;
            productoResultado.cantidad = 0;

            // guardar los productos en el state
            setProductos([...productos, productoResultado]);
        } else {
            Swal.fire({
                title: 'No resultados',
                text: 'No hay productos con esa descripción'

            })
        }

    }

    const leerDatosBusqueda = e => {
        guardarBusqueda(e.target.value);
    }

    const restarProductos = i => {
        // copiar el arreglo original
        const todosProductos = [...productos];

        //validar si está en cero no puede presionar
        if(todosProductos[i].cantidad === 0) return;

        //decrmento
        todosProductos[i].cantidad--;

        setProductos(todosProductos);

        // actualizarTotal();
    }

    //Eliminar producto del state
    const eliminarProductoPedido = id => {
        const todosProductos = productos.filter(producto => producto.producto !== id);
        setProductos(todosProductos)   ;
    }

    const aumentarProductos = i => {
        // copiar el arreglo original
        const todosProductos = [...productos];
        
        //decrmento
        todosProductos[i].cantidad++;

        setProductos(todosProductos);

        // actualizarTotal();
    }

    //Actualizar totoal a pagar
    const actualizarTotal = () => {
        if(productos.length === 0){
            setTotal(0);
            return;
        }

        // Calcular total
        let nuevoTotal = 0;

        //recorrero todos los productos y cantidades y precio
        productos.map(producto => nuevoTotal +=(producto.cantidad* producto.precio));

        setTotal(nuevoTotal);

    }

    const realizarPedido = async e => {
        e.preventDefault();

        //obtener el id
        const {id} = props.match.params;

        // construir el objeto

        const pedido = {
            "cliente": id,
            "pedido": productos,
            "total": total
        }

        console.log(pedido);

        //Guardar en BBDD
        const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido);

        if(resultado.status === 200) {
            Swal.fire({
                title: 'Pedido realizado!',
                text: resultado.data.mensaje

            })
        } else {
                Swal.fire({
                title: 'Hubo un error',
                text: 'Vuelva a intentarlo'

            })
        }

        props.history.push('/pedidos');

    }


  return (
    <Fragment>
      <h2>Nuevo Pedido</h2>

      <div className="ficha-cliente">
        <h3>Datos de Cliente</h3>
        <p>{cliente.nombre} {cliente.apellido}</p>
        <p>Telf: {cliente.telefono}</p>
      </div>

        <FormBuscarProducto  buscarProducto={buscarProducto} leerDatosBusqueda={leerDatosBusqueda}/>

        <ul className="resumen">
            {productos.map((producto, index) => (
                <FormCantidadProducto 
                    key={producto.producto}
                    producto={producto}
                    restarProductos={restarProductos}
                    aumentarProductos={aumentarProductos}
                    eliminarProductoPedido={eliminarProductoPedido}
                    index={index}
                />
            ))}
            
        </ul>
        <p className="total">Total a pagar: <span>€ {total}</span></p>
        
        {total > 0 ? (
            <form onSubmit={realizarPedido}>
                <input type="submit"
                    className="btn btn-verde btn-block"
                    value="Realizar Pedido" />
            </form>
        ) : null }
      
    </Fragment>
  );
};

export default withRouter(NuevoPedido);
