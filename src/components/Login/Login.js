import { useEffect, useState } from 'react';
import './Login.scss'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userService';
const Login = (props) => {
    let history = useHistory();

    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");
    const defaultObjValid = {
        isValidLogin: true,
        isValidPassword: true
    }
    const [objValidInput, setObjValidInput] = useState(defaultObjValid);
    const handleCreateNewAcc = () => {
        history.push("/register")
    }

    const handleLogin = async () => {
        setObjValidInput(defaultObjValid)
        if (!valueLogin) {
            toast.error('Your phone or email is empty!')
            setObjValidInput({ ...defaultObjValid, isValidLogin: false })
            return;
        }
        if (!password) {
            toast.error('Your password is empty!')
            setObjValidInput({ ...defaultObjValid, isValidPassword: false })
            return;
        }


        let response = await loginUser(valueLogin, password)

        if (response && +response.EC === 0) {
            //success
            let data = {
                isAuthenticated: true,
                token: 'fake token'
            }
            sessionStorage.setItem("account", JSON.stringify(data));
            toast.success(response.EM)
            history.push("/users")
            window.location.reload()
        }

        if (response && +response.EC !== 0) {
            //fail
            toast.error(response.EM)
        }
    }

    const handleEnter = (e) => {
        if (e.code === "Enter" && e.keyCode === 13) {
            e.preventDefault();
            handleLogin();
        }
    }

    useEffect(() => {
        const session = sessionStorage.getItem("account");
        if (session) {
            history.push('/')
            window.location.reload()
        }

    }, []);
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
                        <input type="text"
                            className={objValidInput.isValidLogin ? 'form-control' : 'form-control is-invalid'}
                            placeholder='Enter your email or number phone'
                            value={valueLogin}
                            onChange={(e) => setValueLogin(e.target.value)}
                        />
                        <input type="password"
                            className={objValidInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                            placeholder='Your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => handleEnter(e)}
                        />
                        <button className='btn btn-primary' onClick={() => handleLogin()}>Login</button>
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