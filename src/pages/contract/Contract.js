import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    addContract,
    contractVerified,
    deleteContract,
    editContract,
    getContract, getContractFile,
    getContractOne
} from "./ContractReducer";
import {Button, Form, Modal, Row, Table} from "react-bootstrap";
import NavbarHeader from "../more/NavbarHeader";
import {useNavigate} from "react-router-dom";
import {TimestampToInputDate} from "../funcs/Funcs";
import {getRoleStorage} from "../more/Functions";


function Contract() {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [id, setId] = useState();
    const [contractState, setContractState] = useState({id: '', name: ''});
    const [contracts, setContracts] = useState([]);
    const [renderNumber, setRenderNumber] = useState();
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
        setId(id);
        setShow2(true);
    };
    const history = useNavigate();

    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const contract = useSelector(state => state.contract)
    const contractFile = useSelector(state => state.contract.contractFile)
    const menuOneDay = useSelector(state => state.report.menuOneDay);
    const [fileType, setFileType] = useState();

    useEffect(() => {
        if (!firstUpdate.current) {

        } else {

        }
    }, [contractFile]);

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
            setRenderNumber(number);
        } else if (number === 2) {
            setContractState(data);
            console.log(data,"data")
            setRenderNumber(number);
        }
        handleShow();
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
            total += parseFloat(kin?.productContracts[index]?.weight)
        );
        return total.toFixed(3);
    }
    const getFiles = (type) => {
        setFileType(type);
        dispatch(getContractFile(id));
    }
    const modalEdit = () => {
        return (
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
        )
    }
    const modalDelete = () => {
        return (
            <>
                <Modal.Header closeButton>
                    <Modal.Title>{contractState.lotNumber} lotli shartnoma</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    O'chirilgan ma'lumotni qayta tiklab bo'lmaydi, rostdan ham o'chirasizmi?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        YO'Q
                    </Button>
                    <Button variant="primary" onClick={() => dispatch(deleteContract(contractState?.id))}>
                        HA
                    </Button>
                </Modal.Footer></>
        )
    }
    const renderFunc = () => {
        if (renderNumber === 1) {
            return modalEdit();
        } else if (renderNumber === 2) {
            return modalDelete();
        }
    }

    return (
        <div className={'allMain'}>
            <NavbarHeader name={"Shartnomalar bo'limi"} handleShow={route}
                          buttonName={"Shartnoma tuzish"}/>
            <br/>
            <div className={'figma-card'}>
                <div className={'tableCalendar'}>
                    {contracts?.list?.length > 0 ? <table style={{color: 'black'}}>
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
                            {getRoleStorage() === "ROLE_BO`LIM_BUXGALTER" ? <th>Tasdiqlash</th> : null}
                            {getRoleStorage() !== "ROLE_BOSHQARMA_BUXGALTER" ? <>
                                <th>O'zgartirish</th>
                                <th>O'chirish</th>
                            </> : null}
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
                                    {getRoleStorage() === "ROLE_BO`LIM_BUXGALTER" ? <td>
                                        {item?.status === "YANGI" ? <Button variant='outline-success' size='sm'
                                                                            onClick={() => dispatch(contractVerified(item.id))}>
                                            Tasdiqlash
                                        </Button> : null}
                                    </td> : null}
                                    {getRoleStorage() !== "ROLE_BOSHQARMA_BUXGALTER" ? <>
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
                                    </> : null}
                                </tr>
                            )
                        }
                        </tbody>
                    </table> : contracts?.list ?
                        <div className={"fs-3 w-100 text-center"} style={{color: 'red'}}>Ma'lumotlarmavjud emas</div> :
                        <div className={"fs-3 w-100 text-center"} style={{color: 'red'}}>Shartnomalar tuzilmagan</div>}
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                {renderFunc()}
            </Modal>
            <Modal show={show2} onHide={handleClose2} size={'xl'}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className={'miniTable2'} style={{height: '75vh'}}>
                        <table className={'w-100'}>
                            <thead>
                            <tr>
                                <th>№</th>
                                <th>MTT</th>
                                {
                                    contract?.contract?.kindergartenContractList?.length > 0 ?
                                        contract.contract.kindergartenContractList[0].productContracts?.map((item, index) =>
                                            <th key={index}>{item?.productName}</th>
                                        )
                                        : null
                                }
                            </tr>
                            </thead>
                            <tbody>
                            <tr>

                                <td colSpan={2}>Narx</td>
                                {
                                    contract?.contract?.kindergartenContractList?.length > 0 ? contract?.contract?.kindergartenContractList[0]?.productContracts.map((prod, index) =>
                                        <td key={index}>
                                            {prod?.price}
                                        </td>
                                    ) : null
                                }
                            </tr>
                            {
                                contract.contract?.kindergartenContractList?.map((kinder, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className={"d-flex"}>{kinder?.number} {kinder?.kindergartenName}</td>
                                        {
                                            kinder?.productContracts?.map((prod, index2) =>
                                                <td key={index2}>

                                                    {prod?.packWeight}

                                                </td>
                                            )
                                        }
                                    </tr>
                                )
                            }
                            <tr>
                                <td colSpan={2}>UMUMIY</td>
                                {
                                    contract?.contract?.kindergartenContractList?.length > 0 ? contract.contract?.kindergartenContractList[0]?.productContracts.map((prod, index) =>
                                        <td key={index}>
                                            {totalByProduct(index)}
                                        </td>
                                    ) : null
                                }
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className={'buttonPdf mx-1'} style={{width: 100}} onClick={() => getFiles("pdf")}>PDF
                    </button>
                    <Button variant="danger" onClick={handleClose2}>
                        Ortga
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Contract;
