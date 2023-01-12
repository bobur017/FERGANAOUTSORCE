import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    addPack,
    deletePack,
    editPack,
    getPack
} from "./ProductPackReducer";
import {Button, Form, Modal, Row, Table} from "react-bootstrap";
import NavbarHeader from "../more/NavbarHeader";
import {getProduct} from "../product/ProductReducer";
import DropdownCustom from "../more/DropdownCustom";


function ProductPack() {
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [productState, setProductState] = useState({id: '', name: 'Mahsulot tanlang'});
    const [packState, setProductPackState] = useState();
    const [packs, setProductPacks] = useState([]);
    const handleClose = () => {
        setShow(false);
        setEdit(false);
        setProductPackState({id: '', name: ''});
    };
    const handleShow = (data) => {
        console.log(data)
       if (data == null){
           console.log("keldi")
           setProductState({id:'',name:"Mahsulot tanlang"})
       }
        setShow(true);
    };
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const pack = useSelector(state => state.pack)
    const products = useSelector(state => state.product.products)
    useEffect(() => {
        if (!firstUpdate.current) {

        } else {
            setEdit(false);
            handleClose()
            dispatch(getPack());
        }
    }, [pack.result])

    useEffect(() => {
        setProductPacks(pack?.packs);
    }, [pack?.packs]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getPack());
            dispatch(getProduct());
        }
    }, [])

    const submitProductPack = (e) => {
        e.preventDefault();
        dispatch(addPack(productState?.id, packState))
    }
    const onClickDepartment = (data, number) => {
        if (number === 1) {
            setEdit(true);
            setProductPackState(data);
            setProductState({name: data?.productName, id: data?.productId})
            handleShow();
        } else if (number === 2) {
            dispatch(deletePack(data));
        }
    }


    const onChanges = (param) => (e) => {
        setProductPackState({...packState, [param]: e.target.value});
    }

    const getProductOnSelect = (data) => {
        setProductState(data);
    }
    return (
        <div className={'allMain'}>
            <NavbarHeader name={"Mahsulot qadoqlari bo'limi"} handleShow={handleShow}
                          buttonName={"Mahsulot qadoq'ini qo'shish"}/>
            <br/>
            <div className={'figma-card'}>
                {packs?.list?.length > 0 ? <div className={'tableCalendar'}>
                    <table style={{color: 'black'}}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Nomi</th>
                            <th>Qadoq miqdori</th>
                            <th>O'zgartirish</th>
                            <th>O'chirish</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            packs?.list?.map((item, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.productName}</td>
                                    <td>{item.pack}</td>

                                    <td>
                                        <Button variant='outline-info' size='sm'
                                                onClick={() => onClickDepartment(item, 1)}>
                                            O'zgartirish
                                        </Button>
                                    </td>
                                    <td>
                                        <Button variant='outline-danger' size='sm'
                                                onClick={() => onClickDepartment(item, 2)}>
                                            O'chirish
                                        </Button>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>:<div className={"text-center"}>Ma'lumot mavjud emas</div> }
            </div>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={submitProductPack}>
                    <Modal.Header closeButton>
                        {!edit ? <Modal.Title><DropdownCustom name={productState?.name} list={products}
                                                             setData={getProductOnSelect}/></Modal.Title> :
                            <Modal.Title>{packState?.productName}</Modal.Title>}
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label>Qadoq miqdori</Form.Label>
                        <Form.Control name='pack' required value={packState?.pack} onChange={onChanges("pack")}
                                      placeholder="Qadoq miqdorini kiriting " type={'number'} step={"0.01"}
                                      min={3}
                                      max={5000}
                                      onWheel={e => e.target.blur()}/>
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
        </div>
    );
}

export default ProductPack;