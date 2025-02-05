import moment from "moment";
import {useState, useEffect} from 'react'
import Pagination from "../components/Pagination";
import invoicesAPI from "../services/invoicesAPI";

const STATUS_CLASSES = {
    PAID: "success",
    SENT: "primary",
    CANCELLED: "danger"
}

const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELLED: "Annulée"
}

const InvoicesPage = (props) => {

    const [invoices, setInvoices] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")
    const itemsPerPage = 30

    // recup les invoices
    const fetchInvoice = async () => {
        try{
            const data = await invoicesAPI.findAll()
            setInvoices(data)
        }catch(error)
        {
            // notif à faire
            console.error(error.response)
        }
    }

    useEffect(()=>{
        fetchInvoice()
    },[])

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const handleSearch = event => {
        const value = event.currentTarget.value
        setSearch(value)
        // remettre la pagination à 1 après la recherche
        setCurrentPage(1)
    }

    const formatDate = (str) => moment(str).format("DD/MM/YYYY")

    const filteredInvoices = invoices.filter(i =>
        i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
        i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
        i.amount.toString().includes(search.toLowerCase()) ||
        STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
    )

    const paginatedInvoices = Pagination.getData(filteredInvoices, currentPage, itemsPerPage)

    return ( 
        <>
            <h1>Liste des factures</h1>
            {/* filtre */}
            <div className="form-group my-3">
                <input type="text" className="form-control" placeholder="Rechercher..." onChange={handleSearch} value={search} />
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th className="text-center">Numéro</th>
                        <th className="text-center">Client</th>
                        <th className="text-center">Date d'envoie</th>
                        <th className="text-center">Statut</th>
                        <th className="text-center">Montant</th>
                        <th className="text-center"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        paginatedInvoices.map(invoice => (
                            <tr key={invoice.id}>
                                <td className="text-center">{invoice.id}</td>
                                <td className="text-center">{invoice.customer.firstName} {invoice.customer.lastName}</td>
                                <td className="text-center">{formatDate(invoice.sentAt)}</td>
                                <td className="text-center">
                                    <span className={`badge text-bg-${STATUS_CLASSES[invoice.status]}`}>
                                        {STATUS_LABELS[invoice.status]}
                                    </span>
                                </td>
                                <td className="text-center">{invoice.amount.toLocaleString()}</td>
                                <td className="text-center">
                                    <button
                                        className="btn btn-sm btn-success mx-2"
                                    >Modifier</button>
                                    <button
                                        className="btn btn-sm btn-danger mx-2"
                                    >Supprimer</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Pagination 
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={filteredInvoices.length}
                onPageChanged={handlePageChange}
            />
        </>
     );
}
 
export default InvoicesPage;