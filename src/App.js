import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import CustomersPage from './pages/CustomersPage';
import CustomersPageWithPagination from './pages/CustomersPageWithPagination';
import InvoicesPage from './pages/InvoicesPage';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container pt-5">
        <Routes>
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/customerpage" element={<CustomersPageWithPagination />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/" element={<HomePage />} /> 
        </Routes>
      </main>
    </Router>
  );
}

export default App;
