import {  Form, Icon } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import  {EDITAR_PERFIL} from '../../../../gql/user'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { toast } from 'react-toastify';
import { useState } from "react";
import {useApolloClient} from '@apollo/client'
import { useParams } from 'react-router-dom';





const DatosDelPerfilForm = ({name,siteWeb,description,setShow}) => {


    const {username} = useParams();
    const history = useNavigate()
    const client = useApolloClient()
    


    const [error,setError] = useState("")

     const [editarPerfil] = useMutation(EDITAR_PERFIL)

     const formik = useFormik({
         initialValues: {
             name : name,
             siteweb : siteWeb,
             description : description
         },
         validationSchema : yup.object({
             name : yup.string().required('requerimos el Nombre'),
             siteweb : yup.string().required('tu sitio web es obligatorio',false),
             description : yup.string().required('tu descripcion es obligatoria',false)
         }),

         onSubmit : async (formdata) =>{

            try {

                await editarPerfil({
                    variables: {
    
                        input : {
                            name : formdata.name,
                            siteweb : formdata.siteweb,
                            description : formdata.description
                        }

                    }
                });

                setShow(false);
                toast.success("felicidades reiniciaste tu email")
                client.cache.reset()
                
                 history(`/${username}`);


                
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
   
    <Form onSubmit={formik.handleSubmit} className='editarclase'>
       <div className="datosdeperfil">
         <div className="titulo">
         <h2 >Datos del Perfil</h2>
         </div>
      
       <div className='editarpading' > 
       <label htmlFor="name" >Nombre: </label> 
       <Form.Input type="text"
        name="name" 
        id="name" 
        placeholder='Nuevo Nombre'
         value={formik.values.name} 
         onChange={formik.handleChange}
         error={formik.errors.name && true}
         /> <Icon className='icononame' name="sort alphabet down"/></div>


       <div className='editarpading' >
           <label htmlFor="siteweb" >sitio web: </label> 
           <Form.Input type="text" 
           name="siteweb" 
           placeholder='editar sitio web' 
           value={formik.values.siteweb} 
           onChange={formik.handleChange} 
           error={formik.errors.siteweb && true}
           /><Icon className='icononame' name="internet explorer"/></div>


       <div className='editarpading' >
           <label htmlFor="description" > descripcion: </label> 
           <Form.Input type="text"
            name="description" 
            placeholder='editar la descripcion'
             value={formik.values.description} 
             onChange={formik.handleChange}
             error = { formik.errors.description }
              /><Icon className='icononame' name="text height"/></div>

         </div> 
         <div className="contenedorbotones">
        <Form.Button type="submit" className='botomverde' > Guardar Cambios del Perfil</Form.Button>

        {error && (
          <p style="background-color:red;" className="submit-error">
            {error}
          </p>
        )}

        </div> 


         </Form>

  )
}

export default DatosDelPerfilForm