import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import CustomersPage from './pages/CustomersPage';
import CustomersPageWithPagination from './pages/CustomersPageWithPagination';
import InvoicesPage from './pages/InvoicesPage';
import LoginPage from './pages/LoginPage';
import authAPI from './services/authAPI';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute';

authAPI.setup()

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated())

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated} />
      <main className="container pt-5">
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={setIsAuthenticated}/>} />
          <Route path="/invoices" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <InvoicesPage />
            </PrivateRoute>
          } />
          <Route path="/customerpage" element={<CustomersPageWithPagination />} />
          <Route path="/customers" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <CustomersPage />
            </PrivateRoute>
          } />
          <Route path="/" element={<HomePage />} /> 
        </Routes>
      </main>
    </Router>
  );
}

export default App;
