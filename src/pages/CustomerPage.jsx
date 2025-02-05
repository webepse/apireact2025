import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import customersAPI from "../services/customersAPI";
import Field from "../components/forms/Field";

const CustomerPage = (props) => {

    let {id = "new"} = useParams()
    const navigate = useNavigate()

    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: "",
        user: ""
    })

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    })


    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(customer)
        try{
            await customersAPI.create(customer)
            navigate("/customers", {replace:true})
        }catch({response})
        {
            const {violations} = response.data
            if(violations){
                const apiErrors = {}
                violations.forEach(({propertyPath, message})=>{
                    apiErrors[propertyPath] = message
                })
                setErrors(apiErrors)
            }
        }
    }

    const handleChange = (event) => {
        // const value = event.currentTarget.value 
        // const name = event.currentTarget.name
        const {name, value} = event.currentTarget
        setCustomer({...customer, [name]:value})
    }

    return ( 
        <>
            <h1>Création d'un client</h1>
            <form onSubmit={handleSubmit}>
                <Field 
                    name="lastName"
                    label="Nom de famille"
                    placeholder="Nom de famille du client"
                    value={customer.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                />
                <Field 
                    name="firstName"
                    label="Prénom"
                    placeholder="Prénom du client"
                    value={customer.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                />
                <Field 
                    name="email"
                    label="Adresse E-mail"
                    type="email"
                    placeholder="Adresse E-mail du client"
                    value={customer.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <Field 
                    name="company"
                    label="Entreprise"
                    placeholder="Nom de l'entreprise du client"
                    value={customer.company}
                    onChange={handleChange}
                    error={errors.company}
                />
                <div className="my-3">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/customers" className="btn btn-secondary mx-2">Retour aux clients</Link>
                </div>

            </form>
        </>
     );
}
 
export default CustomerPage;