import React,{useState} from 'react'
import { Image } from 'semantic-ui-react'
import './PrewiusImage.scss'
import VerModalGrande from '../../../Modal/VerimagenGrande/VerModalGrande'

const PrewiusImage = ({obtenerPublicaciones}) => {

  const [show,setShow] = useState(false)

  const handleAbrirImagen = () => {
    setShow(true)

  }


  return (
    <> 
    <div className="prewiew-publication">
        <Image className='prewiew-publication_image' onClick={handleAbrirImagen} src={obtenerPublicaciones.file}></Image>
        </div> 
        <div className='dondeiraelmoda'> <VerModalGrande obtenerPublicaciones={obtenerPublicaciones} show={show} setShow={setShow}/> </div>
        </>
  )
}

export default PrewiusImage