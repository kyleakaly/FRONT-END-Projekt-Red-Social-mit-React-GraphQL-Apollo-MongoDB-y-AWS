import { Button,Image } from "semantic-ui-react";
import { size } from 'lodash'
import { Link } from "react-router-dom";
import './MostrarUsuarios.scss'
import ImagenAvatarNoFound from '../../../../assets/img/avatar.png'



const MostrarUsuariosSeguidores = ({setShow,data,loading}) => {

    

    const cerrarmodal = () => {

        setShow(false)

    }

    let datos;

    if(!loading){

      datos = data.obtenerTodosLosUsuarios

    }



  return (
    <div className="losseguidoschiquito">
                
{size(datos) === 0 ? (<p className="nohayseguidos"> Este Usuario no tiene seguidores. </p>) : (datos.map((dato,index)=> {

return (
<div key={index} className="arreglarlista">
<Link onClick={cerrarmodal} to={`/${dato.username}`}>
<Image src={dato.avatar ? `${dato.avatar}` : ImagenAvatarNoFound} alt="" />
<p>{dato.username}</p>
</Link>
</div>
)
}))
}
       
        <Button className="cerrarfollow" onClick={cerrarmodal}>cancelar</Button>
    </div>
  )
}

export default MostrarUsuariosSeguidores