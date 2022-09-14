
//necesarios de react otras librerias
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { useMutation } from '@apollo/client'

//mis componentes
import { REGISTER } from '../../../gql/user';

//archivos
import './Registerform.scss';

const FormRegister = (props) => {


  const { setShowLogin } = props;



  const [register] = useMutation(REGISTER)

  const formik = useFormik({

    // la funcion que devuelve un valor esta en la parte de abajo

    initialValues: initialValues(),

    validationSchema: yup.object({
      name: yup.string().required("tu Nombre es Obligatorio"),
      username: yup.string().matches(/^[a-zA-Z0-9-]*$/, "Tu nombre de usuario no debe contener espacios").required("el nombre de usuario es obligatorio"),
      email: yup.string().email("email no es valido").required("el email es obligatorio"),
      //la propiedad oneOf ayuda a comparar datos
      password: yup.string().required("la contraseña es obligatoria").oneOf([yup.ref("repetirpassword")], "las contraseña no son iguales"),
      repetirpassword: yup.string().required("la contraseña es obligatoria").oneOf([yup.ref("password")], "las contraseñas no son iguales"),
    }),

    onSubmit: async (formData) => {
      try {

        const newUser = formData;
        delete newUser.repetirpassword;

         await register({
          variables: {
            input: newUser
          }
        })

        toast.success('Usuario Registrado correctamente');
        setShowLogin(true)

      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    }

  })


  return (

    <>

      <h2>Registrate Aqui</h2>

      <Form onSubmit={formik.handleSubmit} className='formulario'>

        <label htmlFor="nombredeusuario" >Nombre y Apellido </label>
        <Form.Input
          type="text"
          placeholder="nombre y apellido"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          //si no quiero mostrar el mensaje de error solo tengo que poner true  y an &&
          error={formik.errors.name && true}
        />

        <label htmlFor="username" >Nombre de usuario </label>
        <Form.Input
          type="text"
          placeholder="nombre de usuario"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          error={formik.errors.username}


        />



        <label htmlFor="Email" >Email </label>
        <Form.Input type="text"
          placeholder="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />

        <label htmlFor="password" >Contrasena </label>
        <Form.Input
          type="password"
          placeholder="Contrasena"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}

        />

        <label htmlFor="repetirpassword" >Repetir Contrasena </label>
        <Form.Input
          type="password"
          placeholder="Repetir Contrasena"
          name="repetirpassword"
          onChange={formik.handleChange}
          value={formik.values.repetirpassword}
          error={formik.errors.repetirpassword}

        />



        <input type="submit" value="Registrarse" />
        <Button
          type='button'
          className='mejorarboton'
          onClick={formik.handleReset} >
          reiniciar Formulario
        </Button>


      </Form>

    </>
  )
}

export default FormRegister

function initialValues() {

  return {
    name: "",
    username: "",
    email: "",
    password: "",
    repetirpassword: "",

  }

} 