import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import customersAPI from "../services/customersAPI";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";

const CustomersPage = (props) => {
    
    const [customers, setCustomers] = useState([])

    // pour la pagination
    const [currentPage, setCurrentPage] = useState(1)

    // filtre
    const [search, setSearch] = useState("")

    // loader
    const [loading, setLoading] = useState(true)

    const fetchCustomers = async () => {
        try{
            const data = await customersAPI.findAll()
            setCustomers(data)
            setLoading(false) // fini de charger
        }catch(error)
        {
            toast.error("Impossible de charger les clients")
            console.error(error.response)
        }
    }

    useEffect(()=>{
       fetchCustomers()
    },[])

    // pour la pagiation
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const handleSearch = event =>{
        const value = event.currentTarget.value 
        setSearch(value)
        setCurrentPage(1)
    }

    const filteredCustomers = customers.filter(c => 
        c.firstName.toLowerCase().includes(search.toLowerCase()) ||
        c.lastName.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        (c.company && c.company.toLowerCase().includes(search.toLowerCase()))

    )


    const handleDelete = async (id) => {
        // pessimiste
        const originalCustomers = [...customers]
        
        // optimiste
        setCustomers(customers.filter(customer => customer.id !== id))

        try{
            await customersAPI.delete(id)
            toast.warning("Le client "+id+" a bien été supprimé")
        }catch(error)
        {
            setCustomers(originalCustomers)
            toast.error("La suppression du client n'a pas fonctionné")
        }

    }


    const itemsPerPage = 10 

    const paginatedCustomers = Pagination.getData(filteredCustomers, currentPage, itemsPerPage)
 
    return ( 
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Liste des clients</h1>
                <Link to="/customers/new" className="btn btn-primary mb-3">Créer un client</Link>
            </div>

            {/* filtre */}
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Rechercher..." value={search} onChange={handleSearch} />
            </div>
            { (!loading) ? (
                <>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Client</th>
                                <th>Email</th>
                                <th>Entreprise</th>
                                <th>Factures</th>
                                <th className="text-center">Montant total</th>
                                <th className="text-center">Montant Restant</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedCustomers.map(customer => (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>{customer.firstName} {customer.lastName}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.company}</td>
                                    <td className="text-center">
                                        <span className="badge text-bg-primary">
                                            {customer.invoices.length}
                                        </span>
                                    </td>
                                    <td className="text-center">{customer.totalAmount.toLocaleString()}</td>
                                    <td className="text-center">{customer.unpaidAmount.toLocaleString()}</td>
                                    <td>
                                        <Link to={`/customers/${customer.id}`} className="btn btn-sm btn-warning m-1">Editer</Link>
                                        <button 
                                            disabled={customer.invoices.length > 0}
                                            onClick={() => handleDelete(customer.id)}
                                            className="btn btn-sm btn-danger m-1"
                                            >Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination 
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        length={filteredCustomers.length}
                        onPageChanged={handlePageChange}
                    />
                </>
            ) : (
                <TableLoader />
            ) }
            
        </>
     );
}
 
export default CustomersPage;