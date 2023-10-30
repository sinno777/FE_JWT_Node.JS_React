import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchGroups } from '../../services/userService';
import { toast } from 'react-toastify';
export default function ModalUser({ title, onHide, handleSave }) {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [sex, setSex] = useState("");

    const [groups, setGroups] = useState([]);
    useEffect(() => {
        setGroups(getGroups)
    }, []);
    let getGroups = async () => {
        let res = await fetchGroups()
        if (res && res.data && +res.data.EC === 0) {
            setGroups(res.data.DT)
        } else {
            toast.error(res.data.EM)
        }
    }
    return (
        <>
            <Modal size="lg" show={true} className='modal-user'>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Email: (<span className='red'>*</span>)</label>
                            <input type="email" className='form-control' placeholder="abc@gmail.com" />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Phone number: (<span className='red'>*</span>)</label>
                            <input type="email" className='form-control' placeholder="0923467222" />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Username: </label>
                            <input type="text" className='form-control' placeholder="Sinoo" />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Password: (<span className='red'>*</span>)</label>
                            <input type="password" className='form-control' placeholder="Your password" />
                        </div>
                        <div className='col-12 form-group'>
                            <label>Address: </label>
                            <input type="tel" className='form-control' placeholder="Your address" />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Gender: (<span className='red'>*</span>)</label>
                            <select className="form-select" >
                                <option defaultValue="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Order">Order Gender</option>
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Group: (<span className='red'>*</span>)</label>
                            <select className="form-select" >
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
                    <Button variant="danger" onClick={onHide}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
