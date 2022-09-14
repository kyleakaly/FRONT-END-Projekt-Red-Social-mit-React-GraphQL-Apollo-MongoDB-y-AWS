import './FormularioForm.scss'
import React,{useState} from 'react'
import { Form,Button } from 'semantic-ui-react'
import { useMutation,  } from '@apollo/client';
import {COMENTARIOS_USER} from '../../gql/comentarios'
import {  useFormik } from 'formik';
import * as yup from 'yup'
import { toast } from 'react-toastify';

const FormularioForm = ({obtenerPublicaciones}) => {

const {idUser,id} = obtenerPublicaciones;



  const [error,setError] = useState('')
  const [newComentarios] = useMutation(COMENTARIOS_USER)


 

  const formik = useFormik({
    initialValues : {

      comentario : '',

    },
    validationSchema : yup.object({

      comentario : yup.string().required('necesitas un comentario')

    }),

    onSubmit : async (formdata) => {

      try {

        const result =  await newComentarios({
          variables : {

            input : {

              idPublication : id,
              comentario : formdata.comentario

            }
           

          }
        })

        formik.handleReset()
        toast.success("felicidades publicaste tu comentario")
        
      } catch (error) {
        toast.error(error.message);

                setError(error.message)
                setTimeout(() => {
                    setError("")
                }, 4000);
      }

    }

  })

  return (
    <Form className='formulariodeComentarios' onSubmit={formik.handleSubmit}>

    <Form.Input onChange={formik.handleChange} error={formik.errors.comentario && true} value={formik.values.comentario} type='text' name="comentario" id='comentario' className='comentariosclase' placeholder="Comentar..."/>
    <Button className='bottom' type='submit' >publicar</Button>
    
    {error && (
          <p style="background-color:red;" className="submit-error">
            {error}
          </p>
        )}
    </Form>
    
  )
}

export default FormularioForm