import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createNewUser, fetchGroups } from '../../services/userService';
import { toast } from 'react-toastify';
import _ from 'lodash'
export default function ModalUser({ action, onHide, isshowModalUser, dataModalUser }) {

    const emailRef = useRef()
    const phoneRef = useRef()
    const passwordRef = useRef()

    const [groups, setGroups] = useState([]);

    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        group: '',
    }
    const defaultValidInputs = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        group: true,
    }
    const [userData, setUserData] = useState(defaultUserData);
    const [validInput, setValidInput] = useState(defaultValidInputs);
    useEffect(() => {
        setGroups(getGroups)

    }, []);
    useEffect(() => {
        if (action === 'EDIT') {
            setUserData({ ...dataModalUser, group: dataModalUser.Group ? dataModalUser.Group.id : '' })
        }
    }, [dataModalUser, action]);
    useEffect(() => {
        if (action === 'CREATE') {
            if (groups && groups.length > 0)
                setUserData({ ...userData, group: groups[0].id })
        }
    }, [action]);
    let getGroups = async () => {
        let res = await fetchGroups()
        if (res && res.data && +res.data.EC === 0) {
            setGroups(res.data.DT)
            if (res.data.DT && res.data.DT.length > 0) {
                let groups = res.data.DT
                setUserData({ ...userData, group: groups[0].id })
            }
        } else {
            toast.error(res.data.EM)
        }
    }

    const handleOnchangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData)
        _userData[name] = value
        setUserData(_userData)
    }

    const checkValidate = () => {
        //create user
        setValidInput(defaultValidInputs)
        //check 
        let arr = ['email', 'phone', 'password', 'group']
        let check = true
        for (let i = 0; i < arr.length; i++) {
            //focus
            if (arr[i] === 'email') {
                emailRef.current.focus()
            } else if (arr[i] === 'phone') {
                phoneRef.current.focus()
            } else if (arr[i] === 'password') {
                action === 'CREATE' && passwordRef.current.focus()
            }
            //check
            if (!userData[arr[i]]) {
                let _validInput = _.cloneDeep(defaultValidInputs)
                _validInput[arr[i]] = false
                setValidInput(_validInput)
                toast.error(`Empty input ${arr[i]}`)
                check = false
                break
            }
        }
        return check
    }

    const handleSave = async () => {
        let check = checkValidate()
        if (check) {
            let res = await createNewUser({ ...userData, groupId: userData['group'] })
            if (res.data && res.data.EC === 0) {
                onHide()
                setUserData({ ...defaultUserData, group: groups[0].id })
                toast.success("Success create new user")
            } else {
                if (res.data && +res.data.EC !== 0) {
                    toast.error(res.data.EM)
                    let _validInput = _.cloneDeep(defaultValidInputs)
                    _validInput[res.data.DT] = false
                    setValidInput(_validInput)
                    if (res.data.DT === 'email') emailRef.current.focus()
                    if (res.data.DT === 'phone') phoneRef.current.focus()
                }
                // if (res.data && res.data.EM === 'Email invalid') {
                //     toast.error(res.data.EM)
                //     let _validInput = _.cloneDeep(userData)
                //     _validInput['email'] = false
                //     setValidInput(_validInput)
                //     emailRef.current.focus()
                // }
            }
        }

    }
    const handleCloseUser = () => {
        onHide()
        setUserData(defaultUserData)
        setValidInput(defaultValidInputs)
    }
    return (
        <>
            <Modal show={isshowModalUser} onHide={() => handleCloseUser()} size="lg" className='modal-user'>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {action === 'CREATE' ? 'Create new user' : 'Edit user'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Email: (<span className='red'>*</span>)</label>
                            <input disabled={action === 'EDIT' ? true : false} ref={emailRef} type="email" className={validInput.email ? 'form-control' : 'form-control is-invalid'} placeholder="abc@gmail.com" value={userData.email} onChange={(e) => handleOnchangeInput(e.target.value, 'email')} />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Phone number: (<span className='red'>*</span>)</label>
                            <input disabled={action === 'EDIT' ? true : false} ref={phoneRef} type="text" className={validInput.phone ? 'form-control' : 'form-control is-invalid'} placeholder="0923467222" value={userData.phone} onChange={(e) => handleOnchangeInput(e.target.value, 'phone')} />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Username: </label>
                            <input type="text" className='form-control' placeholder="Sinoo" value={userData.username} onChange={(e) => handleOnchangeInput(e.target.value, 'username')} />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            {action === 'CREATE' &&
                                <>
                                    <label>Password: (<span className='red'>*</span>)</label>
                                    <input ref={passwordRef} type="password" className={validInput.password ? 'form-control' : 'form-control is-invalid'} placeholder="Your password" value={userData.password} onChange={(e) => handleOnchangeInput(e.target.value, 'password')} />
                                </>
                            }
                        </div>
                        <div className='col-12 form-group'>
                            <label>Address: </label>
                            <input type="tel" className='form-control' placeholder="Your address" value={userData.address} onChange={(e) => handleOnchangeInput(e.target.value, 'address')} />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Gender: (<span className='red'>*</span>)</label>
                            <select className="form-select"
                                onChange={(e) => handleOnchangeInput(e.target.value, 'sex')}
                                value={userData.sex = !userData.sex ? 'Male' : userData.sex}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Order">Order Gender</option>
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Group: (<span className='red'>*</span>)</label>
                            <select className={validInput.group ? 'form-select' : 'form-select is-invalid'}
                                onChange={(e) => handleOnchangeInput(e.target.value, 'group')}
                                value={userData.group}
                            >
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
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleCloseUser()}>Close</Button>
                    <Button variant={action === "CREATE" ? 'primary' : 'warning'}
                        onClick={() => handleSave()}>
                        {action === "CREATE" ? 'Save' : 'Update'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
