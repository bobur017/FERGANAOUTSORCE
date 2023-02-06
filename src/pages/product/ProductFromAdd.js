import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProduct} from "./ProductReducer";
import DropdownCustom from "../more/DropdownCustom";
import {Form, InputGroup, Modal} from "react-bootstrap";
import {MdOutlineDelete} from "react-icons/md";
import {toast} from "react-toastify";
import {addWarehouse} from "../warehouse/WarehouseReducer";

function ProductFromAdd() {
    const [productState, setProductState] = useState();
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);
    const firstUpdate = useRef(false);
    useEffect(() => {
        if (firstUpdate.current) {

        }
    }, [products]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getProduct());
        }
    }, []);
    const getProductOne = (data) => {
        setProductState(data);
    }
    const changeWeight = (e) => {
        setProductState({
            ...productState,
            [e.target.name]: e.target.value
        });
    }
    const submitProduct = (e) => {
        e.preventDefault();
        dispatch(addWarehouse({
            productId: productState?.id,
            weight: productState?.weight,
            price: productState?.price,
        }))
    }
    return (
        <Form onSubmit={submitProduct}>
            <Modal.Header>
                <DropdownCustom list={products} name={"Mahsulot tanlash"} setData={getProductOne}/>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-1">
                    <InputGroup.Text id="basic-addon1 w-50"
                                     >{productState?.name ? productState?.name : "Mahsulot tanlang"}</InputGroup.Text>
                    <Form.Control
                        placeholder="Miqdor"
                        type={"number"}
                        step={"0.01"}
                        value={productState?.weight || ""}
                        name={"weight"}
                        onChange={changeWeight}
                        required
                    />

                </InputGroup>
                <InputGroup className="mb-1">
                    <InputGroup.Text id="basic-addon1 w-50">Narx kiriting</InputGroup.Text>
                    <Form.Control
                        placeholder="Narxi"
                        type={"number"}
                        step={"0.01"}
                        value={productState?.price || ""}
                        name={"price"}
                        onChange={changeWeight}
                        required
                    />

                </InputGroup>

            </Modal.Body>
            <Modal.Footer>
                <button className={"createButtons"}>Tayyor</button>
            </Modal.Footer>
        </Form>
    );
}

export default ProductFromAdd;