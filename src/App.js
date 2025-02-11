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
import AuthContext from './contexts/AuthContext';
import CustomerPage from './pages/CustomerPage';
import InvoicePage from './pages/InvoicePage';
import RegisterPage from './pages/RegisterPage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

authAPI.setup()

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated())

  // on donne les info à la forme de notre context
  const contextValue = {
    isAuthenticated: isAuthenticated,
    setIsAuthenticated: setIsAuthenticated
  }

  return (
    <AuthContext.Provider value={contextValue}>
      <Router>
        <Navbar />
        <main className="container pt-5">
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/invoices/:id" element={
              <PrivateRoute>
                <InvoicePage />
              </PrivateRoute>
            } />
            <Route path="/invoices" element={
              <PrivateRoute>
                <InvoicesPage />
              </PrivateRoute>
            } />
            <Route path="/customerpage" element={<CustomersPageWithPagination />} />
            <Route path="/customers/:id" element={
              <PrivateRoute>
                <CustomerPage />
              </PrivateRoute>
            } />
            <Route path="/customers" element={
              <PrivateRoute>
                <CustomersPage />
              </PrivateRoute>
            } />
            <Route path="/" element={<HomePage />} /> 
          </Routes>
        </main>
      </Router>
      <ToastContainer position="bottom-left" />
    </AuthContext.Provider>
  );
}

export default App;
