import React, { useEffect, useRef, useState } from 'react'
import './Roles.scss'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import { toast } from 'react-toastify';
import { createNewRoles } from '../../services/roleService'
import TableRoles from './TableRoles'
export default function Roles() {
    const childRef = useRef();
    const childDefault = { url: '', description: '', isValidUrl: true }
    const [listChild, setListChild] = useState({
        child1: childDefault
    });

    const handleOnchangeInput = (name, value, key) => {
        let _listChild = _.cloneDeep(listChild)
        _listChild[key][name] = value
        if (value && name === 'url') {
            _listChild[key]['isValidUrl'] = true
        }
        setListChild(_listChild)
    }
    const handleAddNewInput = () => {
        let _listChild = _.cloneDeep(listChild)
        _listChild[`child-${uuidv4()}`] = childDefault
        setListChild(_listChild)
    }
    const handleDelete = (key) => {
        toast.success('Delete success')
        let _listChild = _.cloneDeep(listChild)
        delete _listChild[key]
        setListChild(_listChild)
    }
    const handleSave = async () => {
        let invalidObj = Object.entries(listChild).find(([key, child], i) => {
            return child && !child.url // return child if child's url is null
        })
        if (!invalidObj) {
            //cal api
            let data = buildDataPersist()
            console.log('>>>>>Check data to build: ', data)
            let res = await createNewRoles(data)
            if (res && +res.EC === 0) {
                toast.success(res.EM)
                childRef.current.fetchListRoleAgain()
            } else {
                toast.error(res.EM)
            }
        } else {
            toast.error('Input URL must not be empty!')
            let _listChild = _.cloneDeep(listChild)
            let key = invalidObj[0]
            _listChild[key]['isValidUrl'] = false
            setListChild(_listChild)
        }
    }
    const buildDataPersist = () => {
        let _listChild = _.cloneDeep(listChild)
        let result = []
        Object.entries(_listChild).map(([key, child], i) => {
            result.push({
                url: child.url,
                description: child.description
            })
        })
        return result
    }

    return (
        <div className='role-container'>
            <div className="container">
                <div className="add-roles mt-3">
                    <div className="title-role mt-3"><h2>Add new Roles:</h2></div>
                    <div className="role-parent">
                        {Object.entries(listChild).map(([key, child], i) => {
                            return (
                                <div className="row role-child" key={`child-${key}`}>
                                    <div className={`col-5 form-group ${key}`}>
                                        <label >Url:</label>
                                        <input type="text"
                                            className={child.isValidUrl ? 'form-control' : 'form-control is-invalid'}
                                            value={child.url}
                                            onChange={(e) => handleOnchangeInput('url', e.target.value, key)}
                                        />
                                    </div>
                                    <div className='col-5 form-group'>
                                        <label >Description:</label>
                                        <input type="text"
                                            className='form-control'
                                            value={child.description}
                                            onChange={(e) => handleOnchangeInput('description', e.target.value, key)}

                                        />
                                    </div>
                                    <div className="col-2 action mt-4 py-1">
                                        {i === 0 &&
                                            <i className="fa fa-plus-circle text-success fs-2"
                                                onClick={() => handleAddNewInput()}
                                            ></i>}
                                        {i >= 1 && <i className="fa fa-trash-o text-danger fs-2"
                                            onClick={() => handleDelete(key)}
                                        ></i>}

                                    </div>
                                </div>
                            )
                        })}
                        <div>
                            <button className='btn btn-primary mt-3' onClick={() => handleSave()}>Save</button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="list-role mt-3">
                    <h3>List Current Role</h3>
                    <TableRoles ref={childRef} />
                </div>
            </div>
        </div>
    )
}
