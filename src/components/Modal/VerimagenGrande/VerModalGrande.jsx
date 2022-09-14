import React from 'react'
import { Modal,Grid   } from 'semantic-ui-react'
import './VerModalGrande.scss'
import ListaDeComentarios from '../../Comentarios/ListaDeComentarios'
import ActionsComentarios from '../../Comentarios/ActionsComentarios'
import FormularioForm from '../../Comentarios/FormularioForm'

const VerModalGrande = ({obtenerPublicaciones,show,setShow}) => {

    const onCloses = () => {
        setShow(false)
    }

  return (
    <Modal open={show} onClose={onCloses} className="modal-Imagen">

    <Grid>

    <Grid.Column className='modal-publicacion_left' width={9} style={{backgroundImage:`url("${obtenerPublicaciones.file}")`}} />
<Grid.Column className='modal-publicacion_rigth' width={7}>
    <div>
        <ListaDeComentarios obtenerPublicaciones={obtenerPublicaciones}/>
        <ActionsComentarios obtenerPublicaciones={obtenerPublicaciones} />
        <FormularioForm obtenerPublicaciones={obtenerPublicaciones}/>
    </div>
</Grid.Column>

    </Grid>
    
    

    </Modal>
  )
}

export default VerModalGrande