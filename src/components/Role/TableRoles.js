import React, { useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react'
import { deleteRole, fetchAllRole } from '../../services/roleService'
import { toast } from 'react-toastify';
import './TableRoles.scss'
const TableRoles = (props, ref) => {
    const [listRole, setListRole] = useState([]);

    const handleEdit = (roles) => {

    }
    const handleDelete = async (roles) => {
        let data = await deleteRole(roles)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            await getAllByRole()
        } else {
            toast.error(data.EM)
        }
    }
    const getAllByRole = async () => {
        let data = await fetchAllRole()
        if (data && data.EC === 0) {
            setListRole(data.DT)
        } else {
            toast.error(data.EM)
        }
    }
    useEffect(() => {
        getAllByRole()
    }, []);
    useImperativeHandle(ref, () => ({

        fetchListRoleAgain() {
            getAllByRole()
        }

    }));



    return (
        <div className='tableRoles-container'> <table className="table table-bordered table-striped table-hover">
            <thead>
                <tr className='text-center fs-5'>
                    <th scope="col">Id</th>
                    <th scope="col">URL</th>
                    <th scope="col">Description</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {listRole && listRole.length > 0 ?
                    <>
                        {listRole.map((role, index) => {
                            return (
                                <tr key={`row-${index}`} className='role-tableRow'>
                                    <td className='text-center'>{role.id}</td>
                                    <td className='text-start'>{role.url}</td>
                                    <td className='text-start'>{role.description}</td>
                                    <td className='text-center'>
                                        <button
                                            title='Update'
                                            className='btn btn-warning mx-2 role-update'
                                            onClick={() => handleEdit(role)}
                                        >
                                            <i className="fa fa-pencil-square-o fs-5" aria-hidden="true"></i>
                                        </button>
                                        <button
                                            title='Delete'
                                            className='btn btn-danger role-delete '
                                            onClick={() => handleDelete(role)}
                                        >
                                            <i className="fa fa-trash-o fs-5 text-white" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </>
                    :
                    <><tr><td colSpan={5} className='text-center'>Not found role</td></tr></>
                }
            </tbody>
        </table></div>
    )
}

export default forwardRef(TableRoles)