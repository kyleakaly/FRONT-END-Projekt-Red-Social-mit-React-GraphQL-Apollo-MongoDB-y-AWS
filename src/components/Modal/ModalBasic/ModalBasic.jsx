import React from 'react'
import { Modal } from 'semantic-ui-react' 
import './ModalBasic.scss'

const ModalBasic = ({show,setShow,children,title}) => {

    const  onClose = () => {
        setShow(false)
    }

  return (
   <Modal size="mini" open={show} onClose={onClose} className="modal-basic" >
       {title &&  <Modal.Header>{title}</Modal.Header>}
       {children}
   </Modal>
  )
}

export default ModalBasic