import './App.scss';
import Nav from './components/Navigation/Nav';
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from 'react';
import AppRoutes from './routes/AppRoutes';

function App() {
  const [account, setAccount] = useState({});

  useEffect(() => {
    const session = sessionStorage.getItem("account");
    setAccount(JSON.parse(session));
  }, []);
  return (
    <Router>
      <div className='nav-container'>
        <Nav />
      </div>
      <div className='app-container'>
        <AppRoutes />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
}


export default App;
