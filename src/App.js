import './App.scss';
import NavHeader from './components/Navigation/NavHeader';
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect, useState } from 'react';
import AppRoutes from './routes/AppRoutes';
import { Circles } from 'react-loader-spinner'
import UserContext from "./components/Context/Context";
import { Scrollbars } from 'react-custom-scrollbars';
function App() {
  const { user } = useContext(UserContext);
  const [currentHeight, setCurrentHeight] = useState(0);
  window.addEventListener('resize', widthResizer)

  useEffect(() => {
    widthResizer()
  }, [user]);

  function widthResizer() {
    var height = window.innerHeight
    setCurrentHeight(height)
  }

  return (
    <Scrollbars
      autoHide
      style={{ height: currentHeight }}

    >
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
              <NavHeader />
            </div>
            <div className='app-container'>
              <AppRoutes />
            </div>
          </>
        }
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Scrollbars>
  );
}


export default App;
