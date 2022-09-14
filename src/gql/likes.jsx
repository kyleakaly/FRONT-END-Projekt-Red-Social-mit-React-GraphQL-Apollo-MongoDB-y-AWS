import {gql} from '@apollo/client'


const AGREGAR_LIKES = gql `

mutation agregarLikes($idPublication : ID!){
    agregarLikes(idPublication : $idPublication)
}

`;

const ELIMINAR_LIKES = gql `

mutation eliminarLikes($idPublication : ID!){
    eliminarLikes(idPublication : $idPublication)
}

`;

const CONSULTAR_LIKES = gql`

query consultarLikes($idPublication : ID!){
    consultarLikes(idPublication : $idPublication)
}

`;

const TODOS_LOS_LIKES = gql`

query consultarTodosLosLikes($idPublication : ID!){
    consultarTodosLosLikes(idPublication : $idPublication)
}

`;

export {
    AGREGAR_LIKES,
    ELIMINAR_LIKES,
    CONSULTAR_LIKES,
    TODOS_LOS_LIKES
}