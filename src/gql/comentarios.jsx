import {gql} from '@apollo/client'

const COMENTARIOS_USER = gql`

mutation newComentarios($input : InputComentario){
    newComentarios(input : $input){
        
    idPublication
    idUser {
        avatar
    }
    comentario
    createAt
    }
}

`;

const TRAER_COMENTARIOS =  gql`

query recuperarComentarios($idPublication : ID){
    recuperarComentarios(idPublication : $idPublication){

        comentario 
        idUser {
            username
            avatar
        }

    }
}

`;

export {
    COMENTARIOS_USER,
    TRAER_COMENTARIOS
}