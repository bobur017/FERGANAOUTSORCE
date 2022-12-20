import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    addContract,
    contractVerified,
    deleteContract,
    editContract,
    getContract,
    getContractOne
} from "./ContractReducer";
import {Button, Form, Modal, Row, Table} from "react-bootstrap";
import NavbarHeader from "../more/NavbarHeader";
import {useNavigate} from "react-router-dom";
import {TimestampToInputDate} from "../funcs/Funcs";
import {MdDeleteForever} from "react-icons/md";
import DropdownCustom from "../more/DropdownCustom";


function Contract() {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [contractState, setContractState] = useState({id: '', name: ''});
    const [contracts, setContracts] = useState([]);
    const handleClose = () => {
        setShow(false);
        setContractState({id: '', name: ''});
    };
    const handleClose2 = () => {
        setShow2(false);
    };
    const handleShow = () => {
        setShow(true)
    };
    const handleShow2 = (id) => {
        dispatch(getContractOne(id));
        setShow2(true)
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


    const totalByProduct = (index) => {
        let total = 0;
        contract.contract?.kindergartenContractList?.forEach((kin) =>
            total += parseInt(kin?.productContracts[index]?.weight)
        );
        return total;
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
                            <th>Shartnomachi</th>
                            <th>LOT raqami</th>
                            <th>Shartnoma raqami</th>
                            <th>Umumiy summasi</th>
                            <th>Holati</th>
                            <th>Boshlanish sanasi</th>
                            <th>Tugash sanasi</th>
                            <th>Tasdiqlash</th>
                            <th>O'zgartirish</th>
                            <th>O'chirish</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            contracts?.list?.map((item, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td style={{cursor: 'pointer'}}
                                        onClick={() => handleShow2(item.id)}>{item?.supplierName}</td>
                                    <td style={{cursor: 'pointer'}}
                                        onClick={() => handleShow2(item.id)}>{item?.lotNumber}</td>
                                    <td style={{cursor: 'pointer'}}
                                        onClick={() => handleShow2(item.id)}>{item?.number}</td>
                                    <td>{item?.totalSum}</td>
                                    <td>{item?.status}</td>
                                    <td>{TimestampToInputDate(item?.startDay)}</td>
                                    <td>{TimestampToInputDate(item?.endDay)}</td>
                                    <td>
                                        {item?.status === "YANGI" ? <Button variant='outline-success' size='sm'
                                                                            onClick={() => dispatch(contractVerified(item.id))}>
                                            Tasdiqlash
                                        </Button> : null}
                                    </td>
                                    <td>
                                        {item?.status === "YANGI" ? <Button variant='outline-info' size='sm'
                                                                            onClick={() => history("/sidebar/edit-contract/" + item?.id)}>
                                            O'zgartirish
                                        </Button> : null}
                                    </td>
                                    <td>
                                        {item?.status === "YANGI" ? <Button variant='outline-danger' size='sm'
                                                                            onClick={() => onClickDepartment(item, 2)}>
                                            O'chirish
                                        </Button> : null}
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
            <Modal show={show2} onHide={handleClose2} size={'xl'}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className={'miniTable'}>
                    <table>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>MTT</th>
                            {
                                contract.contract.kindergartenContractList?.length > 0 ?
                                    contract.contract.kindergartenContractList[0].productContracts?.map((item,index)=>
                                    <th>{item?.productName}</th>
                                    )
                                    : null
                            }
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Narx</td>
                            {
                                contract.contract.kindergartenContractList?.length > 0 ? contract.contract?.kindergartenContractList[0]?.productContracts.map((prod, index) =>
                                    <td key={index}>
                                        {prod?.price}
                                    </td>
                                ):null
                            }
                        </tr>
                        {
                            contract.contract?.kindergartenContractList?.map((kinder, index) =>
                                <tr key={index}>
                                    <td>{index + 2}</td>
                                    <td>{kinder?.number}{kinder?.kindergartenName}</td>
                                    {
                                        kinder?.productContracts?.map((prod, index2) =>
                                            <td key={index2} >

                                                   {prod?.weight}

                                            </td>
                                        )
                                    }
                                </tr>
                            )
                        }
                        <tr>
                            <td colSpan={2}>UMUMIY</td>
                            {
                                contract.contract.kindergartenContractList?.length > 0 ? contract.contract?.kindergartenContractList[0]?.productContracts.map((prod, index) =>
                                    <td key={index}>
                                        {totalByProduct(index)}
                                    </td>
                                ):null
                            }
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose2}>
                        Ortga
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Contract;