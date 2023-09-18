import './Login.scss'
import { useHistory } from 'react-router-dom'

const Login = (props) => {
    let history = useHistory();
    const handleCreateNewAcc = () => {
        history.push("/register");
    }
    return (
        <div className="login-container py-5">
            <div className="container">
                <div className="row px-3 px-md-0">
                    <div className="content-left d-none d-md-block col-md-7 ">
                        <div className="content_brand">
                            <span>KHOA SINOO</span>
                        </div>
                        <div className="content_detail">
                            <span>Sinoo help you connect and share with the people in your life</span>
                        </div>
                    </div>
                    <div className="content-right d-flex flex-column py-4 gap-3 col-12 col-md-5">
                        <div className='text-center'><h3 className='content-right-title'>Manage employee</h3></div>
                        <input type="text" className='form-control' placeholder='Enter your email or number phone' />
                        <input type="password" className='form-control' placeholder='Your password' />
                        <button className='btn btn-primary'>Login</button>
                        <span className='text-center'><a className='forgot_pass' href="#">Forgot your password?</a></span>
                        <hr />
                        <div className='btn_create text-center'>
                            <button className='btn btn-success' onClick={() => handleCreateNewAcc()} >
                                Create new account
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login