import React from 'react'
import './MostrarUsuariosQueSigo.scss'
import { size } from 'lodash'
import { Link } from "react-router-dom";
import { Button,Image } from "semantic-ui-react";
import ImagenAvatarNoFound from '../../../../assets/img/avatar.png'




const MostrarUsuariosQueSigo = ({setShow,data,loading}) => {
    const cerrarmodal = () => {

        setShow(false)

    }

    let datos;

    if(!loading){

      datos = data.obtenerLosquesigo

    }

  return (
    <div>
                
{size(datos) === 0 ? (<p className="nohayseguidos"> Este Usuario no tiene seguidos. </p>) : (datos.map((dato,index)=> {

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

export default MostrarUsuariosQueSigo