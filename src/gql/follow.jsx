import { gql } from "@apollo/client";


//follow
const FOLLOW_USER = gql`

mutation followers($username : String!){
  followers(username : $username)
}


`;

const IS_FOLLOW = gql`

  query isFollow($username : String!){
    isFollow(username : $username)
  }

`;

const DELETE_USER_FOLLOW = gql`

mutation deleteUsuarioSeguido($username : String!){
  deleteUsuarioSeguido(username : $username)
}

`;

const COUND_FOLLOWS = gql`

query ObtenerTodosLosUsuarios($username: String!) {
  obtenerTodosLosUsuarios(username: $username) {
    username
    avatar
    name
  }
}
`;

const USUARIOS_SEGUIDOS =gql`

  query obtenerLosquesigo($username : String!){
    obtenerLosquesigo(username : $username){

      username
      avatar
      name

    }
  }

`;

const OBTENER_NO_SEGUIDOS = gql`

query getNotFolloweds{
  getNotFolloweds{
    username
    avatar
    name
  }
}

`;

export {
    FOLLOW_USER ,
    IS_FOLLOW,
    DELETE_USER_FOLLOW,
    COUND_FOLLOWS,
    USUARIOS_SEGUIDOS,
    OBTENER_NO_SEGUIDOS
}