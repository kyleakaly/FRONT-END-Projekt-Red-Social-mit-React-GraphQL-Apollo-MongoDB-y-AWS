 import { useQuery,useMutation } from '@apollo/client'
import React, {useState} from 'react'
import { Icon } from 'semantic-ui-react'
import './ActionsComentarios.scss'
import { AGREGAR_LIKES, CONSULTAR_LIKES, TODOS_LOS_LIKES,ELIMINAR_LIKES } from '../../gql/likes'


const ActionsComentarios = ({obtenerPublicaciones}) => { 

  const {id} = obtenerPublicaciones

  const [loadingAction,setLoadingAction] = useState(false)

  const [agregarLikes] = useMutation(AGREGAR_LIKES)
  const [eliminarLikes] = useMutation(ELIMINAR_LIKES)


  const {data : usuariodioLike ,loading : loadingUsuarioDioLike,refetch :refetchUsuariodioLike} = useQuery(CONSULTAR_LIKES,{

    variables : {
      idPublication : id
    }
    
  
 });




const {data,loading,refetch} = useQuery(TODOS_LOS_LIKES,{
  variables : {

   idPublication : id
  }
 });



const agregarelLikes = async () => {

  setLoadingAction(true)

    try {

     await agregarLikes({
        variables : {
  
          idPublication : id
  
        }
      })

      refetch()
      refetchUsuariodioLike()
      
    } catch (error) {
      console.log(error)
      
    }
 
  setLoadingAction(false)


  }

 

  const eliminareseLike = async () => {

  setLoadingAction(true)


    try {

     await eliminarLikes({
        variables : {
  
          idPublication : id
  
        }
      })

      refetch()
      refetchUsuariodioLike()
      
    } catch (error) {
      console.log(error)
      return false
    }

  setLoadingAction(false)
    

  };

  const onAction = () => {

    if(!loadingAction){
      if(consultarLikes){

        eliminareseLike()

      }else{

        agregarelLikes()

      }
    }

  }

if(loadingUsuarioDioLike){
  return null
}

const {consultarLikes} = usuariodioLike

 
  if(loading){
    return false
  }
  const {consultarTodosLosLikes} = data
 

return (
    <div className="actions">


  <div className="likes">
   <Icon className={!consultarLikes ? 'iconolike' : 'iconolike  active' } name='heart' />
  <p className='seguidores'> 
   {consultarTodosLosLikes} <span>likes</span> 
  </p>
  </div>

<div className="likes" onClick={onAction}>
<Icon className='darLike'
  name={!consultarLikes ? 'thumbs up outline' : "thumbs down outline"  }/>
  <p className='mano'>
  {consultarLikes ? 'quitar' : 'dar' }
    </p> 
</div>

    </div>
    
  )
}

export default ActionsComentarios