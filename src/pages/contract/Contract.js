import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addContract, deleteContract, editContract, getContract} from "./ContractReducer";
import {Button, Form, Modal, Row, Table} from "react-bootstrap";
import NavbarHeader from "../more/NavbarHeader";
import {useNavigate} from "react-router-dom";


function Contract() {
    const [show, setShow] = useState(false);
    const [contractState, setContractState] = useState({id: '', name: ''});
    const [contracts, setContracts] = useState([]);
    const handleClose = () => {
        setShow(false);
        setContractState({id: '', name: ''});
    };
    const handleShow = () => {
        setShow(true)
    };
    const history = useNavigate();

    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const contract = useSelector(state => state.contract)


    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getContract());
            handleClose();
        }
    }, [contract.result])

    useEffect(() => {
        setContracts(contract.contracts);
    }, [contract.contracts]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getContract());
        }
    }, [])

    const submitContract = (e) => {
        e.preventDefault();
        if (contractState.id !== '') {
            dispatch(editContract(contractState));
        } else {
            dispatch(addContract(contractState))
        }
    }
    const onClickDepartment = (data, number) => {
        if (number === 1) {
            setContractState(data);
            handleShow();
        } else if (number === 2) {
            dispatch(deleteContract(data));
        }
    }


    const onChanges = (param) => (e) => {
        setContractState({...contractState, [param]: e.target.value});
    }

    const route = () => {
        history("/sidebar/create-contract")
    }

    return (
        <div className={'allMain'}>
            <NavbarHeader name={"Shartnomalar bo'limi"} handleShow={route}
                          buttonName={"Shartnoma tuzish"}/>
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
                            contracts?.list?.map((item, index) =>
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
                <Form onSubmit={submitContract}>
                    <Modal.Header closeButton>
                        <Modal.Title>{contractState.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control name='name' required value={contractState.name} onChange={onChanges("name")}
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

export default Contract;