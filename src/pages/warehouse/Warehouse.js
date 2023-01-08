import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import {addProductContract, getAcceptedProduct, getAcceptedProductAll, getWarehouse} from "./WarehouseReducer";
import NavbarHeader from "../more/NavbarHeader";
import {getGetFiles} from "../getFiles/GetFilesReducer";
import {downloadFilesa} from "../DownLOader";
import {getRoleStorage} from "../more/Functions";
import FromPageSizeBottom from "../fromPage/FromPageSizeBottom";
import {TimestampToInputDate} from "../funcs/Funcs";

function Warehouse() {
    const [wareHouseState, setWareHouseState] = useState();
    const [productReceived, setProductReceived] = useState({
        "id": "",
        "receivedWeight": 0
    });
    const [currentNavs, setCurrentNavs] = useState(0);
    const [inOutList, setInOutList] = useState([]);
    const warehouses = useSelector(state => state.warehouse.warehouses);
    const result = useSelector(state => state.warehouse.result);
    const acceptedProduct = useSelector(state => state.warehouse.acceptedProduct);
    const acceptedProducts = useSelector(state => state.warehouse.acceptedProducts);
    const getFiless = useSelector(state => state.getFiles.getFiless);
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const [show2, setShow2] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);
    const handleShow = () => setShow(true);
    const handleShow2 = (list) => {
        setInOutList(list);
        setShow2(true);
    }

    useEffect(() => {
        if (!firstUpdate.current) {

        } else {
            var win = window.open(getFiless, '_blank');
            win.focus();
        }
    }, [getFiless]);

    useEffect(() => {
        if (!firstUpdate.current) {

        } else {
            dispatch(getAcceptedProduct());
            handleClose();
        }
    }, [result]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getWarehouse());
            dispatch(getAcceptedProduct());
            dispatch(getAcceptedProductAll());
        } else {
            setWareHouseState(warehouses);
        }
    }, [acceptedProduct]);

    const onClickProduct = (data) => {
        setProductReceived({...data, packWeight: '', date: Date.now()});
        handleShow();
    }

    const submit = (e) => {
        e.preventDefault();
        dispatch(addProductContract(productReceived));
    }

    const onChangeProductWeight = (e) => {
        if (e.target.name === "date") {
            setProductReceived({...productReceived, [e.target.name]: new Date(e.target.value).getTime()})
        } else {
            let packWeight = productReceived?.pack > 0 ? parseInt(e.target.value) : e.target.value;
            let receivedWeight = productReceived?.pack > 0 ? (parseInt(e.target.value) * productReceived?.pack) :e.target.value;
            setProductReceived({...productReceived, receivedWeight,packWeight});
        }
    }

    const getPdf = (e) => {
        dispatch(getGetFiles());
    }
    const changePage1 = (page) => {
        dispatch(getAcceptedProductAll({page, pageSize: 10}));
    }
    const changePage0 = (page) => {
        dispatch(getWarehouse({page, pageSize: 10}));
    }
    const changePage2 = (page) => {
        dispatch(getAcceptedProduct({page, pageSize: 10}));
    }
    return (
        <div>
            <NavbarHeader
                navs={[{name: "Ombordagi mahsulotlar"}, {name: "Qabul qilingan mahsulotlar"}, getRoleStorage() === "ROLE_OMBORCHI" ? {name: "Mahsulot qabul qilish"} : '']}
                currentNavs={setCurrentNavs}/>
            <Container fluid={true} className={'mt-3'}>
                {currentNavs === 0 ? <Row>
                    <Col className={'figma-card'}>
                        <div className={'w-100 d-flex justify-content-end'}>
                            <button className={'buttonPdf my-2'} onClick={getPdf}>PDF</button>
                        </div>
                        <div className={'tableCalendar'}>
                            <table>
                                <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Mahsulot nomi</th>
                                    <th>Miqdor</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    warehouses?.list?.map((product, index) =>
                                        <tr key={index} style={{cursor: 'pointer'}} onClick={()=>handleShow2(product?.inOutList)}>
                                            <td>{index + 1}</td>
                                            <td>{product.productName}</td>
                                            <td>{product.weight}</td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                            <br/>
                            <FromPageSizeBottom currentPage={warehouses.getPageNumber}
                                                pageSize={warehouses?.getPageSize} changesPage={changePage0}
                                                allPageSize={warehouses?.allPageSize}/>
                        </div>
                    </Col>
                </Row> : null}
                {currentNavs === 2 ? <Row>
                    <Col className={'figma-card'}>
                        <div className={'tableCalendar'}>
                            <table>
                                <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Mahsulot nomi</th>
                                    <th>Narxi</th>
                                    <th>Shartnoma</th>
                                    <th>Yaetqazuvchi</th>
                                    <th>Ummumiy miqdor</th>
                                    <th>Umumiy summa</th>
                                    <th>Qolgan miqdori</th>
                                    <th>Qolgan summa</th>
                                    <th>Qabul qilingan miqdori</th>
                                    <th>Qabul qilingan summa</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    acceptedProduct?.list?.map((product, index) =>
                                        <tr key={index} style={{cursor: 'pointer'}}
                                            onClick={() => onClickProduct(product)}>
                                            <td>{index + 1}</td>
                                            <td>{product.productName}</td>
                                            <td>{product.price}</td>
                                            <td>{product.shartnomaRaqami}</td>
                                            <td>{product.yetkazibBeruvchi}</td>
                                            <td>{product.weight}</td>
                                            <td>{product.totalSum}</td>
                                            <td>{product.residualWeight}</td>
                                            <td>{product.residualTotalSum}</td>
                                            <td>{product.successWeight}</td>
                                            <td>{product.successTotalSum}</td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                            <br/>
                            <FromPageSizeBottom currentPage={acceptedProduct.getPageNumber}
                                                pageSize={acceptedProduct?.getPageSize} changesPage={changePage2}
                                                allPageSize={acceptedProduct?.allPageSize}/>
                        </div>
                    </Col>
                </Row> : null}
                {currentNavs === 1 ? <Row>
                    <Col className={'figma-card'}>
                        <div className={'tableCalendar'}>
                            <table>
                                <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Mahsulot nomi</th>
                                    <th>Narxi</th>
                                    <th>Shartnoma</th>
                                    <th>Shartnomachi</th>
                                    <th>Vazni</th>
                                    <th>Qadoqlar soni</th>
                                    <th>Qadoq miqdori</th>
                                    <th>Vaqti</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    acceptedProducts?.list?.map((product, index) =>
                                        <tr key={index} style={{cursor: 'pointer'}}>
                                            <td>{index + 1}</td>
                                            <td>{product?.producyName}</td>
                                            <td>{product?.price}</td>
                                            <td>{product?.shartnomaRaqami}</td>
                                            <td>{product?.yetkazibBeruvchi}</td>
                                            <td>{product?.weight}</td>
                                            <td>{product?.packWeight}</td>
                                            <td>{product?.pack}</td>
                                            <td>{TimestampToInputDate(product?.date)}</td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                            <br/>
                            <FromPageSizeBottom currentPage={acceptedProducts.getPageNumber}
                                                pageSize={acceptedProducts?.getPageSize} changesPage={changePage1}
                                                allPageSize={acceptedProducts?.allPageSize}/>
                        </div>
                    </Col>
                </Row> : null}
                <embed/>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={submit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{productReceived?.productName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span className={'mb-3'} style={{color: '#fcb713'}}>Maximal kiritish miqdori:
                            <span style={{color: '#000'}}>{productReceived?.residualWeight}</span></span>
                        <br/>
                        <Form.Label>Sana</Form.Label>
                        <Form.Control type={'date'} name={"date"}
                                      value={TimestampToInputDate(productReceived.date)}
                                      onChange={onChangeProductWeight}
                                      onWheel={event => event.target.blur()} max={TimestampToInputDate(productReceived.date)}/>
                        <Form.Label>Qabul qilinadigan miqdor</Form.Label>
                        <Form.Control max={productReceived?.residualPackWeight} type={'number'} name={"packWeight"}
                                      value={productReceived.packWeight} step={'0.01'}
                                      onChange={onChangeProductWeight}
                                      onWheel={event => event.target.blur()} required/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Bekor qilish
                        </Button>
                        <Button variant="primary" type={'submit'}>
                            Tayyor
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal show={show2} onHide={handleClose2} size={"xl"}>
                <Form onSubmit={submit}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={'tableCalendar'}>
                            <table>
                                <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Narxi</th>
                                    <th>Umumiy miqdori</th>
                                    <th>Qadoq miqdori</th>
                                    <th>Qadoqlar soni</th>
                                    <th>Qabul qilingan sana</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    inOutList?.map((product, index) =>
                                        <tr key={index} style={{cursor: 'pointer'}}>
                                            <td>{index + 1}</td>
                                            <td>{product.price}</td>
                                            <td>{product.weight}</td>
                                            <td>{product.packWeight}</td>
                                            <td>{product.pack}</td>
                                            <td>{product.date}</td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                            <br/>
                            {/*<FromPageSizeBottom currentPage={acceptedProduct.getPageNumber}*/}
                            {/*                    pageSize={acceptedProduct?.getPageSize} changesPage={changePage2}*/}
                            {/*                    allPageSize={acceptedProduct?.allPageSize}/>*/}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Bekor qilish
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default Warehouse;