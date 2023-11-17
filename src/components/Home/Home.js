import React, { useContext } from 'react'
// import nasa from '../../image/nasa.jpg'
import { reactjs, nodejs, sql } from '../../image'
import './Home.scss'
import { Link } from 'react-router-dom'
import Context from '../Context/Context'
export default function Home() {
    const { user } = useContext(Context);

    return (
        <div className='homePage-container'>
            <section className="introduceSN text-center fs-5">
                <div className="introduceSN_content">
                    <h1>FullStack Project</h1>
                    <p><span>Sinoo</span> help you connect and share with the people in your life</p>
                    <p>Demo account: <span className='underline'>sinoo@admin.com</span> - Pass: <span className='underline'>123456</span></p>
                    {!user && !user.isAuthenticated &&
                        <div className="control ">
                            <Link className='btn_signUp text-decoration-none' to='/login'>Sign In</Link>
                        </div>
                    }
                </div>
            </section>
            <section className='contentSN py-4'>
                <div className="contentSN_header container py-4 text-center fs-5">
                    <h1>What I Do</h1>
                    <p>Do something to help you connect and share with the people in your life!</p>
                </div>
                <div className="contentSN_body ">
                    <div className="container">
                        <div className="row px-4 px-md-0">
                            <div className="p-2 col-12 col-sm-4">
                                <div className="nodejs">
                                    <img src={nodejs} alt="" />
                                    <div className="contentItem p-4">
                                        <p><i class="fa fa-check-square-o" aria-hidden="true"></i>
                                            Apply JWT: Json web token</p>
                                        <p><i class="fa fa-check-square-o" aria-hidden="true"></i>
                                            Middleware: Check user login, User's role, ,etc...</p>
                                        <p><i class="fa fa-check-square-o" aria-hidden="true"></i>
                                            Apply Cookies and Bearer Token Header: To Identify user</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 col-12 col-sm-4">
                                <div className="react">
                                    <img src={reactjs} alt="" />
                                    <div className="contentItem p-4">
                                        <p><i class="fa fa-check-square-o" aria-hidden="true"></i>
                                            Pagination: Divide to page</p>
                                        <p><i class="fa fa-check-square-o" aria-hidden="true"></i>
                                            Clone Element: Adding multi role at the same time</p>
                                        <p><i class="fa fa-check-square-o" aria-hidden="true"></i>
                                            Use Ref: Pass from Parent down Child function</p>
                                        <p><i class="fa fa-check-square-o" aria-hidden="true"></i>
                                            React Context API: Replace Redux</p>
                                        <p><i class="fa fa-check-square-o" aria-hidden="true"></i>
                                            Customize Axios: Optimize call RESTful APIs</p>
                                        <p><i class="fa fa-check-square-o" aria-hidden="true"></i>
                                            Collaborate React and Bootstrap 5: Create Responsive UI </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 col-12 col-sm-4">
                                <div className="database">
                                    <img src={sql} alt="" />
                                    <div className="contentItem p-4">
                                        <p><i class="fa fa-check-square-o" aria-hidden="true"></i>
                                            How to Analysis and Design </p>
                                        <p><i class="fa fa-check-square-o" aria-hidden="true"></i>
                                            Decentralize user</p>
                                        <p><i class="fa fa-check-square-o" aria-hidden="true"></i>
                                            Use XAMPP: A free and open-source cross-platform web server solution stack package developed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}
