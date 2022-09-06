import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { GrNewWindow } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux';
import Address from '../address/Address';
import { addRegionDepartment } from './RegionDepartmentReducer';


function RegionDepartment() {
    const [show, setShow] = useState(false);
    const [department, setDepartment] = useState({ id: '', name: '', districtId: '' });
    const dispatch = useDispatch();
    const departmentReduser = useSelector(state => state.department)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    useEffect(() => {

    }, [])

    const getDistrict = (data) => {
        setDepartment({ ...department, "districtId": data.id })
    }
    const submitdepartment = (e) => {
        e.preventDefault();
        if (department.id !== '') {

        } else {
            dispatch(addRegionDepartment({ id: 49, name: 'a', districtId: '79' }))
            // dispatch(addRegionDepartment(department))
        }
    }

    const onChanges = (param) => (e) => {
        setDepartment({ ...department, [param]: e.target.value });
    }

    return (
        <div>
            <Row className='justify-content-center text-center'>
                <Col xs={2} sm={2} md={2} lg={2} xl={2} className='my-shadow-style my-hover d-flex shadow border-dark' onClick={handleShow}>
                    <div style={{ width: 40 }} >
                        <GrNewWindow size='small' />
                    </div>
                    <div>Boshqarma qo'shish</div>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={submitdepartment}>
                    <Modal.Header closeButton>
                        <Modal.Title>{ }</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control name='name' required value={department.name} onChange={onChanges("name")} placeholder="Nomi " />
                        <br />
                        <Address district={getDistrict} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Ortga
                        </Button>
                        <Button variant="primary" type='submit'>
                            Tayyor
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default RegionDepartment;