import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import DropdownCustom from "../more/DropdownCustom";
import {getSupplier} from "../supplier/SupplierReducer";
import {Form, FormLabel, InputGroup, Row} from "react-bootstrap";
import {TimestampToInputDate} from "../funcs/Funcs";
import {getProduct} from "../product/ProductReducer";
import {toast} from "react-toastify";
import {getMttDepartment} from "../mtt/MttReducer";
import {addContract} from "./ContractReducer";
import {MdDeleteForever} from "react-icons/md";
import {useNavigate} from "react-router-dom";

function CreateContract() {
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
    const [kindergartenState, setKindergartenState] = useState();
    const [productState, setProductState] = useState();
    const [departmentState, setDepartmentState] = useState({name: "Ta'minotchini tanlang"});
    const dispatch = useDispatch();
    const [postStateContract, setPostStateContract] = useState(def);
    const suppliers = useSelector(state => state.supplier.suppliers);
    const products = useSelector(state => state.product.products);
    const mttsByDepartment = useSelector(state => state.mtt.mttsByDepartment);
    const result = useSelector(state => state.contract.result);
    const firstUpdate = useRef(false);
    const history = useNavigate();

    useEffect(() => {
        if (!firstUpdate.current) {

        } else {
            history("/sidebar/contract");
        }
    }, [result]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getSupplier());
            dispatch(getProduct());
            dispatch(getMttDepartment());
        }
    }, []);
    const getSupplierDrop = (data) => {
        setDepartmentState(data);
        setPostStateContract({...postStateContract, supplierId: data?.id})
    }
    const setDateValue = (e) => {
        if (e.target.name === 'date') {
            setPostStateContract({...postStateContract, [e.target.name]: new Date(e.target.value)})
        } else {
            setPostStateContract({...postStateContract, [e.target.name]: e.target.value})
        }
    }
    const addProductInKinder = (data) => {
        if (postStateContract?.kindergartenContractList[0]?.productContracts.some(item => item?.productId === data?.id)) {
            toast.error("Bu mahsulot qo'shilgan!");
        } else {
            let kindergartenContractList = [...postStateContract?.kindergartenContractList];
            if (kindergartenContractList.length < 1) {
                kindergartenContractList = [...def.kindergartenContractList];
                kindergartenContractList[0] = {
                    ...kindergartenContractList[0], productContracts: [{
                        "price": 0,
                        "productId": data?.id,
                        "packWeight": 0,
                        pack: data?.pack,
                        productName: data?.name,
                        maxPrice: data?.price?.maxPrice
                    }]
                }
            } else {
                kindergartenContractList?.forEach((kinder, index) => {
                        let productContracts = [...kinder.productContracts].filter(item => item?.emptyy !== "empty");
                        productContracts.push({
                            "price": 0,
                            "productId": data?.id,
                            "packWeight": 0,
                            pack: data?.pack,
                            productName: data?.name,
                            maxPrice: data?.price?.maxPrice
                        });
                        kindergartenContractList[index] = {...kindergartenContractList[index], productContracts};
                    }
                )
            }
            setPostStateContract({...postStateContract, kindergartenContractList});
        }
    }
    const addToKindergarten = (data) => {
        let kindergartenContractList = [...postStateContract?.kindergartenContractList];
        if (postStateContract?.kindergartenContractList.some(item => item.kindergartenId === data?.id)) {
            toast.error("Bu MTT qo'shilgan!");
        } else {
            if (kindergartenContractList.length > 0) {
                let productContracts = [...kindergartenContractList[0]?.productContracts].map((product) => {
                        return {...product, price: 0, packWeight: 0};
                    }
                );
                if (kindergartenContractList[0].kindergartenId === "empty") {
                    kindergartenContractList[0] = {
                        ...kindergartenContractList[0],
                        "kindergartenId": data?.id,
                        kindergartenName: data?.name,
                        number: data?.number,
                        productContracts
                    }
                } else {
                    kindergartenContractList.push({
                        "kindergartenId": data?.id,
                        kindergartenName: data?.name,
                        number: data?.number,
                        productContracts
                    });
                }
            } else {

                kindergartenContractList.push({
                    "kindergartenId": data?.id,
                    kindergartenName: data?.name,
                    number: data?.number,
                    productContracts: def.kindergartenContractList[0].productContracts
                });
            }
            setPostStateContract({...postStateContract, kindergartenContractList});
        }
    }
    const changeProductWeight = (index, index2, pack) => (e) => {
        console.log(e.target.value);
        let kindergartenContractList = [...postStateContract?.kindergartenContractList];
        kindergartenContractList[index].productContracts[index2] = {
            ...kindergartenContractList[index].productContracts[index2],
            [e.target.name]: pack > 0 && pack ? parseInt(e.target.value) : e.target.value
        };
        setPostStateContract({...postStateContract, kindergartenContractList});
    }
    const onClickProductWeight = (kinder, product) => {
        setProductState(product);
        setKindergartenState(kinder);
    }
    const changePrice = (index2) => (e) => {
        let kindergartenContractList = [...postStateContract.kindergartenContractList];
        let raget = e.target.value === '' ? 0 : parseFloat(e.target.value).toFixed(2);
        console.log(kindergartenContractList[0].productContracts[index2]?.maxPrice,"price")
        if (kindergartenContractList[0].productContracts[index2]?.maxPrice >= raget || !kindergartenContractList[0].productContracts[index2]?.maxPrice) {
        postStateContract.kindergartenContractList.forEach((kin, index) => {
                    kindergartenContractList[index].productContracts[index2] = {
                        ...kindergartenContractList[index].productContracts[index2],
                        price: e.target.value
                    };
                }

        );
        setPostStateContract({...postStateContract, kindergartenContractList});
        }else {
            toast.error("Max narxdan oshmasligi kerak!");
        }
    }
    const changePrice2 = (index) => {
        let kindergartenContractList = [...postStateContract.kindergartenContractList];
        setProductState(kindergartenContractList[0].productContracts[index]);
    }
    const submit = (e) => {
        e.preventDefault();
        if (postStateContract.supplierId === '' || postStateContract.kindergartenContractList.some(item => item.id === "empty")) {
            toast.error("Barcha joylar to'ldirilishi shart");
        } else {
            dispatch(addContract(postStateContract));
        }

    }
    const totalByProduct = (index) => {
        let total = 0;
        postStateContract.kindergartenContractList.forEach((kin) =>
            total += parseFloat(kin?.productContracts[index]?.packWeight)
        );
        return total.toFixed(2);
    }
    const removeProduct = (id) => {
        let kindergartenContractList = [...postStateContract?.kindergartenContractList];
        kindergartenContractList?.forEach((kinder, index) => {
                let productContracts = [...kinder.productContracts].filter(item => item?.productId !== id);
                kindergartenContractList[index] = {...kindergartenContractList[index], productContracts};
            }
        )
        setPostStateContract({...postStateContract, kindergartenContractList});
    }
    const removeKinder = (id) => {
        let kindergartenContractList = [...postStateContract?.kindergartenContractList].filter((item => item.kindergartenId !== id));
        setPostStateContract({...postStateContract, kindergartenContractList});
    }
    return (
        <div className={'w-100'}>
            <Form onSubmit={submit}>
                <div className={'w-100 d-flex justify-content-between align-items-center my-header shadow'}>
                    <div>
                        <Form.Label>Ta'minotchi</Form.Label>
                        <DropdownCustom name={departmentState.name} setData={getSupplierDrop}
                                        list={suppliers?.list}/></div>
                    <div>
                        <Form.Label>LOT raqami</Form.Label>
                        <Form.Control
                            type={'text'}
                            required
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
                            required
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
                            value={TimestampToInputDate(postStateContract.endDay)}
                            name={"endDay"}
                            required
                            min={TimestampToInputDate(postStateContract.startDay)}
                            onChange={setDateValue}
                        />
                    </div>
                </div>
                <div className={'figma-card mt-3'}>
                    <div className={' d-flex'}>
                        <div className={'miniTable2'} style={{overflowX: 'auto'}}>
                            <table>
                                <thead>
                                <tr>
                                    <th style={{width: 10}}>№</th>
                                    <th>MTT</th>
                                    {
                                        postStateContract?.kindergartenContractList[0]?.productContracts?.map((product, index) =>
                                            <th key={index} style={{maxWidth: 100}}>
                                                <div>
                                                    <div style={{
                                                        minWidth: 50,
                                                        textAlign: 'center'
                                                    }}>{product?.productName}</div>
                                                    <MdDeleteForever size={20} color={'red'}
                                                                     onClick={() => removeProduct(product?.productId)}
                                                                     style={{cursor: 'pointer'}}/>
                                                </div>
                                            </th>
                                        )
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                <tr style={{backgroundColor: '#dad9d9'}}>
                                    <td colSpan={2}>Narx</td>
                                    {
                                        postStateContract?.kindergartenContractList[0]?.productContracts.map((prod, index) =>
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
                                                       disabled={!(prod?.productId === productState?.productId)}
                                                       onChange={changePrice(index)}/>

                                            </td>
                                        )
                                    }
                                </tr>
                                {
                                    postStateContract?.kindergartenContractList?.map((kinder, index) =>
                                        <tr key={index}>
                                            <td style={{width: 10}}>{index + 1}</td>
                                            <td style={{width: 100}} className={"d-flex justify-content-between"}>
                                                <span>{kinder?.number}{kinder?.kindergartenName}</span><MdDeleteForever
                                                size={20} color={'red'}
                                                onClick={() => removeKinder(kinder?.kindergartenId)}
                                                style={{cursor: 'pointer'}}/></td>

                                            {
                                                kinder?.productContracts?.map((prod, index2) =>
                                                    <td key={index2} onClick={() => onClickProductWeight(kinder, prod)}>
                                                        <input className={"myTdInput"} type="number"
                                                               name={'packWeight'}
                                                               value={prod?.packWeight}
                                                               onWheel={e => e.target.blur()}
                                                               required
                                                               disabled={!(kinder?.kindergartenId === kindergartenState?.kindergartenId && prod?.productId === productState?.productId)}
                                                               onChange={changeProductWeight(index, index2, prod?.pack)}/>

                                                    </td>
                                                )
                                            }
                                        </tr>
                                    )
                                }
                                <tr>
                                    <td colSpan={2}>Umumiy</td>

                                    {
                                        postStateContract?.kindergartenContractList[0]?.productContracts.map((prod, index) =>
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
                                            setData={addProductInKinder}/>
                        </div>
                    </div>
                    <DropdownCustom name={"MTT +"} list={mttsByDepartment}
                                    setData={addToKindergarten}/>
                    <button className={'createButtons mt-3'} type={'submit'}>TAYYOR</button>
                </div>
            </Form>
        </div>
    );
}

export default CreateContract;