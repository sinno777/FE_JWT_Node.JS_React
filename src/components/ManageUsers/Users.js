import React, { useEffect, useState } from 'react'
import './Users.scss'
import { deleteUser, fetchAllUser } from '../../services/userService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalDeleteConfirm from './ModalDeleteComfirm';


export default function Users() {
    const [listUser, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);
    const [isshowModal, setIsshowModal] = useState(false);
    const [dataModal, setDataModal] = useState({});
    useEffect(() => {
        fetchUser()
    }, [currentPage]);

    const fetchUser = async () => {
        let response = await fetchAllUser(currentPage, currentLimit)
        if (response && response.data && +response.data.EC === 0) {
            setTotalPages(response.data.DT.totalPerPages)
            setListUser(response.data.DT.users)
        }
    }
    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1)
    }

    const handleDelete = async (user) => {
        setDataModal(user)
        setIsshowModal(true)
    }

    const handleClose = () => {
        setIsshowModal(false)
        setDataModal({})
    }
    const handleConfirm = async () => {
        let response = await deleteUser(dataModal)
        if (response && response.data.EC === 0) {
            toast.success(response.data.EM)
            await fetchUser()
            setIsshowModal(false)
        } else {
            toast.error(response.data.EM)
        }
    }
    return (
        <>
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
                        <table className="table table-bordered table-striped table-hover">
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
                                                    <td>
                                                        <button className='btn btn-warning mx-2'>Edit</button>
                                                        <button className='btn btn-danger'
                                                            onClick={() => handleDelete(user)}
                                                        >Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}

                                    </>
                                    :
                                    <><tr><td>Not found user</td></tr></>
                                }
                            </tbody>
                        </table>
                    </div>
                    {/* totalPages > 0 when fetch success */}
                    {totalPages > 0 &&
                        <div className="user_footer">
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={2}
                                marginPagesDisplayed={2}
                                pageCount={totalPages}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    }
                </div>
            </div>
            <ModalDeleteConfirm
                isshowModal={isshowModal}
                handleClose={handleClose}
                handleConfirm={handleConfirm}
                dataModal={dataModal}
            />
        </>
    )
}
