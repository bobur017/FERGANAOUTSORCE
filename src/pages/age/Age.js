import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addAge, deleteAge, editAge, getAge} from "./AgeReducer";
import {Button, Col, Form, Modal, Row, Table} from "react-bootstrap";
import {GrAdd} from "react-icons/gr";
import Address from "../address/Address";
import {addRegionDepartment, deleteRegionDepartment, editRegionDepartment} from "../sidebar/RegionDepartmentReducer";

function Age() {
    const [show, setShow] = useState(false);
    const [ageState, setAgeState] = useState({id:'',name:''});
    const [ages, setAges] = useState([]);
    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => setShow(true);


    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const age = useSelector(state => state.age )

    useEffect(()=>{
        if (!firstUpdate){
            firstUpdate.current = true;
            dispatch(getAge());
        }
    },[])

    useEffect(()=>{
        if (firstUpdate){
            dispatch(getAge());
            handleClose();
        }
    },[age.result])

    useEffect(()=>{
       setAges(age.ages);
    },[age.ages]);

    const submitAge = (e) => {
        e.preventDefault();
        if (ageState.id !== '') {
            dispatch(editAge(ageState));
        } else {
            dispatch(addAge(ageState))
        }
    }
    const onClickDepartment = (data, number) => {
        if (number === 1) {
            setAgeState(data);
            handleShow();
        } else if (number === 2) {
            dispatch(deleteAge(data));
        }
    }


    const onChanges = (param) => (e) => {
        setAgeState({...ageState, [param]: e.target.value});
    }

    return (
        <div>
            <Row className='bottom-line justify-content-end text-center'>
                <Col xs={12} sm={12} md={7} lg={9} xl={9} style={{fontSize: 25}}>
                    Yosh toifalalari bo'limi
                </Col>
                <Col md={3} lg={2} xl={2} className='d-flex justify-content-center' onClick={handleShow}>
                    <Button variant='info' size={'sm'} className='iconTextPosition d-flex'>
                        <div className={'my-icons'}><GrAdd size={23} color={'#ffffff'}/></div>
                        <span style={{marginLeft: 5,width:'8rem'}}>Yosh toifasi qo'shish</span>
                    </Button>
                </Col>
            </Row>
            <br/>
            <Table bordered size='sm' className='text-center'>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Nomi</th>
                    <th>O'zgartirish</th>
                    <th>O'chirish</th>
                </tr>
                </thead>
                <tbody>
                {
                    ages?.map((item, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>

                            <td>
                                <Button variant='outline-info' size='sm' onClick={() => onClickDepartment(item, 1)}>
                                    O'zgartirish
                                </Button>
                            </td>
                            <td>
                                <Button variant='outline-danger' size='sm' onClick={() => onClickDepartment(item, 2)}>
                                    O'chirish
                                </Button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={submitAge}>
                    <Modal.Header closeButton>
                        <Modal.Title>{ageState.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control name='name' required value={ageState.name} onChange={onChanges("name")}
                                      placeholder="Nomi "/>
                        <br/>
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

export default Age;