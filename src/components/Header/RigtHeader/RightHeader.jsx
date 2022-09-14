import { Link,  } from "react-router-dom"
import './RightHeader.scss'
import { Icon, Image } from "semantic-ui-react"




import ImageNoFound from "../../../assets/img/avatar.png";
import usercontext from "../../../hooks/useAuth";
import {useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";
import {useState,useEffect} from 'react'

import ModalUpload from "../../Modal/ModalUpload/ModalUpload";




const RightHeader = () => {

  const [show, setShow] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [showmenu,setShowMenu] = useState(false)

    const {auth} = usercontext()
    
   const {username} = auth
  
   const { data,loading,error } = useQuery(GET_USER,{
    variables : {

      username : username,

    }
   });

   if(error || loading) {
    return null
   }

   const {getUser : {avatar} } = data

const handleModal = () => {
  setShow(true)
  setTitleModal('Subir Contenido')
}

const abrirmenu = () => {
setShowMenu(true)
}

const cerrarmenu = () => {
  setShowMenu(false)
  }

  return (
    <>
    <nav className="nav">
      <div className="botonversionmovil">
      <span className="abrir" onClick={showmenu ? cerrarmenu : abrirmenu  }><Icon name="buromobelexperte"/> <span>Menu</span> </span>
      </div>
                  <ul className={showmenu ? "abrirModal" : "cerrarmodal"}  >
                    <div className="cerrarparaversionmovil"> 
                    <li className="casahomeli"> <Link to="/"><Icon className="casahome" name="home"/> <span>Home</span>  </Link>{" "}</li>
                    <li className="Arreglarelcirculo" onClick={handleModal}><Icon className="circulogrande" name="plus circle"/><span>Post</span></li>
                    <li><div className="contenedor"><Link to={username}><Image avatar src={avatar ? avatar : ImageNoFound} alt="avatar" />Profile</Link>{" "}</div></li>

                    </div>
                    
                   
                  </ul>
                </nav>
                <ModalUpload titleModal={titleModal} setShow={setShow} show={show} username={username}  />
                </>
  )
}

export default RightHeader