import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import {addProductContract, getAcceptedProduct, getAcceptedProductAll, getWarehouse} from "./WarehouseReducer";
import NavbarHeader from "../more/NavbarHeader";
import {getGetFiles} from "../getFiles/GetFilesReducer";
import {getRoleStorage} from "../more/Functions";
import FromPageSizeBottom from "../fromPage/FromPageSizeBottom";
import {TimestampToInputDate} from "../funcs/Funcs";
import MoreButtons from "../more/MoreButtons";
import {MdDeleteForever} from "react-icons/md";

function Warehouse() {
    const [wareHouseState, setWareHouseState] = useState();
    const [productReceived, setProductReceived] = useState({
        "id": "",
        "receivedWeight": 0
    });
    const [currentNavs, setCurrentNavs] = useState(0);
    const [currentNumber, setCurrentNumber] = useState(0);
    const [inOutList, setInOutList] = useState([]);
    const [productState, setProductState] = useState();
    const [productCurrent, setProductCurrent] = useState();
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
    const handleShow = (num) => {
        setCurrentNumber(num);
        setShow(true);
    }
    const handleShow2 = (list) => {
        setInOutList(list);
        setShow2(true);
    }

    useEffect(() => {
        if (!firstUpdate.current) {

        } else {

        }
    }, [getFiless]);

    useEffect(() => {
        if (!firstUpdate.current) {

        } else {
            dispatch(getAcceptedProduct());
            dispatch(getAcceptedProductAll());
            dispatch(getWarehouse());
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
        handleShow(1);
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
            let receivedWeight = productReceived?.pack > 0 ? (parseInt(e.target.value) * productReceived?.pack) : e.target.value;
            setProductReceived({...productReceived, receivedWeight, packWeight});
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
    const activeOrInActive = (data) => {
        setProductState(data);
    }
    const getDateMore = (index, data) => {
        setProductState(data);
        setProductCurrent({...warehouses?.list[index]});
        handleShow(2)
    }
    const inputProduct = () => {
        return (
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
                                  onWheel={event => event.target.blur()}
                                  max={TimestampToInputDate(productReceived.date)}/>
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
        )
    }
    const submitWaste = (e) => {
      e.preventDefault();

    }
    const wasteProduct = () => {
        return (
            <Form onSubmit={submitWaste}>
                <Modal.Header>{productCurrent?.productName}  miqdori:{productCurrent?.packWeight}</Modal.Header>
                <Modal.Body>
                    <Form.Label>KG / DONA</Form.Label>
                    <Form.Control type={"number"} name={"waste"} step={"0.01"} onWheel={e=>e.target.blur()} max={productCurrent?.packWeight}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"danger"} onClick={handleClose}>Ortga</Button>
                    <Button variant={"primary"} type={"submit"}>Tayyor</Button>
                </Modal.Footer>
            </Form>
        )
    }
    return (
        <div className={"allMain"}>
            <NavbarHeader
                navs={[{name: "Ombordagi mahsulotlar"}, {name: "Qabul qilingan mahsulotlar"}, getRoleStorage() === "ROLE_OMBORCHI" ? {name: "Mahsulot qabul qilish"} : '']}
                currentNavs={setCurrentNavs}/>
            <Container fluid={true} className={'mt-3'}>
                {currentNavs === 0 ? <Row>
                    {warehouses?.list?.length > 0 ? <Col className={'figma-card'}>
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
                                    <th>Qadoqlar soni</th>
                                    <th>Chiqid</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    warehouses?.list?.map((product, index) =>
                                        <tr key={index}
                                        >
                                            <td>{index + 1}</td>
                                            <td style={{cursor: 'pointer'}}
                                                onClick={() => handleShow2(product?.inOutList)}>{product.productName}</td>
                                            <td style={{cursor: 'pointer'}}
                                                onClick={() => handleShow2(product?.inOutList)}>{product.weight}</td>
                                            <td style={{cursor: 'pointer'}}
                                                onClick={() => handleShow2(product?.inOutList)}>{product.packWeight}</td>
                                            <td><MoreButtons list={[
                                                {name: "Chiqidga chiqarish", icon: <MdDeleteForever/>}
                                            ]} data={product} setActive={activeOrInActive}
                                                             active={productState?.id === product.id}
                                                             getDate={getDateMore}/></td>
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
                    </Col> : warehouses?.list ?
                        <div className={"text-center fs-3"} style={{color: 'red'}}>Ma'lumot mavjud emas </div> :
                        <div className={"text-center fs-3"} style={{color: 'red'}}>Qabul qilingan mahsulotlar mavjud
                            emas</div>}
                </Row> : null}
                {currentNavs === 2 ? <Row>
                    <Col className={'figma-card'}>
                        {acceptedProduct?.list?.length > 0 ? <div className={'tableCalendar'}>
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
                        </div> : warehouses?.list ?
                            <div className={"text-center fs-3"} style={{color: 'red'}}>Ma'lumot mavjud emas </div> :
                            <div className={"text-center fs-3"} style={{color: 'red'}}>Qabul qilingan mahsulotlar mavjud
                                emas</div>}
                    </Col>
                </Row> : null}
                {currentNavs === 1 ? <Row>
                    <Col className={'figma-card'}>
                        {acceptedProducts?.list?.length > 0 ? <div className={'tableCalendar'}>
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
                        </div> : warehouses?.list ?
                            <div className={"text-center fs-3"} style={{color: 'red'}}>Ma'lumot mavjud emas </div> :
                            <div className={"text-center fs-3"} style={{color: 'red'}}>Omborda ma'lumot mavjud
                                emas</div>}
                    </Col>
                </Row> : null}
            </Container>
            <Modal show={show} onHide={handleClose}>
                {currentNumber === 1 ? inputProduct():null}
                {currentNumber === 2 ? wasteProduct():null}
            </Modal>
            <Modal show={show2} onHide={handleClose2} size={"xl"}>
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
                                <th>Qadoqlar soni</th>
                                <th>Qadoq miqdori</th>
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
                                        <td>{TimestampToInputDate(product?.createDate)}</td>
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
            </Modal>
        </div>
    );
}

export default Warehouse;