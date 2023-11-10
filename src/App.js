import './App.scss';
import Nav from './components/Navigation/Nav';
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect, useState } from 'react';
import AppRoutes from './routes/AppRoutes';
import { Circles } from 'react-loader-spinner'
import UserContext from "./components/Context/Context";

function App() {
  const { user } = useContext(UserContext);


  return (
    <>
      <Router>
        {user && user.isLoading ?
          <div className="loading-container">
            <Circles
              height="80"
              width="80"
              color="#1877f2"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
            <span className='loading_content'>Loading ...</span>
          </div>
          :
          <>
            <div className='nav-container'>
              <Nav />
            </div>
            <div className='app-container'>
              <AppRoutes />
            </div>
          </>
        }
      </Router>
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
    </>
  );
}


export default App;
