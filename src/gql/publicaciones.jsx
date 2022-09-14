import {gql} from '@apollo/client';

const NEW_POST = gql`

mutation newPost($file : Upload!){
    newPost(file : $file){
        status
        urlFile
    }
}

`;

const OBTENER_PUBLICACIONES = gql `

query obtenerPublicaciones($username : String!){
    obtenerPublicaciones(username : $username){

        id
        idUser
        file
        typeFile
        createAt

    }
}

`;

const OBTENER_PUBLICACIONES_HOME =gql`

query obtenerHomePublicaciones{
    obtenerHomePublicaciones{

        id,
        idUser {
            name
            username
            avatar
        }
        file
        typeFile
        createAt

    }

}

`;

export {
    NEW_POST,
    OBTENER_PUBLICACIONES,
    OBTENER_PUBLICACIONES_HOME
}