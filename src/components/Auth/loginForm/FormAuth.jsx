import {Form } from 'semantic-ui-react'
import { useState } from 'react';
import '../RegisterForm/RegisterForm.scss'
import {useFormik} from 'formik';
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { useMutation } from '@apollo/client';


//mis componentes
import { LOGIN } from '../../../gql/User'; 
import { setToken } from '../../../utils/token';
import usercontext from '../../../hooks/useAuth';

//cree este pequeöo util para que no se cargue tanto el componente Home 
import tokenreal from '../../../utils/revelartoken';





const FormAuth = () => {



  const [error, setError] = useState('')
  const [login] = useMutation(LOGIN)

  const { setUser } = usercontext();
  
  const formik = useFormik({

    initialValues: initialValues(),

    validationSchema : yup.object({
      email : yup.string().email().required("el nombre de usuario es obligatorio"),
      password : yup.string().matches(/^[a-zA-Z0-9-]*$/,"Tu nombre de usuario no debe contener espacios").required("la contraseña es obligatoria"),

    }),

    onSubmit: async (formdata) => {

   

      try {
        
       const {data} = await login({
          variables : {

            input : formdata

          }

          
        });

        const {token} = data.login
        setToken(token);
        setUser(tokenreal(token));

        toast.success('felicidades entrastes a tu cuenta')

        

      } catch (error) {
        toast.error(error.message);
        setError(error.message)
        setTimeout(() => {
          setError('')
        }, 4000);
      }
    }

  })

 



  return (

    <>

      <h2>Inicia de sesion</h2>


    <Form onSubmit={formik.handleSubmit} className="formulario">
        
    <label htmlFor="email" >Email </label>
    <Form.Input
    type = "email"
    placeholder = "Email"
    name = "email"
    onChange={formik.handleChange}
    error={formik.errors.email}
    value={formik.values.email}

    />
  

    <label htmlFor="password" >Contrasena </label>
    <Form.Input
    type = "password"
    placeholder = "Contrasena"
    name = "password"
    onChange={formik.handleChange}
    error={formik.errors.password}
    value={formik.values.password}



    />

    <input type="submit" value="Entrar"/>

    {error && <p className='submit-error'>{error}</p>}


    </Form>

    </>
  )
}

export default FormAuth

function initialValues(){

  return {
    email: "",
    password : "",
  }

}