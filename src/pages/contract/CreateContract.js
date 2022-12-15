import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import DropdownCustom from "../more/DropdownCustom";
import {getSupplier} from "../supplier/SupplierReducer";
import {Form, FormLabel, InputGroup} from "react-bootstrap";
import {TimestampToInputDate} from "../funcs/Funcs";

function CreateContract() {
    const def = {
        "endDay": "",
        "kindergartenContractList": [
            {
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "kindergartenId": "",
                "productContracts": [
                    {
                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        "price": "",
                        "productId": "",
                        "weight": ""
                    }
                ]
            }
        ],
        "lotNumber": "string",
        "number": "string",
        "startDay": "",
        "supplierId": ""
    }
    const [state, setState] = useState();
    const dispatch = useDispatch();
    const [postStateContract, setPostStateContract] = useState(def);
    const suppliers = useSelector(state => state.supplier.suppliers)

    const firstUpdate = useRef(false);
    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getSupplier());
        }
    }, []);
    const getSupplierDrop = (data) => {
        console.log(data, "data");
    }
    const setDateValue = (e) => {
        console.log(e.target.value);
        setPostStateContract({...postStateContract, [e.target.name]: new Date(e.target.value)})
    }
    return (
        <div className={'w-100 figma-card'}>
            <div className={'w-100 d-flex justify-content-between align-items-center my-header shadow'}>
                <div>
                    <Form.Label>Ta'minotchi</Form.Label>
                    <DropdownCustom name={"Taminotchini tanlang"} setData={getSupplierDrop}
                                                        list={suppliers?.list}/></div>
                <div>
                    <Form.Label>LOT raqami</Form.Label>
                    <Form.Control
                        type={'text'}
                        value={postStateContract.lotNumber}
                        name={"lotNumber"}
                        size={'sm'}
                        onChange={setDateValue}
                    />
                </div>
                <div>
                    <Form.Label>Shartnoma raqami</Form.Label>
                    <Form.Control
                        type={'text'}
                        size={'sm'}
                        value={postStateContract.number}
                        name={"number"}
                        onChange={setDateValue}
                    />
                </div>
                <div>
                    <Form.Label>Boshlanish sanasi</Form.Label>
                    <Form.Control
                        type={'date'}
                        value={TimestampToInputDate(postStateContract.startDay)}
                        name={"startDay"}
                        size={'sm'}
                        onChange={setDateValue}
                    />
                </div>
                <div>
                    <Form.Label>Tugashsh sanasi</Form.Label>
                    {/*<InputGroup.Text >Tugashsh sanasi</InputGroup.Text>*/}
                    <Form.Control
                        type={'date'}
                        size={'sm'}
                        value={TimestampToInputDate(postStateContract.endDay)}
                        name={"endDay"}
                        onChange={setDateValue}
                    />
                </div>

            </div>
        </div>
    );
}

export default CreateContract;