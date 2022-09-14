import {TOKEN} from './contains'

const setToken = (token) => {

    localStorage.setItem(TOKEN,token);
    

}

const getToken = () => {
    return localStorage.getItem(TOKEN)
}

const removerToken = () => {
    localStorage.removeItem(TOKEN)
}

export {
    setToken,
    getToken,
    removerToken
}