import { useContext } from "react"
import AuthContext from "../context/AuthContext"

const usercontext = () => {

    return useContext(AuthContext)

}

export default usercontext;