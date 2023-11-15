import React, { useEffect, useState } from 'react'
import './GroupRole.scss'
import { fetchGroups } from '../../services/userService';
import { toast } from 'react-toastify';
import { fetchAllRole, fetchRolesByGroup } from '../../services/roleService'
import _ from 'lodash'
export default function GroupRole() {
    const [groups, setGroups] = useState([]);
    const [selectGroup, setSelectGroup] = useState("");
    const [listRole, setListRole] = useState([]);
    const [assignRolesByGroup, setAssignRolesByGroup] = useState([]);
    useEffect(() => {
        getGroups()
        getAllRole()
    }, []);
    let getGroups = async () => {
        let res = await fetchGroups()
        if (res && +res.EC === 0) {
            setGroups(res.DT)

        } else {
            toast.error(res.EM)
        }
    }
    const getAllRole = async () => {
        let data = await fetchAllRole()
        if (data && data.EC === 0) {
            setListRole(data.DT)
        } else {
            toast.error(data.EM)
        }
    }

    const handleOnchangeGroup = async (groupId) => {
        setSelectGroup(groupId)
        if (groupId) {
            let data = await fetchRolesByGroup(groupId)
            if (data && data.EC === 0) {
                let result = buildDataRolesByGroup(data.DT.Roles, listRole)
                setAssignRolesByGroup(result)
            }
        }
    }
    const buildDataRolesByGroup = (groupRoles, listRole) => {
        let result = []
        if (listRole && listRole.length > 0) {
            listRole.map((role) => {
                let obj = {}
                obj.id = role.id
                obj.url = role.url
                obj.description = role.description
                obj.isAssigned = false
                if (groupRoles && groupRoles.length > 0) {
                    obj.isAssigned = groupRoles.some((roleItem) => roleItem.url === obj.url)
                }
                result.push(obj)
            })
        }
        return result
    }
    const handleSelectRole = (id) => {
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup)
        let foundIndex = _assignRolesByGroup.findIndex(item => +item.id === +id)
        if (+foundIndex > -1) {
            _assignRolesByGroup[foundIndex].isAssigned = !_assignRolesByGroup[foundIndex].isAssigned
            console.log(foundIndex)
            console.log(_assignRolesByGroup)
        }
        setAssignRolesByGroup(_assignRolesByGroup)
    }
    return (
        <div className='group-role-container'>
            <div className="container">
                <div className="container mt-3">
                    <h3>Group Role: </h3>
                    <div className='assign-group-role'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Select Group: (<span className='red'>*</span>)</label>
                            <select className={'form-select'}
                                onChange={(e) => handleOnchangeGroup(e.target.value)}
                            >
                                <option value="">Please select your Group: </option>
                                {groups.length > 0 &&
                                    groups.map((group, index) => {
                                        return (
                                            <option key={`group-${group.id}`} value={group.id}
                                            >{group.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        {selectGroup &&
                            <>
                                <hr />
                                <div className='roles'>
                                    <h4>Assign Roles: </h4>
                                    {assignRolesByGroup && assignRolesByGroup.length > 0 &&
                                        assignRolesByGroup.map((role, index) => {
                                            return (
                                                <div className="form-check" key={`list-role ${index}`}>
                                                    <input className="form-check-input" type="checkbox"
                                                        value={role.id}
                                                        id={`list-role ${index}`}
                                                        checked={role.isAssigned}
                                                        onChange={(e) => handleSelectRole(e.target.value)}
                                                    />
                                                    <label className="form-check-label" htmlFor={`list-role ${index}`}>
                                                        {role.url}
                                                    </label>
                                                </div>
                                            )
                                        })}
                                </div>
                                <div className='mt-3'>
                                    <button className='btn btn-warning'>Save</button>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
