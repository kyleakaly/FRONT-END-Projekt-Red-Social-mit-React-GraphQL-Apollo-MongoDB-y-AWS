import React from 'react'
import './AjustesForm.scss'
import usercontext from '../../../hooks/useAuth'
import {useNavigate} from 'react-router-dom'
import { useApolloClient, useQuery } from '@apollo/client'
import { GET_USER } from '../../../gql/user'
import ContrasenaForm from './todocambiosAjustesForm/ContrasenaForm'
import EmailCambio from './todocambiosAjustesForm/EmailCambio'
import DatosDelPerfilForm from './todocambiosAjustesForm/DatosDelPerfilForm'




const AjustesForm = ({setShow}) => {

    const { auth } = usercontext()
    const history = useNavigate()
    const client = useApolloClient();
    

    
    
    const {username} = auth

    const { data, loading, error } = useQuery(GET_USER, {
      variables: {
        username: username,
      },
    });
  
    if (loading || error) {
      return null;
    }
  
    const { getUser: datosUsuario } = data;


    const name = datosUsuario.name 
    const description =  datosUsuario.description 
    const siteWeb = datosUsuario.siteweb
    const email = datosUsuario.email;
       
  return (
    <>
    
      <DatosDelPerfilForm  name={name} description={description} siteWeb={siteWeb} setShow={setShow}  />

      <EmailCambio setShow={setShow} history={history}  email={email} client={client} />
         
      <ContrasenaForm setShow={setShow} history={history}  client={client}/>

        </>
        
       
    

  )
}

export default AjustesForm