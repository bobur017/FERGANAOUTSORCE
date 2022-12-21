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
import {addContract, editContract, getContract, getContractOne} from "./ContractReducer";
import {MdDeleteForever} from "react-icons/md";
import {useNavigate, useParams} from "react-router-dom";

function EditContract() {
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
                        "weight": ''
                    }
                ]
            }
        ],
        "lotNumber": '',
        "number": '',
        "startDay": '',
        "supplierId": ''
    }
    const contractId = useParams("id")
    const [kindergartenState, setKindergartenState] = useState();
    const [productState, setProductState] = useState();
    const [departmentState, setDepartmentState] = useState({name: "Ta'minotchini tanlang"});
    const dispatch = useDispatch();
    const [postStateContract, setPostStateContract] = useState(def);
    const suppliers = useSelector(state => state.supplier.suppliers);
    const products = useSelector(state => state.product.products);
    const mttsByDepartment = useSelector(state => state.mtt.mttsByDepartment);
    const contract = useSelector(state => state.contract.contract);
    const result = useSelector(state => state.contract.result);
    const firstUpdate = useRef(false);
    const history = useNavigate();

    useEffect(() => {
        if (!firstUpdate.current) {

        } else {
            setPostStateContract(contract);
        }
    }, [contract]);

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
            dispatch(getContractOne(contractId?.id));
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
            } else {
                kindergartenContractList?.forEach((kinder, index) => {
                        let productContracts = [...kinder.productContracts].filter(item => item?.emptyy !== "empty");
                        productContracts.push({
                            "price": 0,
                            "productId": data?.id,
                            "weight": 0,
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
                        return {...product, price: 0, weight: 0};
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
        let kindergartenContractList = [...postStateContract?.kindergartenContractList];
        let productLisy = [...kindergartenContractList[index].productContracts];
        productLisy[index2] = {
            ...productLisy[index2],
            weight: pack > 0 && pack ? parseInt(e.target.value) : e.target.value
        }
        kindergartenContractList[index] = {...kindergartenContractList[index], productContracts: productLisy};
        setPostStateContract({...postStateContract, kindergartenContractList});
    }
    const onClickProductWeight = (kinder, product) => {
        setProductState(product);
        setKindergartenState(kinder);
    }
    const changePrice = (index2) => (e) => {
        let kindergartenContractList = [...postStateContract.kindergartenContractList];
        postStateContract.kindergartenContractList.forEach((kin, index) => {
                let productLisy = [...kindergartenContractList[index].productContracts];
                productLisy[index2] = {...productLisy[index2], price: e.target.value}
                kindergartenContractList[index] = {...kindergartenContractList[index], productContracts: productLisy};
                setPostStateContract({...postStateContract, kindergartenContractList});
            }
        );
        setPostStateContract({...postStateContract, kindergartenContractList});
    }
    const submit = (e) => {
        e.preventDefault();
        if (postStateContract.supplierId === '' || postStateContract.kindergartenContractList.some(item => item.id === "empty")) {
            toast.error("Barcha joylar to'ldirilishi shart");
        } else {
            dispatch(editContract(postStateContract));
        }

    }
    const totalByProduct = (index) => {
        let total = 0;
        postStateContract.kindergartenContractList.forEach((kin) =>
            total += parseInt(kin?.productContracts[index]?.weight)
        );
        return total;
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
                                    <th>№</th>
                                    <th colSpan={2}>MTT</th>
                                    {
                                        postStateContract?.kindergartenContractList[0]?.productContracts?.map((product, index) =>
                                            <th key={index}>
                                                <div>{product?.productName}</div>
                                                <MdDeleteForever size={20} color={'red'}
                                                                 onClick={() => removeProduct(product?.productId)}
                                                                 style={{cursor: 'pointer'}}/>
                                            </th>
                                        )
                                    }

                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td colSpan={2}>Narx</td>
                                    {
                                        postStateContract?.kindergartenContractList[0]?.productContracts.map((prod, index) =>
                                            <td key={index}>
                                                <input className={"myTdInput"} type="number"
                                                       name={'price'}
                                                       value={prod?.price}
                                                       onWheel={e => e.target.blur()}
                                                       required
                                                       onChange={changePrice(index)}/>
                                                <span>{prod?.maxPrice}</span>
                                            </td>
                                        )
                                    }
                                </tr>
                                {
                                    postStateContract?.kindergartenContractList?.map((kinder, index) =>
                                        <tr key={index}>
                                            <td>{index + 2}</td>
                                            <td>{kinder?.number}{kinder?.kindergartenName}</td>
                                            <td><MdDeleteForever size={20} color={'red'}
                                                                 onClick={() => removeKinder(kinder?.kindergartenId)}
                                                                 style={{cursor: 'pointer'}}/></td>
                                            {
                                                kinder?.productContracts?.map((prod, index2) =>
                                                    <td key={index2} onClick={() => onClickProductWeight(kinder, prod)}>
                                                        <input className={"myTdInput"} type="number"
                                                               name={'weight'}
                                                               value={prod?.weight}
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
                                    <th colSpan={3}>Umumiy</th>
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
                        <DropdownCustom name={"Masulot +"} list={products}
                                        setData={addProductInKinder}/>

                    </div>
                    <DropdownCustom name={"MTT +"} list={mttsByDepartment}
                                    setData={addToKindergarten}/>
                    <button className={'createButtons mt-3'} type={'submit'}>TAYYOR</button>
                </div>
            </Form>
        </div>
    );
}

export default EditContract;