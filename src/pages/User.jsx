import React from 'react'
import { useParams } from 'react-router-dom'
import Profile from '../components/User/Profile/index';
import ContarPublicaciones from '../components/User/Publicaciones/ContarPublicaciones';
import { useQuery } from '@apollo/client';
import { OBTENER_PUBLICACIONES } from '../gql/publicaciones';


const User = () => {

  const {username,id} = useParams();

  const {data ,loading} = useQuery(OBTENER_PUBLICACIONES,{
    variables : {
        username : username
    }
});

if(loading){
  return null
}

  const {obtenerPublicaciones} = data

  return (
    <>
       <Profile username={username} id={id}/>
       {obtenerPublicaciones.length > 0 ? (<ContarPublicaciones obtenerPublicaciones={obtenerPublicaciones} />) :  (<div className="publicaciones"> <h2>Este Usuario no tiene Publicaciones</h2> </div>) }
    </>
  )
}

export default User