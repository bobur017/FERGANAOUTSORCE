import React from 'react';
import NavbarHeader from "../more/NavbarHeader";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Container, Form, InputGroup, Modal, Row} from "react-bootstrap";
import {addPrice, byProductPrice, editPrice, getPriceAll} from "./PriceReducer";
import {TimestampToInputDate} from "../funcs/Funcs";
import {BsThreeDotsVertical} from "react-icons/bs";
import FromPageSizeBottom from "../fromPage/FromPageSizeBottom";
import {toast} from "react-toastify";

function Price() {
    const defaultObj = {
        "endDay": "",
        "maxPrice": '',
        "minPrice": '',
        "productId": '',
        "startDay": ""
    };
    const [state, setState] = useState();
    const [activeMore, setActiveMore] = useState();
    const [oneProduct, setOneProduct] = useState();
    const [productState, setProductState] = useState(defaultObj);
    const [pricesState, setPricesState] = useState();
    const prices = useSelector(state => state.price.prices)
    const pricesByProduct = useSelector(state => state.price.pricesByProduct)
    const result = useSelector(state => state.price.result);
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (num, data) => {
        if (num === 1) {
            setProductState(defaultObj);
        } else if (num === 2) {
            setProductState(data);
        }
        if (oneProduct?.id) {
            setShow(true)
        }
    };

    useEffect(() => {
        if (!firstUpdate.current) {

        } else {
            dispatch(byProductPrice(oneProduct, null));
            handleClose();
        }
    }, [result]);


    useEffect(() => {
        if (!firstUpdate.current) {

        } else {
            setPricesState(prices);
        }
    }, [prices]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getPriceAll());
        }
    }, []);

    const getPricesByProduct = (data) => {
        setOneProduct(data)
        dispatch(byProductPrice(data));
    }
    const onChangeProductPrice = (e) => {
        setProductState({...productState, [e.target.name]: e.target.value})
    }

    const submitFunc = (e) => {
        e.preventDefault();
        if (productState.minPrice > 0 && productState.maxPrice > 0) {

            if (productState?.id) {
                dispatch(editPrice({...productState, productId: oneProduct?.id}));
            } else {
                dispatch(addPrice({...productState, productId: oneProduct?.id}));

            }
        } else {
            toast.error("kiritilgan narxlar 0 dan katta bo'lsin!");
        }
    }

    const getProduct = (pageNumber) => {
        dispatch(getPriceAll({pageNumber}));
    }
    const getPrices = (pageNumber) => {
        dispatch(byProductPrice({productId: oneProduct?.id, pageNumber}));
    }
    return (
        <div className={"allMain"}>
            <NavbarHeader name={"Mahsulot narxlari"}/>
            <Row className={'mt-3'}>
                <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                    <div className={'figma-card'}>
                        <div className={'tableCalendar'}>
                            <table>
                                <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Nomi</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    pricesState?.list?.map((product, index) =>
                                        <tr key={index} onClick={() => getPricesByProduct(product)}
                                            style={{cursor: 'pointer'}}>
                                            <td>{index + 1}</td>
                                            <td>{product.name}</td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                            <br/>
                            <FromPageSizeBottom allPageSize={pricesState?.allPageSize} pageSize={pricesState?.pageSize}
                                                currentPage={pricesState?.getPageNumber} changesPage={getProduct}/>
                        </div>

                    </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                    <div className={'figma-card'}>
                        {pricesByProduct?.list?.length > 0 ? <>
                            <div className={'w-100 d-flex justify-content-between px-1 py-2 align-items-center'}>
                                <div className={"fs-5 fw-bolder"}>{oneProduct?.name}</div>
                                <button className={'createButtons'} onClick={() => handleShow(1, null)}>Narx biriktirish
                                </button>
                            </div>
                            <div className={'tableCalendar'}>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>№</th>
                                        <th>Bosh. sanasi</th>
                                        <th>Tug. sanasi</th>
                                        <th>Min narx</th>
                                        <th>Max narx</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        pricesByProduct?.list?.map((product, index) =>
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{TimestampToInputDate(product.startDay)}</td>
                                                <td>{TimestampToInputDate(product.endDay)}</td>
                                                <td>{product.minPrice} so'm</td>
                                                <td>{product.maxPrice} so'm</td>
                                                <td>
                                                    <button className={"myDots"}
                                                            style={{position: 'relative'}}
                                                            onBlur={() => setActiveMore(null)}
                                                            onClick={() => setActiveMore(product.id)}
                                                    >
                                                        <BsThreeDotsVertical size={20}/>
                                                        {activeMore === product?.id ? <div className={'shadow'} style={{
                                                            position: 'absolute',
                                                            zIndex: 100
                                                        }}>
                                                            <div className={"more"} style={{right: 2}}>
                                                                <div className={"sub-more"}
                                                                     onClick={() => handleShow(2, product)}>o'zgartirish
                                                                </div>
                                                                <div className={"sub-more"}>O'chirish</div>
                                                            </div>
                                                        </div> : null}
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    </tbody>
                                </table>
                                <br/>
                                <FromPageSizeBottom allPageSize={pricesByProduct?.allPageSize}
                                                    pageSize={pricesByProduct?.pageSize}
                                                    currentPage={pricesByProduct?.getPageNumber}
                                                    changesPage={getPrices}/>
                            </div>
                        </> : pricesByProduct?.list ? <div className={"fs-3 text-center"} style={{color:'red'}}>Ushbu mahsulotga eng yuqori sotib olish narxi kiritilmagan</div> :<div className={"fs-3 text-center"}>Mahsulotni tanlang</div>}
                    </div>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={submitFunc}>
                    <Modal.Header closeButton>
                        <Modal.Title>{oneProduct?.name}ga narx kiritish</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Boshlanish va tugash sanasi</InputGroup.Text>
                            <Form.Control type={'date'} required value={TimestampToInputDate(productState.startDay)}
                                          name={'startDay'} onChange={onChangeProductPrice}/>

                            <Form.Control type={'date'} required value={TimestampToInputDate(productState.endDay)}
                                          name={'endDay'} onChange={onChangeProductPrice}
                                          min={TimestampToInputDate(productState.startDay)}/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text> Minimal va maximal narxi</InputGroup.Text>
                            <Form.Control type={'number'} required value={productState.minPrice}
                                          onWheel={e => e.target.blur()}
                                          name={'minPrice'} onChange={onChangeProductPrice} placeholder={"Minimal "}/>
                            <Form.Control type={'number'} required value={productState.maxPrice}
                                          onWheel={e => e.target.blur()}
                                          name={'maxPrice'} onChange={onChangeProductPrice} placeholder={"Maximal"}
                                          min={productState.minPrice}/>
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
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

export default Price;