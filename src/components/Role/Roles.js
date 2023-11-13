import React, { useEffect, useState } from 'react'
import './Roles.scss'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

export default function Roles() {
    const [listChild, setListChild] = useState({
        child1: { url: '', description: '' }
    });

    const handleOnchangeInput = (name, value, key) => {
        let _listChild = _.cloneDeep(listChild)
        _listChild[key][name] = value
        setListChild(_listChild)
    }
    const handleAddNewInput = () => {
        let _listChild = _.cloneDeep(listChild)
        _listChild[`child-${uuidv4()}`] = {
            url: '', description: ''
        }
        setListChild(_listChild)
    }
    useEffect(() => {
        Object.entries(listChild).map(([key, child], i) => {
            console.log([key, child.url, child.description])
        })
    });
    return (
        <div className='role-container'>
            <div className="container">
                <div className="mt-3">
                    <div className="title-role mt-3"><h2>Add new Roles:</h2></div>
                    <div className="role-parent">
                        {Object.entries(listChild).map(([key, child], i) => {
                            return (
                                <div className="row role-child" key={`child-${key}`}>
                                    <div className={`col-5 form-group ${key}`}>
                                        <label >Url:</label>
                                        <input type="text"
                                            className='form-control'
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
                                        {i >= 1 && <i className="fa fa-trash-o text-danger fs-2" ></i>}

                                    </div>
                                </div>
                            )
                        })}
                        <div>
                            <button className='btn btn-primary mt-3'>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
