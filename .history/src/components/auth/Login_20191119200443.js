import React,{ useState, useContext } from 'react'
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import clienteAxios from '../../config/axios';

//Context

import { CRMContext } from '../../context/CRMContext';

const Login = (props) => {

    //Auth y token
    const [auth, setAuth] = useContext(CRMContext);

    console.log(auth);

    const [credenciales, setCredenciales] = useState({});

    //iniciar sesion en el server
    const iniciarSesion = async e => {
        e.preventDefault();


        //autenticar usuario
        try {
            const respuesta = await clienteAxios.post('/iniciar-sesion', credenciales);

            //extraer el token y colocalo en el localstorage
            const { token } = respuesta.data;
            localStorage.setItem('token', token);

            Swal.fire(
                'Login Correcto',
                'Has iniciado sesión',
                'success'
            )

            props.history.push('/');


        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: error.response.data.mensaje

            })
        }
    }

    const leerDatos = e => {
        setCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="login">
            <h2>Iniciar Sesión</h2>

            <div className="contenedor-formulario">
                <form onSubmit={iniciarSesion}>
                    <div className="campo">
                        <label>Email</label>
                        <input 
                            type="text"
                            name="email"
                            placeholder="Tu Email"
                            required
                            onChange={leerDatos}
                        
                        />
                    </div>
                    <div className="campo">
                        <label>Password</label>
                        <input 
                            type="password"
                            name="password"
                            placeholder="Tu Password"
                            required
                            onChange={leerDatos}
                        
                        />
                    </div>

                    <input type="submit" value="Iniciar Sesión" className="btn btn-verde btn-block"/>
                </form>
            </div>
            

        </div>
    )
}

export default withRouter(Login);
