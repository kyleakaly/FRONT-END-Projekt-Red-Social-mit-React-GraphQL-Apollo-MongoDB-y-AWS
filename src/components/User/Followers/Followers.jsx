import './followers.scss'
import {useQuery} from '@apollo/client'
import { COUND_FOLLOWS, USUARIOS_SEGUIDOS } from '../../../gql/follow'
import { useEffect,useState } from 'react'
import ModalBasic from '../../Modal/ModalBasic/ModalBasic'

import MostrarUsuariosSeguidores from './Seguidores/MostrarUsuariosSeguidores'
import MostrarUsuariosQueSigo from './SeguidosPorMi/MostrarUsuariosQueSigo'
import { OBTENER_PUBLICACIONES } from '../../../gql/publicaciones'



const Follower =  ({username}) => { 

  

 
  const [childrenModal,setChildrenModal] = useState(null)
  const [title,setTitle] = useState('')
  const [show,setShow] = useState(false)



  const {data,loading,stopPolling,startPolling} = useQuery(COUND_FOLLOWS,{

    variables : {
      username
    }

  })

  const {data : mesiguen,loading : loadinmesiguen,startPolling:startPollingmesiguen,stopPolling : stopPollingmesiguen} = useQuery(USUARIOS_SEGUIDOS,{
    variables : {
      username : username
    }
  })


  const handleabrirmodal = () => {

    setShow(true)
    setTitle("Seguidores");
    setChildrenModal(<MostrarUsuariosSeguidores setShow={setShow} username={username} data={data} loading={loading} />)
    


  }

  const handleabrirmodalfollower = () => {

    setShow(true)
    setTitle("Mis Seguidos");
    setChildrenModal(<MostrarUsuariosQueSigo setShow={setShow} username={username} data={mesiguen} loading={loadinmesiguen} />)


  }

 const { data : dataPublicaciones,loading : loadingPublicaciones ,stopPolling : stopPollingPublicaciones,startPolling : startPollingPublicaciones } = useQuery(OBTENER_PUBLICACIONES,{
   variables : {
     username : username
   }
 })


  

  useEffect(() => {

    startPolling(1000)
    return () => {
    stopPolling();
   }
      }, [startPolling,startPolling])


  useEffect(() => {

    startPollingmesiguen(1000)
        return () => {
          stopPollingmesiguen();
       }
          }, [startPollingmesiguen,stopPollingmesiguen])

          useEffect(() => {

            startPollingPublicaciones(1000)
            return () => {
            stopPollingPublicaciones();
           }
              }, [startPollingPublicaciones,startPollingPublicaciones])
  
   


  return (
    <>
    <div className='contenidofollower'>
      <p> <span>{!loadingPublicaciones && dataPublicaciones.obtenerPublicaciones.length}</span>  Publicaciones</p>
      <p className='link' onClick={handleabrirmodal}><span>{!loading && data.obtenerTodosLosUsuarios.length}</span> te Siguen</p>
      <p className='link' onClick={handleabrirmodalfollower} ><span>{!loadinmesiguen && mesiguen.obtenerLosquesigo.length}</span> seguidos</p>

      </div>

      <ModalBasic show={show} setShow={setShow} title={title}>
        {childrenModal}
      </ModalBasic>
      </>
  )
}

export default Follower