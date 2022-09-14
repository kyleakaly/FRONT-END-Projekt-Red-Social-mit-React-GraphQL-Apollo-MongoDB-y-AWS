import React,{useState} from 'react'
import { Image ,Grid} from 'semantic-ui-react'
import './ContarPublicaciones.scss'
import { map } from 'lodash'
import PrewiusImage from './PrewiusImage/PrewiusImage'


const ContarPublicaciones = ({obtenerPublicaciones}) => {
    
  return (
  
  <div className="publicaciones">
      <h1>Publicaciones</h1>
      <Grid columns={4}>
          {obtenerPublicaciones.map((obtenerPublicacione,i) => {
              return(
             <Grid.Column key={i}>
                 <PrewiusImage obtenerPublicaciones={obtenerPublicacione}  />
             </Grid.Column>
          )})}
      </Grid>
  </div>

  )
}

export default ContarPublicaciones