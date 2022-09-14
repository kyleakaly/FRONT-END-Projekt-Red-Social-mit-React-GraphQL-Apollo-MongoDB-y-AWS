import React, {useCallback, useState} from 'react'
import { useDropzone } from 'react-dropzone'
import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'


//archivos
import './AvatarForm.scss'


import { Button } from 'semantic-ui-react'
import { UPDATE_AVATAR,GET_USER,DELETE_AVATAR } from '../../../gql/user'
import tokenreal from '../../../utils/revelartoken'




//codigo para subir imagenes al servidor 



const AvatarForm = ({setShow,auth}) => {

  const {username} = auth
  

  const [loading , setLoading] = useState(false);

  const [updateAvatar] = useMutation(UPDATE_AVATAR,{
    update(cache,{data: {updateAvatar}}){
      
     
      const {getUser} =  cache.readQuery({
       
        
        query: GET_USER,
        variables : {

          username : username

        }
      });

      cache.writeQuery({

        query: GET_USER,
        variables : {

          username : username

        },

        data: {

          getUser : {

            ...getUser, avatar : updateAvatar.urlAvatar

          }

        }

      })

    }
  })

  const [deleteAvatar] = useMutation(DELETE_AVATAR,{
    update(cache){
      const {getUser} = cache.readQuery({
        query : GET_USER,
        variables : {
          username : username
        }

      });

      cache.writeQuery({
        query : GET_USER,
        variables : {
          username : username
        },

        data : {

          getUser : {

            ...getUser, avatar : ""  
  
          }

        }

       

      })
    },

    

  })
   
  const HandleEliminarfoto = async () => {


    try {

      const result = await  deleteAvatar()
      const  {data} = result

      if(!data.deleteAvatar){
toast.warning("error al borrar el avatar")
      }else {
        setShow(false)
        
      }
      
      
    } catch (error) {
      console.log(error)
toast.warning("error al borrar el avatar")

    }

  

  }

  const onDrop = useCallback( async (acceptedFile)=>{

    const file = acceptedFile[0]

   


    try {
      setLoading(true)
      const result = await updateAvatar({variables: {file}})
      const { data } = result

      
      if(!data.updateAvatar.status){

        toast.warning('error al actualizar el avatar')
        setLoading(false)

      }else {
        setLoading(false)
        setShow(false)
      toast.success('el usuario cambio su foto de perfil')


      }

    } catch (error) {
      
      console.log(error)   
      toast.error(error.message);


    }

  },[])

  const {getRootProps,getInputProps} = useDropzone({

    accept: "image/jpeg , image/png",
    noKeyboard: true,
    multiple:false,
    onDrop,
    
    
  });

    const cerrarmodal = () => {
        setShow(false)
        
    }
  return (
    <div className='avatar-form'>
       <Button {...getRootProps()} loading={loading} >Cargar Una Foto</Button>
       <Button onClick={HandleEliminarfoto}>Eliminar foto actual</Button>
       <Button onClick={cerrarmodal}>cancelar</Button>
       <input {...getInputProps()}/>
    </div>
  )
}

export default AvatarForm