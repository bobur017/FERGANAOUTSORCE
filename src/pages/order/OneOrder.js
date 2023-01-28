import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {editOrder, getOrderOne, roundOrder} from "./OrderReducer";
import NavbarHeader from "../more/NavbarHeader";
import {getProduct} from "../product/ProductReducer";
import {getMttDepartment} from "../mtt/MttReducer";
import {toast} from "react-toastify";
import DropdownCustom from "../more/DropdownCustom";
import {MdDeleteForever} from "react-icons/md";
import {Button, Form, InputGroup, Modal} from "react-bootstrap";

function OneOrder() {
    const [orderState, setOrderState] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();
    const history = useNavigate();
    const order = useSelector(state => state.order);
    const firstUpdate = useRef(false);
    const products = useSelector(state => state.product.products);
    const mttsByDepartment = useSelector(state => state.mtt.mttsByDepartment);
    const orderId = useParams("id");

    useEffect(() => {
        if (!firstUpdate.current) {
        } else {
            dispatch(getOrderOne(orderId?.id));
            handleClose();
        }
    }, [order.result]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getOrderOne(orderId?.id));
            dispatch(getProduct());
            dispatch(getMttDepartment());
        } else {
            setOrderState(order.order);
        }
    }, [order.order]);

    const onChangeWeight = (index, index2) => (e) => {
        let list = [...orderState?.kindergartenContractList];
        let list2 = [...list[index].productContracts];
        list2[index2] = {...list2[index2], [e.target.name]: e.target.value};
        list[index] = {...list[index], productContracts: list2}
        setOrderState({...orderState, kindergartenContractList: list});
    }

    const addProductContract = (data) => {
        let list = [...orderState?.kindergartenContractList];
        if (!list[0].productContracts.some(item => item.productId === data.id)) {
            orderState?.kindergartenContractList.forEach((item, index) => {
                    let list2 = [...item.productContracts];
                    list2.push({
                        "id": "",
                        "pack": '',
                        "packWeight": "",
                        "price": '',
                        "productId": data.id,
                        productName: data.name
                    });
                    list[index] = {...list[index], productContracts: list2}
                }
            );
            setOrderState({...orderState, kindergartenContractList: list});
        } else {
            toast.error("Bu mahsulot tanlangan!")
        }
    }

    const addMttContract = (data) => {
        let list = [...orderState?.kindergartenContractList];
        if (!list.some(item => item.kindergartenId === data.id)) {

            orderState?.kindergartenContractList[0].productContracts?.map((item, index) => {
                    return {...item, weight: "", packWeight: ""}
                }
            );
            list.push({
                ...data,
                kindergartenId: data.id,
                kindergartenName: data.name,
                productContracts: orderState?.kindergartenContractList[0].productContracts?.map((item, index) => {
                        return {...item, weight: "", packWeight: ""}
                    }
                )
            })
            setOrderState({...orderState, kindergartenContractList: list});
        } else {
            toast.error("Bu MTT tanlangan!")
        }
    }
    const deleteMtt = (id) => {
        setOrderState({
            ...orderState,
            kindergartenContractList: orderState.kindergartenContractList.filter(item => item.kindergartenId !== id)
        })
    }

    const deleteProductContract = (id) => {
        let list = [...orderState?.kindergartenContractList];
        orderState?.kindergartenContractList.forEach((item, index) => {
                let list2 = item.productContracts.filter(item => item.productId !== id);
                list[index] = {...list[index], productContracts: list2}
            }
        );
        setOrderState({...orderState, kindergartenContractList: list});
    }
    const submitToServer = (data) => {
        dispatch(editOrder(orderId?.id, {kindergartenOrderDTOList: orderState?.kindergartenContractList}));

    }
    const round = (e) => {
        e.preventDefault();
        dispatch(roundOrder(orderId.id, {weight: parseFloat(e.target.round.value)
    }));
    }
    return (
        <div>
            <NavbarHeader name={"Buyurtmani o'zgartirish"} buttonName={"Tayyor"} handleShow={submitToServer}/>

            <div className={"figma-card mt-3"}>
                <button onClick={() => history("/sidebar/order")} className={"buttonPdf m-2"}>Ortga</button>
                <button onClick={() => handleShow()} className={"buttonInfo m-2"}>Yaxlitash</button>
                <div className={"d-flex"}>
                    <div className={"miniTable2"}>
                        <table>
                            <thead>
                            <tr>
                                <th>№</th>
                                <th>MTT</th>
                                {
                                    orderState?.kindergartenContractList?.length > 0 ? orderState?.kindergartenContractList[0].productContracts.map((item, index) =>
                                            <th key={index}>
                                                {item.productName}
                                                <div><MdDeleteForever size={20} color={'red'}
                                                                      onClick={() => deleteProductContract(item?.productId)}
                                                                      style={{cursor: 'pointer'}}/></div>
                                            </th>
                                        )
                                        : null}
                            </tr>
                            </thead>
                            <tbody>
                            {
                                orderState?.kindergartenContractList?.map((item, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className={"d-flex justify-content-between align-items-center"}
                                            style={{minWidth: 100}}>
                                            <div className={"d-flex"}>{item.number} <span
                                                className={"d-flex"}>{item.kindergartenName}</span></div>
                                            <div><MdDeleteForever size={20} color={'red'}
                                                                  onClick={() => deleteMtt(item?.kindergartenId)}
                                                                  style={{cursor: 'pointer'}}/></div>
                                        </td>
                                        {
                                            item.productContracts.map((item2, index2) =>
                                                <td key={index2} style={{maxWidth:70}}>
                                                    <input type="number" step={"0.01"} name={"packWeight"}
                                                           value={item2.packWeight}
                                                           style={{maxWidth:65}}
                                                           onChange={onChangeWeight(index, index2)}/>
                                                </td>
                                            )
                                        }
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <DropdownCustom name={"Masulot +"} list={products}
                                        setData={addProductContract}/>
                    </div>
                </div>
                <DropdownCustom name={"MTT +"} list={mttsByDepartment}
                                setData={addMttContract}/>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={round}>
                    <Modal.Header closeButton>
                        <Modal.Title>Mahsulotlar miqdorini yaxlitlash</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Yaxlitlash (gramm)</InputGroup.Text>
                            <Form.Control
                                placeholder="miqdori"
                                aria-describedby="basic-addon1"
                                required
                                type={'number'}
                                step={"0.01"}
                                size={"sm"}
                                name={"round"}
                                onWheel={e => e.target.blur()}
                            />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Ortga
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

export default OneOrder;