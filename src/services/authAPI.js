import Axios from "axios"
import { jwtDecode } from "jwt-decode"

const authenticate = (credentials) => {
    return Axios
            .post("http://127.0.0.1:8000/api/login_check", credentials)
            .then(response => response.data.token)
            .then(token => {
                // mettre le token dans le localStorage
                window.localStorage.setItem("authToken", token)
                // Ajouter à axios pour chaque req, le bearer token avec le token qu'on récup
                Axios.defaults.headers["Authorization"]="Bearer " + token
                return true
            })
}

const logout = () => {
    window.localStorage.removeItem("authToken")
    delete Axios.defaults.headers["Authorization"]
}

const setup = () => {
    // voir si on a un token
    const token = window.localStorage.getItem("authToken")
    if(token)
    {
        const jwtData = jwtDecode(token)
        // millisecondes vs secondes
        if((jwtData.exp * 1000) > new Date().getTime())
        {
            Axios.defaults.headers["Authorization"]="Bearer " + token
        }
    }
}

const isAuthenticated = () => {
    const token = window.localStorage.getItem("authToken")
    if(token)
    {
        const jwtData = jwtDecode(token)
        if((jwtData.exp * 1000) > new Date().getTime())
        {
            return true
        }
        return false // token expiré
    }
    return false // pas de token
}

export default {
    authenticate: authenticate,
    logout: logout,
    setup: setup,
    isAuthenticated: isAuthenticated
}