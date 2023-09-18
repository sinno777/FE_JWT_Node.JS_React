import './Register.scss'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { renderIntoDocument } from 'react-dom/test-utils';
const Register = (props) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    let history = useHistory();
    const handleLogin = () => {
        history.push("/login");
    }

    useEffect(() => {
        // axios.get('http://localhost:8081/api/test-api').then((item) => console.log(item))
    }, [])

    const isValidInputs = () => {
        if (!email) {
            toast.error('Email is required')
            return false
        }
        if (!phone) {
            toast.error('Phone is required')
            return false
        }
        if (!username) {
            toast.error('Username is required')
            return false
        }
        if (password !== confirmPassword) {
            toast.error('The password isn\'t same')
            return false
        }
        if (!password) {
            toast.error('Password is required')
            return false
        }
        const re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            toast.error('Please enter your email valid')
            return false
        }


    }

    const handleRegister = () => {
        toast.success('success')

        let check = isValidInputs()
        let userData = { email, username, password, confirmPassword }
        console.table(userData)
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
                            <label className='form-label' htmlFor='email'>Email</label>
                            <input type="text" className='form-control' placeholder='Enter your email' id='email'
                                value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                        </form>
                        <form className='form-group'>
                            <label className='form-label' htmlFor='phone'>Phone number</label>
                            <input type="text" className='form-control' placeholder='Enter your phone' id='phone'
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
                            <label className='form-label' htmlFor='password'>Passwordword</label>
                            <input type="password" className='form-control' placeholder='Enter your password' id='password'
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                        </form>
                        <form className='form-group'>
                            <label className='form-label' htmlFor='re_password'>Confirm your password</label>
                            <input type="password" className='form-control' placeholder='Confirm your password' id='re_password'
                                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </form>
                        <button className='btn btn-primary' onClick={() => handleRegister()} >Register</button>
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