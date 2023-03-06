import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {editOrder, getOrderOne, getOrderOneFile, roundOrder} from "./OrderReducer";
import NavbarHeader from "../more/NavbarHeader";
import {getProduct} from "../product/ProductReducer";
import {getMttDepartment} from "../mtt/MttReducer";
import {toast} from "react-toastify";
import DropdownCustom from "../more/DropdownCustom";
import {MdDeleteForever} from "react-icons/md";
import {Button, Form, InputGroup, Modal} from "react-bootstrap";
import {getSupplier} from "../supplier/SupplierReducer";
import {TimestampToInputDate} from "../funcs/Funcs";
import {addContract} from "../contract/ContractReducer";
import LoadingPage from "../loading/LoadingPage";

function OneOrder() {
    const def = {
        "endDay": '',
        "kindergartenContractList": [
            {
                "kindergartenId": 'empty',
                "productContracts": [
                    {
                        emptyy: "empty",
                        "price": '',
                        "productId": 'empty',
                        "packWeight": ''
                    }
                ]
            }
        ],
        "lotNumber": '',
        "number": '',
        "startDay": '',
        "supplierId": ''
    }
    const [orderState, setOrderState] = useState();
    const [supplierState, setSupplierState] = useState({name: "Ta'minotchini tanlang"});
    const [show, setShow] = useState(false);
    const [productState, setProductState] = useState();
    const [load, setLoad] = useState(false);;
    const [contractOrder, setContractOrder] = useState(def);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();
    const history = useNavigate();
    const order = useSelector(state => state.order);
    const result = useSelector(state => state.contract.result);
    const error = useSelector(state => state.contract.error);
    const suppliers = useSelector(state => state.supplier.suppliers);
    const firstUpdate = useRef(false);
    const products = useSelector(state => state.product.products);
    const mttsByDepartment = useSelector(state => state.mtt.mttsByDepartment);
    const orderId = useParams("id");

    useEffect(() => {
        if (!firstUpdate.current) {
        } else {
            history("/sidebar/order");
            handleClose();
        }
    }, [result]);

    useEffect(() => {
        if (!firstUpdate.current) {
        } else {
            setLoad(false);
            handleClose();
        }
    }, [error]);

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
            dispatch(getSupplier());
            dispatch(getProduct());
            dispatch(getMttDepartment());
        } else {
            setOrderState(order.order);
        }
    }, [order.order]);
    const getSupplierDrop = (data) => {
        setSupplierState(data);
        setContractOrder({...contractOrder, supplierId: data?.id})
    }
    const setDateValue = (e) => {
        if (e.target.type === 'date') {
            setContractOrder({...contractOrder, [e.target.name]: new Date(e.target.value)})
        } else {
            setContractOrder({...contractOrder, [e.target.name]: e.target.value})
        }
    }

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
    const changePrice = (index2) => (e) => {
        let kindergartenContractList = [...orderState?.kindergartenContractList];
        console.log(kindergartenContractList[1].productContracts[index2], "kindergartenContractList[index]");
        orderState?.kindergartenContractList.forEach((kin, index) => {
                let productContracts = [...kindergartenContractList[index].productContracts];
                productContracts[index2] = {
                    ...productContracts[index2],
                    price: e.target.value
                };
                kindergartenContractList[index] = {...kindergartenContractList[index], productContracts};
            }
        );
        setOrderState({...orderState, kindergartenContractList});
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
        dispatch(roundOrder(orderId.id, {
            weight: parseFloat(e.target.round.value)
        }));
    }
    const getFilePdf = () => {
        dispatch(getOrderOneFile(orderId.id));
    }
    const changePrice2 = (index) => {
        let kindergartenContractList = [...orderState.kindergartenContractList];
        setProductState(kindergartenContractList[0].productContracts[index]);
    }
    const totalByProduct = (index) => {
        let total = 0;
        orderState.kindergartenContractList.forEach((kin) =>
            total += parseFloat(kin?.productContracts[index]?.packWeight)
        );
        return total.toFixed(3);
    }
    const submit = (e) => {
        e.preventDefault();
        setLoad(true);
        let orderContr = {...contractOrder, kindergartenContractList: orderState?.kindergartenContractList};
        if (supplierState.id !== "") {
            dispatch(addContract(orderContr));
            setContractOrder(orderContr);
        } else {
            toast.error("Taminotchini tanlang");
        }
    }
    return (
        <div>
            <Form onSubmit={submit}>
                <NavbarHeader name={"Buyurtmani o'zgartirish"} buttonName={"Tayyor"} handleShow={submitToServer}/>
                <div className={"figma-card mt-3"}>
                    <div className={"d-flex justify-content-between"}>
                        <div>
                            <button onClick={() => history("/sidebar/order")} className={"buttonPdf m-2"}>Ortga</button>
                            <button onClick={() => getFilePdf()} type={"button"} className={"buttonPdf m-2"}>PDF
                            </button>
                            <button onClick={() => handleShow()} type={"button"}
                                    className={"buttonInfo m-2"}>Yaxlitash
                            </button>
                        </div>
                        <button type={"submit"} className={"buttonExcel m-2"}>Shartnoma tuzish</button>
                    </div>
                    <div className={'w-100 d-flex justify-content-between align-items-center my-header shadow'}>
                        <div>
                            <Form.Label>Ta'minotchi</Form.Label>
                            <DropdownCustom name={supplierState?.name} setData={getSupplierDrop}
                                            list={suppliers?.list}/></div>
                        <div>
                            <Form.Label>LOT raqami</Form.Label>
                            <Form.Control
                                type={'text'}
                                required
                                value={contractOrder.lotNumber}
                                name={"lotNumber"}
                                size={'sm'}
                                onChange={setDateValue}
                            />
                        </div>
                        <div>
                            <Form.Label>Shartnoma raqami</Form.Label>
                            <Form.Control
                                type={'text'}
                                required
                                size={'sm'}
                                value={contractOrder.number}
                                name={"number"}
                                onChange={setDateValue}
                            />
                        </div>
                        <div>
                            <Form.Label>Boshlanish sanasi</Form.Label>
                            <Form.Control
                                type={'date'}
                                value={TimestampToInputDate(contractOrder.startDay)}
                                name={"startDay"}
                                size={'sm'}
                                required
                                onChange={setDateValue}
                            />
                        </div>
                        <div>
                            <Form.Label>Tugashsh sanasi</Form.Label>
                            {/*<InputGroup.Text >Tugashsh sanasi</InputGroup.Text>*/}
                            <Form.Control
                                type={'date'}
                                size={'sm'}
                                value={TimestampToInputDate(contractOrder.endDay)}
                                name={"endDay"}
                                required
                                min={TimestampToInputDate(contractOrder.startDay)}
                                onChange={setDateValue}
                            />
                        </div>
                    </div>
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
                                <tr style={{backgroundColor: '#dad9d9'}}>
                                    <td colSpan={2}>Narx</td>
                                    {
                                        orderState?.kindergartenContractList[0]?.productContracts.map((prod, index) =>
                                            <td key={index} onClick={() => changePrice2(index)}
                                                style={{position: 'relative'}}>
                                                {(prod?.productId === productState?.productId) ?
                                                    <div style={{
                                                        position: 'absolute',
                                                        bottom: 30,
                                                        color: '#f38538',
                                                        backgroundColor: 'white',
                                                        padding: 3
                                                    }}
                                                         className={"tooltipText shadow"}>
                                                        Max narx:{prod?.maxPrice}
                                                    </div> : null}
                                                <input className={"myTdInput"} type="number"
                                                       name={'price'}
                                                       value={prod?.price}
                                                       onWheel={e => e.target.blur()}
                                                       required
                                                       onChange={changePrice(index)}/>

                                            </td>
                                        )
                                    }
                                </tr>
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
                                                    <td key={index2} style={{maxWidth: 70}}>
                                                        <input type="number" step={"0.001"} name={"packWeight"}
                                                               value={item2.packWeight}
                                                               style={{maxWidth: 65}}
                                                               onChange={onChangeWeight(index, index2)}/>
                                                    </td>
                                                )
                                            }
                                        </tr>
                                    )
                                }
                                <tr>
                                    <td colSpan={2}>Umumiy</td>
                                    {
                                        orderState?.kindergartenContractList[0]?.productContracts.map((prod, index) =>
                                            <td key={index}>
                                                {totalByProduct(index)}
                                            </td>
                                        )
                                    }
                                </tr>
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
            </Form>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={round} id={"round"}>
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
                                step={"0.001"}
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
                        <Button variant="primary" type={'submit'} form={"round"}>
                            Tayyor
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <LoadingPage load={load}/>
        </div>
    );
}

export default OneOrder;
