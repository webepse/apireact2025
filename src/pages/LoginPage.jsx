import { useState, useContext } from "react";
import authAPI from "../services/authAPI";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const LoginPage = (props) => {

    const navigate = useNavigate()
    const {setIsAuthenticated} = useContext(AuthContext)

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    const [error, setError] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            await authAPI.authenticate(credentials)
            setError("")
            setIsAuthenticated(true)
            navigate("/customers", {replace: true})
        }catch(error)
        {
            setError("Aucun compte ne possède cette adresse e-mail ou les informations ne correspondent pas")
        }
    }

    const handleChange = (event) => {
        const value = event.currentTarget.value
        const name = event.currentTarget.name

        // copie de l'objet crédentials... et la virgule permet de faire un ajout ou un remplacement
        setCredentials({...credentials, [name]:value})

        /*
             setCredentials({...credentials, name:value})
             credentials = {
                username: "",
                password: "",
                name: "jfdklsqjflk"
             }

             // si on laisse simplement name, il va venir écrire dans l'objet une prop name mais avec le corchet il va prendre la valeur de ta constante name créée plus haut dans le code

             const name = "password"
              setCredentials({...credentials, [name]:value})
              setCredentials({...credentials, password:value})
             credentials = {
                username: "",
                password: "jfdklsqjflk",
             }
        */
    }

    return ( 
        <>
            <div className="row">
                <div className="col-sm-4 offset-sm-4">
                    <h2>Connexion</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group my-3">
                            <label htmlFor="username">Adresse E-mail</label>
                            <input 
                                type="email"
                                value={credentials.username}
                                onChange={handleChange}
                                placeholder="Adresse E-mail de connexion"
                                name="username"
                                id="username"
                                className={"form-control" + (error && " is-invalid")} 
                            />
                            {error && (
                                <p className="invalid-feedback">{error}</p>
                            )}
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="password">Mot de passe</label>
                            <input 
                                type="password"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="votre mot de passe"
                                name="password"
                                id="password"
                                className={"form-control" + (error && " is-invalid")} 
                            />
                            {error && (
                                <p className="invalid-feedback">{error}</p>
                            )}
                        </div>
                        <div className="form-group my-3">
                            <button className="btn btn-success">Connexion</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
     );
}
 
export default LoginPage;