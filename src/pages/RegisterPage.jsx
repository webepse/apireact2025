import { useState } from 'react';
import Field from '../components/forms/Field';
import { Link, useNavigate } from 'react-router-dom';
import Axios from "axios"

const RegisterPage = (props) => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })

    // Gestion des changements des inputs dans le formulaire 
    const handleChange = (event) => {
        const {name,value} = event.currentTarget 
        setUser({...user, [name]:value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const apiErrors = {}
        if(user.password !== user.passwordConfirm){
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est pas confirme à l'original"
            setErrors(apiErrors)
            // on arrete si ce n'est pas bon
            return 
        }
        try{
            await Axios.post("http://apicourse.myepse.be/api/users", user)
            setErrors({})
            navigate("/login", {replace: true})
        }catch({response}){
            const {violations}= response.data
            if(violations){
                violations.forEach(({propertyPath,message})=>{
                    apiErrors[propertyPath] = message
                })
                setErrors(apiErrors)
            }
        }
    }

    return ( 
        <>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <Field 
                    name="firstName"
                    label="Prénom"
                    placeholder='Votre prénom'
                    error={errors.firstName}
                    value={user.firstName}
                    onChange={handleChange}
                />
                <Field 
                    name="lastName"
                    label="Nom de famille"
                    placeholder='Votre nom de famille'
                    error={errors.lastName}
                    value={user.lastName}
                    onChange={handleChange}
                />
                <Field 
                    type="email"
                    name="email"
                    label="Adresse E-mail"
                    placeholder='Votre adresse E-mail'
                    error={errors.email}
                    value={user.email}
                    onChange={handleChange}
                />
                <Field 
                    type="password"
                    label="Mot de passe"
                    name="password"
                    placeholder='Votre mot de passe'
                    error={errors.password}
                    value={user.password}
                    onChange={handleChange}
                />
                <Field 
                    type="password"
                    label="Confirmation de votre mot de passe"
                    name="passwordConfirm"
                    placeholder='Confirmer votre mot de passe'
                    error={errors.passwordConfirm}
                    value={user.passwordConfirm}
                    onChange={handleChange}
                />
                <div className="my-3">
                    <button type="submit" className='btn btn-success'>Confirmation</button>
                    <Link to="/login" className='btn btn-secondary'>J'ai déjà un compte</Link>
                </div>
            </form>
        </>
     );
}

export default RegisterPage;