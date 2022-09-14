import { gql } from '@apollo/client'

const REGISTER = gql`

mutation Register($input: UserInput) {
  register(input: $input) {
    
    id
    name
    username
    email
    createdat

  }
}

`;

const LOGIN = gql`

mutation login($input: LoginInput) {

  login(input: $input){
    token
    
  }
  
  }

`

const GET_USER = gql`

query getUser($id : ID,$username : String){

  getUser(id : $id , username : $username){

    id
    name
    username
    email
    siteweb
    description
    avatar

  }

}
`;

const UPDATE_AVATAR = gql`

mutation updateAvatar($file : Upload!){
  updateAvatar(file : $file){
    status
    urlAvatar
  }
}

`;

const DELETE_AVATAR = gql`

  mutation deleteAvatar {
    deleteAvatar
  }

`;

const EDITAR_PERFIL = gql`

mutation editarPerfil($input : EditarInput){
  editarPerfil(input : $input)
}

`;

const SEACH_USER = gql`

query search($searchs : String){
  searchs (searchs : $searchs){
    username
    name
    avatar
  }
}

`;




export {

    REGISTER,
    LOGIN,
    GET_USER,
    UPDATE_AVATAR,
    DELETE_AVATAR,
    EDITAR_PERFIL,
    SEACH_USER,
    

}

