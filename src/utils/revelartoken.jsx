import jwt_decode from "jwt-decode";

const tokenreal = (token) => {

    return jwt_decode(token)

}


export default tokenreal