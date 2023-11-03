import React, { useEffect, useState } from 'react'
import './Users.scss'
import { deleteUser, fetchAllUser } from '../../services/userService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalDeleteConfirm from './ModalDeleteComfirm';
import ModalUser from './ModalUser';


export default function Users() {
    const [listUser, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    //modal delete
    const [isshowModal, setIsshowModal] = useState(false);
    const [dataModal, setDataModal] = useState({});
    //modal edit
    const [isshowModalUser, setIsshowModalUser] = useState(false);
    const [actionModalUser, setActionModalUser] = useState("CREATE");
    const [dataModalUser, setDataModalUser] = useState({});
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
    const onHideModalUser = async () => {
        setIsshowModalUser(false)
        setDataModalUser({})
        await fetchUser()
    }
    const handleEdit = (user) => {
        setActionModalUser("EDIT")
        setDataModalUser(user)
        setIsshowModalUser(true)
    }



    return (
        <>
            <div className='container'>
                <div className='manageUser_container'>
                    <div className="user_header my-2">
                        <div className="user_title">
                            <h1>Manage Users: </h1>
                        </div>
                        <div className="user_action">
                            <button className='btn btn-success mx-2'
                                onClick={() => fetchUser()}
                            >
                                <i class="fa fa-refresh px-2 fs-5" aria-hidden="true"></i>
                                <span>Refresh</span></button>
                            <button className='btn btn-primary'
                                onClick={() => {
                                    setIsshowModalUser(true);
                                    setActionModalUser("CREATE")
                                }}
                            >
                                <i class="fa fa-plus-circle px-2 fs-5" aria-hidden="true"></i>
                                <span>Add new User</span></button>
                        </div>
                    </div>
                    <div className="user_body my-3">
                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                                <tr className='text-center fs-5'>
                                    <th scope="col" className='w-auto'>No</th>
                                    <th scope="col">Id</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Group</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUser && listUser.length > 0 ?
                                    <>
                                        {listUser.map((user, index) => {
                                            return (
                                                <tr key={`row-${index}`} className='user-tableRow'>
                                                    <th className='text-center'>{currentLimit * (currentPage - 1) + index + 1}</th>
                                                    <td>{user.id}</td>
                                                    <td className='text-start'>{user.email}</td>
                                                    <td className='text-start'>{user.phone}</td>
                                                    <td>{user.username}</td>
                                                    <td>{user.Group ? user.Group.name : ''}</td>
                                                    <td>
                                                        <button
                                                            title='Update'
                                                            className='btn btn-warning mx-2 user-update'
                                                            onClick={() => handleEdit(user)}
                                                        >
                                                            <i className="fa fa-pencil-square-o fs-5" aria-hidden="true"></i>
                                                        </button>
                                                        <button
                                                            title='Delete'
                                                            className='btn btn-danger user-delete'
                                                            onClick={() => handleDelete(user)}
                                                        >
                                                            <i className="fa fa-trash-o fs-5 text-white" aria-hidden="true"></i>
                                                        </button>
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

            <ModalUser
                onHide={onHideModalUser}
                isshowModalUser={isshowModalUser}
                action={actionModalUser}
                dataModalUser={dataModalUser}

            />

        </>
    )
}
