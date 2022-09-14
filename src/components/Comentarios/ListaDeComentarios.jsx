import './ListaDeComentarios.scss'
import React, {useEffect} from 'react'

import { useQuery } from '@apollo/client'
import { TRAER_COMENTARIOS } from '../../gql/comentarios'
import { Grid } from 'semantic-ui-react'
import { Image } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const ListaDeComentarios = ({obtenerPublicaciones}) => {

  const { data,loading ,startPolling,stopPolling } = useQuery(TRAER_COMENTARIOS,{
    variables : {

      idPublication : obtenerPublicaciones.id

    }
  })

  useEffect(() => {
   
    startPolling(1000)
    
    return () => {
      stopPolling()
    }

  }, [startPolling,stopPolling])

  if(loading){
    return null
  }

  const {recuperarComentarios} = data


  

  return (

    <div className='comentarios'>
      <Grid  columns={1} className="organizartodo" >
    {recuperarComentarios.map( (recuperarComentario,i) =>{
      return (
              <Link key={i} to={`/${recuperarComentario.idUser.username}`}>
              
              <Grid.Row  >
              <div className="arreglarcomentarios">
                <div className="organizartextoscomentarios">

                <h2>{recuperarComentario.idUser.username}</h2>
                <p className="comentarios">{recuperarComentario.comentario}</p>

                </div>
               
                <Image className='imagencomen' src={recuperarComentario.idUser.avatar}/>
               

              </div>

             </Grid.Row>

              </Link>
             

      )
    })}
   
   </Grid>
   </div>

  )
}

export default ListaDeComentarios