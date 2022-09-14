import { useQuery,useMutation } from '@apollo/client'
import { Button } from 'semantic-ui-react'
import { IS_FOLLOW ,FOLLOW_USER, DELETE_USER_FOLLOW } from '../../../../gql/follow'
import './HeaderProfile.scss'
import { useApolloClient } from '@apollo/client'




const HeaderProfile = ( { username,auth,typodeModal } ) => {

  const client = useApolloClient()

  const usuariologiado  = auth

  const [followers] =  useMutation(FOLLOW_USER)
  const [deleteUsuarioSeguido] = useMutation(DELETE_USER_FOLLOW)

  const {data , loading,refetch} =  useQuery(IS_FOLLOW,{
    variables : {
      username : username
    }
  })

 const ButtonFollow = () => {

  if(data.isFollow){

    return (<Button className='btn-danger' onClick={dejarDeSeguir}>dejar de seguir</Button>)
    

  }else{

    return(<Button onClick={seguirUsuario} >seguir</Button>)
  }
  

 }

 const seguirUsuario = async () => {
  
  
  try {
    if(!data.isFollow){
      await followers({
          variables : {
              username : username
          } 
      })

      client.cache.reset()
    }
    
  } catch (error) {
      console.log(error)
   
  }
  
  }

 const dejarDeSeguir = async () => {

  try {

    await deleteUsuarioSeguido({
      variables : {
        username : username
      }
    })
    //las 2 son validas
    refetch()
    //client.cache.reset()

    
  } catch (error) {
    console.log(error)
  }

 }

  return (

  <div className='header-profile'>

    <h2>{username}</h2>
    {username === usuariologiado.username ? (
 <Button onClick={()=> typodeModal('ajustes')}>Ajustes</Button>
    ) : (!loading && ButtonFollow())}

    </div>
    
  )
}

export default HeaderProfile