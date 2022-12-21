import React from 'react';
import NavbarHeader from "../more/NavbarHeader";
import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Form, InputGroup, Modal} from "react-bootstrap";
import {addSupplier, getSupplier, getSupplierAll, getSupplierInfo} from "./SupplierReducer";
import {useEffect} from "react";
import {AiOutlineSearch} from "react-icons/ai";
import {GoPrimitiveDot} from "react-icons/go";
import {FiPlusCircle} from "react-icons/fi";
import FromPageSizeBottom from "../fromPage/FromPageSizeBottom";

function Supplier() {
    const [show, setShow] = useState(false);
    const [supplierState, setSupplierState] = useState();
    const [supplier, setSupplier] = useState([]);
    const [pageSize, setPageSize] = useState(20);
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const supplierInfo = useSelector(state => state.supplier.supplierInfo);
    const suppliers = useSelector(state => state.supplier.suppliers);
    const result = useSelector(state => state.supplier.result);

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true)
    };

    useEffect(() => {
        if (!firstUpdate.current) {

        } else {
            setSupplierState(supplierInfo);
        }
    }, [supplierInfo]);

    useEffect(() => {
        if (!firstUpdate.current) {

        } else {
            dispatch(getSupplierAll())
        }
    }, [result]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getSupplierAll())
        } else {

        }
    }, [suppliers]);

    const submitSupplier = (e) => {
        e.preventDefault();
        dispatch(getSupplierInfo({STIR: (e.target.stir.value)}));
    }
    const submitAdd = () => {
        dispatch(addSupplier(supplierState));
        handleClose();
        setSupplierState({});
    }
    const changePageCurrent = (number) => {
        dispatch(getSupplierAll({
            pageNumber: number, pageSize
        }))
    }

    return (<div className={'allMain'}>
        <NavbarHeader buttonName={"Ta'minotchi qo'shish"} handleShow={handleShow} name={"Ta'minotchilar bo'limi"}/>
        <div className={'figma-card mt-3'}>
            <div className={'tableCalendar p-3'}>
                <Form.Group controlId="formGridState" className={'mx-4 w-25 mb-2'}>
                    <Form.Label>Ma'lumotlar sizg'imi</Form.Label>
                    <Form.Select name={"pageSize"} onChange={(e) => setPageSize(e.target.value)}
                                 defaultValue={null}>
                        <option value={20}>20 qator</option>
                        <option value={30}>30 qator</option>
                        <option value={40}>40 qator</option>
                        <option value={50}>50 qator</option>
                    </Form.Select>
                </Form.Group>
                <table>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Nomi</th>
                        <th>Manzili</th>
                        <th>Tel:</th>
                        <th>Holati</th>
                        <th>STIR</th>
                        <th>Rahbari</th>
                    </tr>
                    </thead>
                    <tbody>
                    {suppliers?.list?.map((item, index) => <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{item.status}</td>
                        <td>{item?.stir}</td>
                        <td>{item?.director}</td>
                    </tr>)

                    }
                    </tbody>
                </table>
            </div>
            <FromPageSizeBottom allPageSize={suppliers?.allPageSize} pageSize={suppliers?.getPageSize}
                                currentPage={suppliers?.getPageNumber} changesPage={changePageCurrent}/>
        </div>
        <Modal show={show} onHide={handleClose} size={'lg'}>
            <Form onSubmit={submitSupplier}>
                <Modal.Header closeButton>
                    <Modal.Title>Ta'minotchi korxona qo'shish</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Korxona STIR"
                            type={'number'}
                            name={'stir'}
                            required
                            onWheel={e => e.target.blur()}
                        />
                        <Button variant="outline-success" type='submit'>
                            <AiOutlineSearch/>
                        </Button>
                    </InputGroup>
                    <Card>
                        <Card.Header className={'d-flex justify-content-between'}>
                            <span>{supplierState?.name}</span>
                            {supplierState?.status ? <button className={'createButtons align-items-center px-2'}
                                                             disabled={supplierState?.status !== "Hozirda mavjud"}
                                                             onClick={() => submitAdd()}><FiPlusCircle/><span
                                className={'mx-2'}>Qo'shish</span></button> : null}
                        </Card.Header>
                        <Card.Body>
                            <div className={'infoText mt-1'}>
                                <div>Faoliyati</div>
                                <div>{supplierState?.status} <GoPrimitiveDot size={35}
                                                                             color={supplierState?.status !== "Hozirda mavjud" ? '#E9573F' : '#8CC152'}/>
                                </div>
                            </div>
                            <div className={'infoText mt-3'}>
                                <div>Ro'yxatdan o'tgan sana</div>
                                <div>{supplierState?.date}</div>
                            </div>
                            <div className={'infoText mt-3'}>
                                <div>STIR</div>
                                <div>{supplierState?.stir}</div>
                            </div>
                            <div className={'infoText mt-3'}>
                                <div>THSHT</div>
                                <div>{supplierState?.thsht}</div>
                            </div>
                            <div className={'infoText mt-3'}>
                                <div>Telefon raqami</div>
                                <div>{supplierState?.phoneNumber}</div>
                            </div>
                            <div className={'infoText mt-3'}>
                                <div>IFUT</div>
                                <div>{supplierState?.ifut}</div>
                            </div>
                            <div className={'infoText mt-3'}>
                                <div>Manzili</div>
                                <div>{supplierState?.address}</div>
                            </div>
                            <div className={'infoText mt-3'}>
                                <div>Ustav fondi</div>
                                <div>{supplierState?.fond}</div>
                            </div>
                            <div className={'infoText mt-3'}>
                                <div>Direktori</div>
                                <div>{supplierState?.director}</div>
                            </div>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Ortga
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    </div>);
}

export default Supplier;