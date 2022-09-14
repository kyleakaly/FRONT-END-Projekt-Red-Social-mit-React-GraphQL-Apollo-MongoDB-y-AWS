import { Link} from 'react-router-dom'

//archivos
import './UserNoFound.scss'



const UserNoFounf = () => {

  return (
    <div className='user-not-found'>
        <p>Usuario No Encontrado</p>
        <p>Es posible que el enlace que has seguido este incorrecto o el usuario haya sido eliminado </p>
        <Link to="/"> Volver al Inicio </Link>
    </div>
   
  )
}

export default UserNoFounf