import { Link } from "react-router-dom";

const Navbar = (props) => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">API-Platform React</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/customers">Clients</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/invoices">Factures</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a href="#" className="nav-link">Inscription</a>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="btn btn-success">Connexion</Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-danger">Déconnexion</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
     );
}

export default Navbar;