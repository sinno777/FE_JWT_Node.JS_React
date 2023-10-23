import React, { useEffect, useState } from 'react'
import './Users.scss'
import { fetchAllUser } from '../../services/userService';

export default function Users() {
    const [listUser, setListUser] = useState([]);
    useEffect(() => {
        fetchUser()
    }, []);

    const fetchUser = async () => {
        let response = await fetchAllUser()
        if (response && response.data && +response.data.EC === 0) {
            setListUser(response.data.DT)
        }
    }

    return (
        <div className='container'>
            <div className='manageUser_container'>
                <div className="user_header">
                    <div className="user_title">
                        <h1>Table Users: </h1>
                    </div>
                    <div className="user_action">
                        <button className='btn btn-success'>Refresh</button>
                        <button className='btn btn-primary'>Add new user</button>
                    </div>
                </div>
                <div className="user_body">
                    <table class="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Id</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Username</th>
                                <th scope="col">Group</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUser && listUser.length > 0 ?
                                <>
                                    {listUser.map((user, index) => {
                                        return (
                                            <tr key={`row-${index}`}>
                                                <th>{index + 1}</th>
                                                <td>{user.id}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phone}</td>
                                                <td>{user.username}</td>
                                                <td>{user.Group ? user.Group.name : ''}</td>
                                            </tr>
                                        )
                                    })}

                                </>
                                :
                                <><span>Not found user</span></>
                            }
                        </tbody>
                    </table>
                </div>
                <div className="user_footer">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}
