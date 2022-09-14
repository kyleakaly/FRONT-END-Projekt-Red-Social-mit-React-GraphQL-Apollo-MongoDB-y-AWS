import { useQuery } from '@apollo/client'
import React from 'react'
import { OBTENER_NO_SEGUIDOS } from '../../../gql/follow'
import './UsuariosNoSeguido.scss'
import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'
import ImagenNoFound from '../../../assets/img/avatar.png'
import { Grid } from 'semantic-ui-react'


const UsuariosNoSeguido = () => {

    const { data,loading } = useQuery(OBTENER_NO_SEGUIDOS)
    if(loading){
        return null
    }

    const {getNotFolloweds} = data

  



  return (
    <div className='Usuarios-NoSeguidos'>
        <h3>Usuarios Que No Sigues.</h3>
        
        {getNotFolloweds.map((getNotFollowed,i)=>{
            
            return(
                <div className="organizarlosdatos" key={i}>
                    <Link to={`/${getNotFollowed.username}`}>
<Grid.Column column={5}>
<Image avatar className='organizaravatar' src={getNotFollowed.avatar || ImagenNoFound }/>
<p>{getNotFollowed.username}</p>
                </Grid.Column>
                </Link>
                </div>
                
                
                

            )
        })}
       
    </div>
  )
}

export default UsuariosNoSeguido