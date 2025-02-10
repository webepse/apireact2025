import Axios from "axios"

function find(id){
    return Axios.get(`http://127.0.0.1:8000/api/invoices/${id}`)
                .then(response => response.data)
}

function updateInvoice(id, invoice){
    const headers = {
        'Content-Type': 'application/merge-patch+json'
    }
    return Axios.patch(`http://127.0.0.1:8000/api/invoices/${id}`, {...invoice, customer: `api/customers/${invoice.customer}`}, {headers})
}

function createInvoice(invoice){
    return Axios.post("http://127.0.0.1:8000/api/invoices", {...invoice, customer: `api/customers/${invoice.customer}`})
}

function findAll()
{
    return Axios.get("http://127.0.0.1:8000/api/invoices")
                .then(response => response.data.member)
}

function deleteInvoice(id){
    return Axios.delete(`http://127.0.0.1:8000/api/invoices/${id}`)
}

export default {
    findAll: findAll,
    find: find,
    create: createInvoice,
    update: updateInvoice,
    delete: deleteInvoice
}