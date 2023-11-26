import React, { useContext, useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash'
import { updateRole } from '../../services/roleService'
import { toast } from 'react-toastify';
import UserContext from "../Context/Context";

export default function ModalRole({ isShowModalUpdate, handleClose, dataModalUpdate, listRole }) {
    const urlRef = useRef()
    const { user } = useContext(UserContext);

    const defaultRoleData = {
        url: '', description: ''
    }
    const defaultValidInputs = {
        url: true,
        description: true,

    }
    const [roleData, setRoleData] = useState(defaultRoleData);
    const [validInput, setValidInput] = useState(defaultValidInputs);

    const handleOnchangeInput = (value, name) => {
        let _roleData = _.cloneDeep(roleData)
        _roleData[name] = value
        setRoleData(_roleData)
    }
    const checkValidate = () => {
        setValidInput(defaultValidInputs)
        //check 
        let check = true
        if (!roleData.url) {
            toast.error('Url none empty')
            setValidInput({ ...validInput, url: false })
            urlRef.current.focus()
            check = false
        }
        listRole.map(role => {
            if (role.url === roleData.url && role.id !== roleData.id) {
                toast.error('Url is duplicate')
                urlRef.current.focus()
                setValidInput({ ...validInput, url: false })
                check = false
                return check
            }
        })
        return check
    }

    const handleSave = () => {
        let check = checkValidate()
        if (check) {
            if (user && user.isAuthenticated) {
                toast.success('Update role success!')
            }
            console.log(user)
            updateRole({ ...roleData })
            setRoleData(defaultRoleData)
            handleClose()
        }
    }
    const handleCloseRole = () => {
        handleClose()
        setRoleData(defaultRoleData)
        setValidInput(defaultValidInputs)
    }
    useEffect(() => {
        setRoleData({ ...dataModalUpdate })
    }, [dataModalUpdate]);
    return (
        <div className='modalRole-container'>
            <Modal show={isShowModalUpdate} onHide={handleCloseRole} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update role form: </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='form-container'>
                        <div className="mb-3">
                            <label htmlFor="urlId">Url: </label>
                            <input id='urlId' ref={urlRef} type="text" className={validInput.url ? "form-control" : 'form-control is-invalid'} placeholder='Your url'
                                value={roleData.url}
                                onChange={(e) => handleOnchangeInput(e.target.value, 'url')}
                            />
                            <div className="form-text">Format: /abc/xyz</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="descId">Description: </label>
                            <input id='descId' type="text" className="form-control" placeholder='Your description'
                                value={roleData.description}
                                onChange={(e) => handleOnchangeInput(e.target.value, 'description')}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleCloseRole()}>
                        Close
                    </Button>
                    <Button variant="warning" onClick={() => handleSave()}>
                        Update Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
