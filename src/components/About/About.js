import React from 'react'
import './About.scss'
import { avtSuit, AnhKhoa } from '../../image/index'
import { Link } from 'react-router-dom'
export default function About() {
    return (
        <div className='about-container text-white'>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-4">
                        <div className="avatar">
                            <img src={avtSuit} alt="Sinoo" />
                            <hr />
                            <div className="link-connect d-flex justify-content-around p-1 p-md-4">
                                <div className="link-item">
                                    <a href="https://www.facebook.com/profile.php?id=100081069091771" target='blank' ><i className="fa fa-facebook" aria-hidden="true"></i></a>
                                </div>
                                <div className="link-item">
                                    <a href="https://github.com/sinno777?tab=repositories" target='blank' ><i className="fa fa-github" aria-hidden="true"></i></a>
                                </div>
                                <div className="link-item">
                                    <a href="https://www.linkedin.com/in/khoa-sinnoo-a763a122b/" target='blank' ><i className="fa fa-linkedin" aria-hidden="true"></i></a></div>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className="col-12 col-sm-8">
                        <div className="content-right">
                            <Link to={AnhKhoa} target="_blank" download><span className='link-cv fs-4 fw-light text-decoration-underline text-success'><i className="fa fa-download mx-2" aria-hidden="true"></i> <i>#My CV</i></span></Link>
                            <h2>Nguyen Tran Anh Khoa (KhoaSinoo)</h2>
                            <p>Second-year student ~ Major: Information of Technology</p>
                            <hr />
                            <b>Hi there...</b>
                            <p>I'm Nguyen Tran Anh Khoa and current a <i className='text-warning'>Second-year student <i className="fa fa-graduation-cap" aria-hidden="true"></i></i>, learned at Can Tho city with my school is <a href="https://ctuet.edu.vn/" target="_blank" rel="noopener noreferrer" className='text-warning'><b>Can Tho University Of Technology <i className="fa fa-university" aria-hidden="true"></i></b></a>. When I'm a Second-year student, I learned How to code a page with both Client and Server side (Frontend & Backend). In addition, I knew How to deploy my web.</p>
                            <h5>Tech Skills: </h5>
                            <p><i className="fa fa-leaf text-success" aria-hidden="true"></i> Frontend: ReactJs, Scss,..</p>
                            <p><i className="fa fa-leaf text-success" aria-hidden="true"></i> Backend: Javascript với Node.js,...</p>
                            <p><i className="fa fa-leaf text-success" aria-hidden="true"></i> Others: <i className="fa fa-git" aria-hidden="true"></i>, Bootstrap, JWT,... </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
