import { useEffect, useState } from "react";
import invoicesAPI from "../services/invoicesAPI";
import Field from '../components/forms/Field'
import Select from "../components/forms/Select";
import customersAPI from "../services/customersAPI"
import { Link, useParams, useNavigate } from "react-router-dom";

const InvoicePage = (props) => {

    let {id = "new"} = useParams()
    const navigate = useNavigate()
    const [invoice, setInvoice] = useState({
        amount: "",
        customer: "",
        status: "SENT"
    })

    const [customers, setCustomers] = useState([])

    const [errors, setErrors] = useState({
        amount: "",
        customer: "",
        status: "",
    })

    const [editing, setEditing] = useState(false)


    // récup les clients 
    const fetchCustomers = async () => {
        try{
            const data = await customersAPI.findAll()
            setCustomers(data)
            if(id === "new") setInvoice({...invoice, customer: data[0].id})
        }catch(error){
            navigate("/invoices", {replace: true})
             // notif à faire
        }
    }

    // récup la facture
    const fetchInvoice = async id => {
        try{
            const {amount, status, customer, chrono} = await invoicesAPI.find(id)
            setInvoice({amount, status, customer: customer.id, chrono})
        }catch(error)
        {
            navigate("/invoices", {replace: true})
            // notif à faire
        }
    }

    // récup la liste des client à chaque chargement du composant
    useEffect(()=>{
        fetchCustomers()
    },[])

    // dépend de la variable id - on récup la facture si id est != new
    useEffect(()=>{
        if(id !=="new")
        {
            setEditing(true)
            fetchInvoice(id)
        }
    },[id])

    const handleChange = (event) => {
        const {name, value} = event.currentTarget 
        setInvoice({...invoice, [name]:value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            // si je suis en édition ou en création
            if(editing)
            {
                await invoicesAPI.update(id, invoice)
            }else{
                await invoicesAPI.create(invoice)
                navigate("/invoices", {replace: true})
            }
        }catch({response}){
            const {violations} = response.data
            if(violations){
                const apiErrors = {}
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message
                })
                setErrors(apiErrors)
            }
        }
    }

    return ( 
        <>
            {editing ? <h1>Modification d'une facture</h1> : <h1>Création d'une facture</h1>}
            <form onSubmit={handleSubmit}>
                <Field 
                    name="amount"
                    type="number"
                    placeholder="Montant de la facture"
                    label="Montant"
                    onChange={handleChange}
                    value={invoice.amount}
                    error={errors.amount}
                />
                <Select
                    name="customer"
                    label="Client"
                    value={invoice.customer}
                    error={errors.customer}
                    onChange={handleChange}
                >
                    {customers.map(customer => <option key={customer.id} value={customer.id}>{customer.firstName} {customer.lastName}</option>)}
                </Select>
                <Select
                    name="status"
                    label="Statut"
                    value={invoice.status}
                    error={errors.status}
                    onChange={handleChange}
                >
                    <option value="SENT">Envoyée</option>
                    <option value="PAID">Payée</option>
                    <option value="CANCELLED">Annulée</option>
                </Select>
                <div className="my-3">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/invoices" className="btn btn-secondary mx-2">Retour aux factures</Link>
                </div>

            </form>
        </>
     );
}
 
export default InvoicePage;