import React,{ useState, Fragment } from 'react'
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import clienteAxios from '../../config/axios';


const NuevoCliente = ({history}) => {
    
    const [cliente, setCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    const actualizarState = e => {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        });        
    }

    const validarCliente = () => {
        const { nombre, apellido, email, empresa, telefono } = cliente;

        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;

        return valido;
    }

    const agregarCliente = e => {
        e.preventDefault();

        clienteAxios.post('/clientes', cliente)
            .then(res =>{
                // console.log(res)
                if(res.data.code === 11000) {                    
                    Swal.fire({                        
                        title: 'Hubo un error!',
                        text: 'Cliente ya registrado'

                    })
                } else {
                    Swal.fire(
                        'Cliente Agregado!',
                        res.data.mensaje,
                        'success'
                      )
                }

                /* Redirect */
                history.push('/');

            });
    }

    return (
        <Fragment>
            <h2>Nuevo Cliente</h2>

            <form
                onSubmit={agregarCliente}
            >
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label>Nombre:</label>
                    <input  type="text" 
                            placeholder="Nombre Cliente" 
                            name="nombre"
                            onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" 
                          placeholder="Apellido Cliente" 
                          name="apellido" 
                          onChange={actualizarState}
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" 
                          placeholder="Empresa Cliente" 
                          name="empresa" 
                          onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" 
                            placeholder="Email Cliente" 
                            name="email" 
                            onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" 
                        placeholder="Teléfono Cliente" 
                        name="telefono" 
                        onChange={actualizarState}
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

export default withRouter(NuevoCliente);
