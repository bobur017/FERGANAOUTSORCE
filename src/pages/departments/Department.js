import React, {useEffect, useRef, useState, useMemo} from 'react';
import {Button, Col, Container, Form, Modal, Row, Table} from 'react-bootstrap';
import {GrAdd, GrNewWindow} from 'react-icons/gr'
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import Address from '../address/Address';
import {
    addDepartment,
    addRegionDepartment, deleteDepartment,
    deleteRegionDepartment, editDepartment,
    editRegionDepartment, getDepartment,
    getRegionDepartment
} from './RegionDepartmentReducer';
import NavbarHeader from "../more/NavbarHeader";


function RegionDepartment() {
    const [department, setDepartment] = useState({id: '', name: '', regionId: ''});
    const dispatch = useDispatch();
    const [departments, setDepartments] = useState([]);
    const departmentReducer = useSelector(state => state.department);
    const firstUpdate = useRef(true);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setDepartment({id: '', name: '', regionId: ''});
        setShow(false)
    };
    const handleShow = () => setShow(true);


    useEffect(() => {
        if (!firstUpdate.current) {
            dispatch(getDepartment());
            handleClose();
        }

    }, [departmentReducer.result]);


    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            dispatch(getDepartment());
            console.log("useEffect1", firstUpdate.current);
        } else {
            console.log("useEffect2", firstUpdate.current);
        }
    }, []);

    useEffect(() => {
        setDepartments(departmentReducer.departments);
    }, [departmentReducer.departments])

    const getDistrict = (data) => {
        setDepartment({...department, "districtId": data.id})
    }

    const submitdepartment = (e) => {
        e.preventDefault();
        if (department.id !== '') {
            dispatch(editDepartment(department));
        } else {
            dispatch(addDepartment(department))
        }
    }

    const onChanges = (param) => (e) => {
        setDepartment({...department, [param]: e.target.value});
    }

    const onClickDepartment = (data, number) => {
        if (number === 1) {
            setDepartment(data);
            handleShow();
        } else if (number === 2) {
            dispatch(deleteDepartment(data));
        }
    }

    return (
        <div className={'allMain'}>
            <NavbarHeader buttonName={"Bo'lim qo'shish"} name={"Bo'linmalar"} handleShow={handleShow}/>
            <div className={'figma-card mt-3'}>
                <div className={'tableCalendar'}>
                    <table style={{color: 'black'}}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Nomi</th>
                            <th>Manzili</th>
                            <th>O'zgartirish</th>
                            <th>O'chirish</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            departments?.map((item, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.districtName}</td>
                                    <td>
                                        <Button variant='outline-info' size='sm'
                                                onClick={() => onClickDepartment(item, 1)}>
                                            O'zgartirish
                                        </Button>
                                    </td>
                                    <td>
                                        <Button variant='outline-danger' size='sm'
                                                onClick={() => onClickDepartment(item, 2)}>
                                            O'chirish
                                        </Button>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={submitdepartment}>
                    <Modal.Header closeButton>
                        <Modal.Title>{department.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control name='name' required value={department.name} onChange={onChanges("name")}
                                      placeholder="Nomi "/>
                        <br/>
                        <Address view={true} district={getDistrict}/>
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