import React,{ useState, Fragment, useEffect } from 'react'
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import clienteAxios from '../../config/axios';

const EdiatrCliente = (props) => {

    const { id } = props.match.params;

    const [cliente, datosCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    // QUERY A LA API
    const consultarAPI = async() => {
        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);

        datosCliente(clienteConsulta.data);
    }

    // UseEffect cuando el componente carga
    useEffect(() => {
        consultarAPI();
    }, [cliente])


    const actualizarState = e => {
        datosCliente({
            ...cliente,
            [e.target.name]: e.target.value
        });        
    }
    

    const validarCliente = () => {
        const { nombre, apellido, email, empresa, telefono } = cliente;

        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;

        return valido;
    }

    const actualizarCliente = e => {
        e.preventDefault();

        clienteAxios.put(`/clientes/${cliente._id}`, cliente)
        .then(res => {
            if(res.data.code === 11000) {                    
                Swal.fire({                        
                    title: 'Hubo un error!',
                    text: 'Cliente ya registrado'

                })
            } else {
                Swal.fire(
                    'Actualizado!',
                    'Actualización correctamente!',
                    'success'
                  )
            }

            props.history.push('/');
        })

    }

    return (
        <Fragment>
            <h2>Editar Cliente</h2>

            <form
                onSubmit={actualizarCliente}
            >
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label>Nombre:</label>
                    <input  type="text" 
                            placeholder="Nombre Cliente" 
                            name="nombre"
                            onChange={actualizarState}
                            value={cliente.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" 
                          placeholder="Apellido Cliente" 
                          name="apellido" 
                          onChange={actualizarState}
                          value={cliente.apellido}
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" 
                          placeholder="Empresa Cliente" 
                          name="empresa" 
                          onChange={actualizarState}
                          value={cliente.empresa}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" 
                            placeholder="Email Cliente" 
                            name="email" 
                            onChange={actualizarState}
                            value={cliente.email}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" 
                        placeholder="Teléfono Cliente" 
                        name="telefono" 
                        onChange={actualizarState}
                        value={cliente.telefono}
                    />
                </div>

                <div className="enviar">
                    <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Agregar Cliente" 
                        disabled={ validarCliente() }
                    />
                </div>
            </form>

        </Fragment>
    )
}

export default withRouter(EdiatrCliente);
