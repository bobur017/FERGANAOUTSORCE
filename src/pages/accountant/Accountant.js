import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addAccountant, deleteAccountant, editAccountant, getAccountant} from "./AccountantReducer";
import {Button, Form, Modal, Row, Table} from "react-bootstrap";
import NavbarHeader from "../more/NavbarHeader";


function Accountant() {
    const [show, setShow] = useState(false);
    const [ageState, setAccountantStateState] = useState({id: '', name: ''});
    const [ages, setAccountantss] = useState([]);
    const handleClose = () => {
        setShow(false);
        setAccountantStateState({id: '', name: ''});
    };
    const handleShow = () => {
        setShow(true)
    };

    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const age = useSelector(state => state.age)


    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getAccountant());
            handleClose();
        }
    }, [age.result])

    useEffect(() => {
        setAccountantss(age.ages);
    }, [age.ages]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getAccountant());
        }
    }, [])

    const submitAccountant = (e) => {
        e.preventDefault();
        console.log(ageState,"ageState")
        if (ageState.id !== '') {
            dispatch(editAccountant(ageState));
        } else {
            dispatch(addAccountant(ageState))
        }
    }
    const onClickDepartment = (data, number) => {
        if (number === 1) {
            setAccountantStateState(data);
            handleShow();
        } else if (number === 2) {
            dispatch(deleteAccountant(data));
        }
    }


    const onChanges = (param) => (e) => {
        setAccountantStateState({...ageState, [param]: e.target.value});
    }

    return (
        <div className={'allMain'}>
            <NavbarHeader name={"Yosh toifalari bo'limi"} handleShow={handleShow}
                          buttonName={"Yosh toifasini_qo'shish"}/>
            <br/>
            <div className={'figma-card'}>
                <div className={'tableCalendar'}>
                    <table style={{color: 'black'}}>
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
                <Form onSubmit={submitAccountant}>
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

export default Accountant;
