import React, { useEffect, useState, Fragment } from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { withRouter } from "react-router-dom";
import Spinner from "../layout/Spinner";

const EditarProducto = props => {
  const { id } = props.match.params;

  const [producto, datosProducto] = useState({
    nombre: "",
    precio: "",
    imagen: ""
  });

  const [archivo, setArchivo] = useState("");

  useEffect(() => {
    const consultarAPI = async () => {
      const productosConsulta = await clienteAxios.get(`/productos/${id}`);
      // console.log(productosConsulta);
      datosProducto(productosConsulta.data);
    };

    consultarAPI();
  }, []);

  const editarProducto = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio);
    formData.append('imagen', archivo);

    try {
        const res = await clienteAxios.put(`/productos/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if(res.status === 200) {
            Swal.fire(
                'Agregado correctamente!',
              res.data.mensaje,
              'success'
              )   
        }

        props.history.push('/productos');

    } catch (error) {
        Swal.fire({
            title: 'Hubo un error',
            text: 'Intételo de nuevo'
        })
    }
  }

  const leerInformacionProducto = e => {
    datosProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  const leerArchivo = e => {
    setArchivo(e.target.files[0]);
  };

  //extrae los valos del state
  const { nombre, precio, imagen } = producto;

  if(!nombre) return <Spinner />

  return (
    <Fragment>
      <h2>Editar Producto</h2>

      <form onSubmit={editarProducto}>
        <legend>Rellena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            defaultValue={nombre}
            onChange={leerInformacionProducto}
          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            min="0.00"
            step="0.01"
            placeholder="Precio"
            defaultValue={precio}
            onChange={leerInformacionProducto}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          {imagen ? (
              <img src={`${process.env.REACT_APP_BACKEND_URL}/${imagen}`} alt="imagen" width="300" />
          ) : null }
          <input type="file" name="imagen" onChange={leerArchivo} />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Guardar Producto"
          />
        </div>
      </form>
    </Fragment>
  );
};

export default withRouter(EditarProducto);
