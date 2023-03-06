import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {addOrder, deleteOrder, editOrder, getOrder} from "./OrderReducer";
import NavbarHeader from "../more/NavbarHeader";
import More from "../more/DropdownCustom";
import MoreButtons from "../more/MoreButtons";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {TimestampToInputDate} from "../funcs/Funcs";
import {historyDef, pushFunc, pushLogin, pushLogin2} from "../../Default";
import {useNavigate} from "react-router-dom";
import FromPageSizeBottom from "../fromPage/FromPageSizeBottom";
import LoadingPage from "../loading/LoadingPage";

function Order() {
    const history = useNavigate();
    const orderDef = {
        name: "",
        month: "",
        year: "",
        date: '',
    };
    const [orderState, setOrderState] = useState(orderDef);
    const [active, setActive] = useState();
    const [load, setLoad] = useState(false);
    const [number, setNumber] = useState(0);
    const [params, setParams] = useState({pageSize: 20, page: 0});
    const dispatch = useDispatch();
    const order = useSelector(state => state.order)
    const firstUpdate = useRef(false);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setOrderState({});
        setShow(false)
    };
    const handleShow = (data) => {
        if (data === null) {
            setOrderState(orderDef);
            setNumber(0);
        }
        setShow(true)
    };

    useEffect(() => {
        if (firstUpdate.current) {
            handleClose();
            dispatch(getOrder(params));
            setLoad(false);
        }
    }, [order.result,order.error]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getOrder(params));
        }
    }, []);
    const onChangeOrder = (e) => {
        let year = orderState.year;
        let month = orderState.month;
        if (e.target.name === 'date') {
            month = new Date(e.target.value).getMonth() + 1;
            year = new Date(e.target.value).getFullYear();
        }
        setOrderState({...orderState, [e.target.name]: e.target.value, year, month});
    }
    const submitCreateOrder = (e) => {
        e.preventDefault();
        setLoad(true);
        handleClose();
        if (orderState?.id) {
            dispatch(editOrder(orderState));
        } else {
            dispatch(addOrder(orderState));
        }
    }
    const setOrderData = (index, data) => {
        setOrderState(data);
        if (index === 0) {
            setNumber(0);
            handleShow(null);
        } else if (index === 1) {
            dispatch(deleteOrder(data))
        }
    }
    const activeMore = (data) => {
        history("/sidebar/order/" + data?.id);
        setActive(data);
    }
    const changePage = (page) => {
        let params2 = {...params, page}
        dispatch(getOrder(params2));
        setParams(params2);
    }
    const renderFunc = () => {
        if (number === 0) {
            return (
                <Form onSubmit={submitCreateOrder}>
                    <Modal.Header closeButton>
                        <Modal.Title>Buyurtmani tuzish</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                Nomi
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" placeholder="Nomi" size={"sm"} value={orderState?.name}
                                              name={"name"} onChange={onChangeOrder}/>
                            </Col>
                        </Form.Group>
                        {!orderState?.id ? <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                Yil va oy
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="month" placeholder="Nomi" size={"sm"} value={orderState?.date}
                                              name={"date"} onChange={onChangeOrder}/>
                            </Col>
                        </Form.Group> : null}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" type={"button"} onClick={handleClose}>
                            Ortga
                        </Button>
                        <Button variant="primary" type={"submit"}>
                            Tayyor
                        </Button>
                    </Modal.Footer>
                </Form>
            )
        }
        return null;
    }

    return (
        <div>
            <NavbarHeader name={"Buyurtmalar"} handleShow={handleShow} buttonName={"Buyurtma tuzish"}/>
            <div className={"figma-card mt-3"}>
                <div className={"tableCalendar"}>
                    <table>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Nomi</th>
                            <th>Sana</th>
                            <th>Shartnoma tuzish</th>
                            <th>Boshqa</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            order?.orders?.list?.length > 0 ? order?.orders?.list?.map((item, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td onClick={() => activeMore(item)}>{item.name}</td>
                                    <td>{TimestampToInputDate(item?.updateDate)}</td>
                                    <td>
                                        <button onClick={() => history("/sidebar/contract/" + item.id)} className={"buttonExcel"}>Shartnoma
                                        </button>
                                    </td>
                                    <td>
                                        <MoreButtons list={[
                                            {name: "O'zgartirish", icon: <AiFillEdit size={20}/>},
                                            {name: "O'chirish", icon: <AiFillDelete size={20}/>}]}
                                                     data={item} active={active?.id === item?.id}
                                                     setActive={setActive}
                                                     getDate={setOrderData}
                                        />
                                    </td>
                                </tr>
                            ) : <div className={"fs-3 text-center w-100"} style={{color: 'red'}}>Ma'lumot mavjud
                                emas</div>
                        }
                        </tbody>
                    </table>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <FromPageSizeBottom pageSize={params?.getPageSize} currentPage={params?.getPageNumber}
                                        changesPage={changePage}/>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                {renderFunc()}
            </Modal>
            <LoadingPage load={load}/>
        </div>
    );
}

export default Order;
