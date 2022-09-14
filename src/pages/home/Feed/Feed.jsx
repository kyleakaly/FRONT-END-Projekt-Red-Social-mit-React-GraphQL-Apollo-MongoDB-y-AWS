import React, {useState,useEffect} from 'react'
import {useQuery} from '@apollo/client'
import {OBTENER_PUBLICACIONES_HOME} from '../../../gql/publicaciones'
import { Image } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import ImagenNoFound from '../../../assets/img/avatar.png'
import ActionsComentarios from '../../../components/Comentarios/ActionsComentarios'

import './Feed.scss'
import FormularioForm from '../../../components/Comentarios/FormularioForm'
import VerModalGrande from '../../../components/Modal/VerimagenGrande'

const Feed = () => {

    const [show, setShow] = useState(false)
    const [publicacionSeleccionada,setpublicacionSeleccionada] = useState(null)

    const openPublicacion = (publication) => {
            
            setpublicacionSeleccionada(publication)
            setShow(true)

    }

    const {data,loading} = useQuery(OBTENER_PUBLICACIONES_HOME)

    if(loading){
        return null
    }

    const { obtenerHomePublicaciones } = data 
  return (
      <>
    <div className='feed'>{obtenerHomePublicaciones.map((obtenerHomePublicacione,i)=>{
        
        return(

            <div className="feed_box" key={i}>
                
                <Link to={`/${obtenerHomePublicacione.idUser.username}`}>

                    <div className="feed_box-user">
                        <Image src={obtenerHomePublicacione.idUser.avatar || ImagenNoFound} 
                        avatar/>
                        <span>{obtenerHomePublicacione.idUser.name}</span>
                    </div>

                </Link>
                <div className='feed_box-foto'
                style={{backgroundImage: `url("${obtenerHomePublicacione.file}")`}}
                onClick={()=> openPublicacion(obtenerHomePublicacione)}
                />

                <div className="feed_box-actions">
                    <ActionsComentarios obtenerPublicaciones={obtenerHomePublicacione}/>
                </div>

                <div className="feed_box-comentarios">
                    <FormularioForm obtenerPublicaciones={obtenerHomePublicacione}/>
                </div>
            
            </div>
            

        )
    })}</div>

    {show && ( <VerModalGrande show={show} setShow={setShow} obtenerPublicaciones={publicacionSeleccionada}  />)  }

    </>
  )
}

export default Feed