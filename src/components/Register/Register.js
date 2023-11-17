import './Register.scss'
import { Link, useHistory } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { registerNewUser } from '../../services/userService';
import Context from '../Context/Context'

const Register = () => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [objCheckInput, setObjCheckInput] = useState({
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    });
    const { user } = useContext(Context);

    let history = useHistory();
    const handleLogin = () => {
        history.push("/login")
    }

    useEffect(() => {
        if (user && user.isAuthenticated) {
            history.push('/')
        }
    }, [user])

    const isValidInputs = () => {
        if (!email) {
            setObjCheckInput({ ...objCheckInput, isValidEmail: false })
            toast.error('Email is required')
            return false
        }
        const re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            setObjCheckInput({ ...objCheckInput, isValidEmail: false })
            toast.error('Please enter your email valid')
            return false
        }
        if (!phone) {
            toast.error('Phone is required')
            setObjCheckInput({ ...objCheckInput, isValidPhone: false })
            return false
        }
        if (!username) {
            toast.error('Username is required')
            return false
        }
        if (password !== confirmPassword) {
            setObjCheckInput({ ...objCheckInput, isValidConfirmPassword: false })
            toast.error('The password isn\'t same')
            return false
        }
        if (!password) {
            setObjCheckInput({ ...objCheckInput, isValidPassword: false })
            toast.error('Password is required')
            return false
        }
        return true
    }

    const handleRegister = async () => {
        let check = isValidInputs()
        if (check) {
            let response = await registerNewUser(email, phone, username, password)
            let serverData = response
            if (+serverData.EC === 0) {
                toast.success(serverData.EM)
                history.push("/login")
            } else
                toast.error(serverData.EM)
        }
    }

    const handleEnter = (e) => {
        if (e.code === "Enter" && e.keyCode === 13) {
            e.preventDefault();
            handleRegister();
        }
    }

    return (
        <div className="register-container py-3">
            <div className="container">
                <div className="row px-3 px-md-0">
                    <div className="content-left d-none d-md-block col-12 col-md-6 col-lg-7">
                        <div className="content_brand">
                            <Link to='/' className='text-decoration-none '>
                                <span title='Return to HomePage' >KHOA SINOO</span>
                            </Link>
                        </div>
                        <div className="content_detail">
                            <span>Sinoo help you connect and share with the people in your life</span>
                        </div>
                    </div>
                    <div className="content-right d-flex flex-column py-4 gap-2 col-12 col-md-6 col-lg-5">
                        <div className='text-center'><h3 className='content-right-title'>Register new account</h3></div>
                        <form className='form-group'>
                            <label className='form-label' htmlFor='email'>Email</label>
                            <input type="text" autoFocus className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'} placeholder='Enter your email' id='email'
                                value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                        </form>
                        <form className='form-group'>
                            <label className='form-label' htmlFor='phone'>Phone number</label>
                            <input type="text" className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'} placeholder='Enter your phone' id='phone'
                                value={phone} onChange={(e) => setPhone(e.target.value)}
                            />
                        </form>
                        <form className='form-group'>
                            <label className='form-label' htmlFor='username'>Username</label>
                            <input type="text" className='form-control' placeholder='Enter your username' id='username'
                                value={username} onChange={(e) => setUsername(e.target.value)}
                            />
                        </form>
                        <form className='form-group'>
                            <label className='form-label' htmlFor='password'>Password</label>
                            <input type="password" className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'} placeholder='Enter your password' id='password'
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                        </form>
                        <form className='form-group'>
                            <label className='form-label' htmlFor='re_password'>Confirm your password</label>
                            <input type="password" className={objCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'} placeholder='Confirm your password' id='re_password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onKeyDown={(e) => handleEnter(e)}
                            />
                        </form>
                        <button className='btn btn-primary' onClick={() => handleRegister()} >Register</button>
                        <hr />
                        <div className='btn_create text-center'>
                            <button className='btn btn-success' onClick={() => handleLogin()} >
                                Already have an account. Login
                            </button>
                            <div className="return">
                                <Link to='/'>
                                    <i className="fa fa-reply-all" aria-hidden="true"></i>
                                    <span>Return to HomePage</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Register