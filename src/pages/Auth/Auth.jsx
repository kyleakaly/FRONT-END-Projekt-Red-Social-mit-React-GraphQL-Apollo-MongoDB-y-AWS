import { useState } from 'react';
import  {Container,Image} from 'semantic-ui-react' 
import './Auth.scss';
import redsocial from '../../assets/img/recurso9Recurso-8.svg'
import FormAuth from '../../components/Auth/loginForm/FormAuth';
import FormRegister from '../../components/Auth/RegisterForm/Formregister';

const Auth = () => {

    const [ showLogin, setShowLogin ] = useState(false)

  return (
    <Container fluid className='auth'>
    <Image src = {redsocial} alt="ellogoweb" />
    
    <div className="container-form">

    {showLogin ? <FormAuth/> : <FormRegister setShowLogin={ setShowLogin }/>}

        
    </div>

    <div className='change-form'> 
    <p>
    {showLogin ? (
        <>
no tienes cuenta ? <br/>
<span onClick={()=> {
    return setShowLogin(!showLogin)
}}>Registrate</span>
        </>
    ) : ( 
<>
        entra con tu cuenta ? <br/>
<span onClick={()=> {
    return setShowLogin(!showLogin)
}}>Iniciar seccion</span>
</>
    )}
    </p>
     </div>
    </Container>
  )
}

export default Auth