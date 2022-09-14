import React, {useCallback,useState} from 'react'

import './ModalUpload.scss'
import { useDropzone } from 'react-dropzone'
import { Modal,Button,Icon,Dimmer,Loader } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import {NEW_POST} from '../../../gql/publicaciones'
import {useApolloClient} from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

const ModalUpload = ({setShow,username,show,titleModal}) => {

    const client = useApolloClient();
    const history = useNavigate()

    const [fileUpload, setfFileUpload] = useState(null)
    const [isLoading,setIsloading] = useState(false)
   
    const [newPost] = useMutation(NEW_POST)

    const onDrop = useCallback((acceptedFile) => {
        const file = acceptedFile[0]
        setfFileUpload({
           type : 'image',
           file : file,
           preview : URL.createObjectURL(file)

        })
       
        
    });

 //   getInputProps  para anadir los props para poder subir las imagenes
 //getrootprops sera la caja que envolvera nuestro input

    const { getRootProps,getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard : true,
        multiple : false,
        onDrop
    })

const handleclose = () => {
    setIsloading(false);
    setfFileUpload(null)
    setShow(false)
   
}

const handlePublicar = async () => {

    

    try {
        setIsloading(true)
        const publicaciones = await newPost({
            variables : {
                
                file : fileUpload.file

            }
        })


        const {data} = publicaciones;
        


        if(!data.newPost.status){

            toast.warning("Error en la publicacion");
            isLoading(false)

        }else{
            handleclose()
        }
        
    } catch (error) {
        console.log(error)
    }

}



    

  return (

    <>
    <Modal size="large"  open={show} onClose={handleclose} className="subirContenido" >
    {titleModal &&  <Modal.Header>{titleModal}</Modal.Header>}

<div className="icono" {...getRootProps()} >
   
        {!fileUpload && (
            <>
             <Icon className='upload' name='upload'/>
             <p>subir Imagen</p>
             <input {...getInputProps()}/>
             </>
             
         ) }
       
       
       
        {fileUpload?.type == "image" && (
        <div className='image' style={{backgroundImage: `url("${fileUpload.preview}")`}} ></div>  )}
        
        
        </div>
       
        {!fileUpload ? (< Button className='editarboton red' onClick={handleclose}> Cancelar </Button>) : ( < Button className='editarboton blue' onClick={handlePublicar}> Publicar </Button> )}
        {isLoading && (
        <Dimmer active className="publishing">
            <Loader/>
                <p>Publicando...</p>
            </Dimmer>
    )}
    </Modal>

  
   </>
  )
}

export default ModalUpload