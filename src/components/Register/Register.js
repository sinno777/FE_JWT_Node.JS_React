import './Register.scss'
import { Link, useHistory } from 'react-router-dom'

const Register = (props) => {
    let history = useHistory();
    const handleLogin = () => {
        history.push("/login");
    }
    return (
        <div className="register-container py-3">
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
                    <div className="content-right d-flex flex-column py-4 gap-2 col-12 col-md-5">
                        <div className='text-center'><h3 className='content-right-title'>Register new account</h3></div>
                        <form className='form-group'>
                            <label className='form-label' for='email'>Email</label>
                            <input type="text" className='form-control' placeholder='Enter your email' id='email' />
                        </form>
                        <form className='form-group'>
                            <label className='form-label' for='phone'>Phone number</label>
                            <input type="text" className='form-control' placeholder='Enter your phone' id='phone' />
                        </form>
                        <form className='form-group'>
                            <label className='form-label' for='username'>Username</label>
                            <input type="text" className='form-control' placeholder='Enter your username' id='username' />
                        </form>
                        <form className='form-group'>
                            <label className='form-label' for='password'>Password</label>
                            <input type="text" className='form-control' placeholder='Enter your password' id='password' />
                        </form>
                        <form className='form-group'>
                            <label className='form-label' for='re_password'>Confirm your password</label>
                            <input type="text" className='form-control' placeholder='Confirm your password' id='re_password' />
                        </form>
                        <button className='btn btn-primary'>Register</button>
                        <hr />
                        <div className='btn_create text-center'>
                            <button className='btn btn-success' onClick={() => handleLogin()} >
                                Already have an account. Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Register