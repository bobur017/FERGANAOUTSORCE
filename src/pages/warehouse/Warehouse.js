import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import {addProductContract, getAcceptedProduct, getAcceptedProductAll, getWarehouse} from "./WarehouseReducer";
import NavbarHeader from "../more/NavbarHeader";

function Warehouse() {
    const [wareHouseState, setWareHouseState] = useState();
    const [productReceived, setProductReceived] = useState({
        "id": "",
        "receivedWeight": 0
    });
    const [currentNavs, setCurrentNavs] = useState(0);
    const warehouses = useSelector(state => state.warehouse.warehouses)
    const result = useSelector(state => state.warehouse.result);
    const acceptedProduct = useSelector(state => state.warehouse.acceptedProduct)
    const acceptedProducts = useSelector(state => state.warehouse.acceptedProducts)
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        setProductReceived({...data, receivedWeight: ''});
        handleShow();
    }

    const submit = (e) => {
        e.preventDefault();
        dispatch(addProductContract(productReceived));
    }

    const onChangeProductWeight = (e) => {
        setProductReceived({...productReceived, receivedWeight: e.target.value})
    }

    return (
        <div>
            <NavbarHeader
                navs={[{name: "Ombordagi mahsulotlar"}, {name: "Mahsulot qabul qilish"}, {name: "Qabul qilingan mahsulotlar"}]}
                currentNavs={setCurrentNavs}/>
            <Container fluid={true} className={'mt-3'}>
                {currentNavs === 0 ? <Row>
                        <Col className={'figma-card'}>
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
                                            <tr key={index} style={{cursor: 'pointer'}}>
                                                <td>{index + 1}</td>
                                                <td>{product.productName}</td>
                                                <td>{product.weight}</td>
                                            </tr>
                                        )
                                    }
                                    </tbody>
                                </table>
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
                                    <th>Miqdor</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    acceptedProducts?.list?.map((product, index) =>
                                        <tr key={index} style={{cursor: 'pointer'}}>
                                            <td>{index + 1}</td>
                                            <td>{product.productName}</td>
                                            <td>{product.weight}</td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row> : null}
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
                        <Form.Label>Miqdorini kiriting</Form.Label>
                        <Form.Control max={productReceived?.residualWeight} type={'number'} name={"receivedWeight"}
                                      value={productReceived.receivedWeight} onChange={onChangeProductWeight}
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
        </div>
    );
}

export default Warehouse;