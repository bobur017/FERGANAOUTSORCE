import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Form, InputGroup, Modal, Table} from "react-bootstrap";
import NavbarHeader from "../more/NavbarHeader";
import {getMealTime} from "../meal/MealTimeReducer";
import {addAge, editAge} from "../age/AgeReducer";
import {addMultiMenu, deleteMultiMenu, editMultiMenu, getFileMultiMenu, getMultiMenu} from "./MultiMenuReducer";
import {useNavigate} from "react-router-dom";
import main from "../relationMultiMenu/relationStyle.module.scss";
import ReactApexChart from "react-apexcharts";
import {colorTextStr} from "../funcs/Funcs";
import {RiDeleteBin2Fill} from "react-icons/ri";
import {BsPencilSquare} from "react-icons/bs";
import {AiOutlineFilePdf} from "react-icons/ai";

function MultiMenu() {
    const defaultData = {
        id: '',
        "daily": '',
        "mealTimeIdList": [],
        "name": ""
    }
    const pie = {
        series: [14, 85],
        options: {
            colors: ['#BABDC6', '#48B1AB'],
            labels: ['Bajarilmadi %', 'Bajarildi %'],
            chart: {
                type: 'donut',
            },
            legend: {
                show: false
            },
            dataLabels: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            total: {
                                showAlways: true,
                                show: true,
                                label: "Sanpin"
                            },
                        }
                    }
                }
            },

        },
    }
    const [multiMenuState, setMultiMenuState] = useState(defaultData);
    const [multiMenuList, setMultiList] = useState();
    const [number, setNumber] = useState(0);
    const dispatch = useDispatch();
    const mealTimes = useSelector(state => state.mealTime.mealTimes);
    const multiMenu = useSelector(state => state.multiMenu);
    const firstUpdate = useRef(false);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const history = useNavigate();
    const handleClose2 = () => {
        setMultiMenuState(defaultData);
        setShow2(false);
        setNumber(0);
    };
    const handleClose = () => {
        setMultiMenuState(defaultData);
        setShow(false);
        setNumber(0);
    };
    const handleShow = (num, data) => {
        if (num === 1) {
            setMultiMenuState({...multiMenuState, mealTimeIdList: mealTimes});
            setShow(true);
        } else if (num === 2) {
            setNumber(2);
            setMultiMenuState(data);
            history("/sidebar/multi-menu-one/"+data?.id);
        } else if (num === 3) {
        }
    };
    const handleShow2 = (num, data) => {
        if (num === 3) {
            setMultiMenuState(data);
        }
        setShow2(true);
    };


    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getMultiMenu());
            handleClose();
            handleClose2();
        }
    }, [multiMenu.result]);

    useEffect(() => {
        if (firstUpdate.current) {

        }
    }, [multiMenu.multiMenuFile]);

    useEffect(() => {
        setMultiList(multiMenu.multiMenuList)
    }, [multiMenu.multiMenuList]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getMealTime());
            dispatch(getMultiMenu());
        }
    }, []);

    const submitData = (e) => {
        e.preventDefault();
        if (multiMenuState.id !== '') {
            dispatch(editMultiMenu({name: multiMenuState.name}, multiMenuState));
        } else {
            dispatch(addMultiMenu({
                ...multiMenuState,
                mealTimeIdList: multiMenuState.mealTimeIdList.filter(item => item.checked).map(item => item.id)
            }));
        }
    }

    const onChangeItem = (index) => (e) => {
        if (e.target.name !== "mealTimeIdList") {
            setMultiMenuState({...multiMenuState, [e.target.name]:e.target.type ==="number"?parseInt( e.target.value) : e.target.value})
        } else {
            let list = [...multiMenuState.mealTimeIdList];
            list[index] = {...list[index], checked: e.target.checked}
            setMultiMenuState({...multiMenuState, mealTimeIdList: list});
        }
    }
    const pushUrl = (data) => {
        history("/sidebar/one-multi-menu-other/" + data.id);
    }
    const getFile = (data) => {
        dispatch(getFileMultiMenu(data));
    }

    return (
        <div className={'allMain'}>
            <NavbarHeader name={"Taomnomalar bo'limi"} buttonName={"Taomnoma qo'shish"}
                          handleShow={() => handleShow(1)}/>

            <div className={'figma-card mt-3'}>
                <div>
                    {multiMenuList?.map((item, index) =>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} className={''} key={index}>
                            <div className={"d-flex justify-content-between"}>
                            <button className={"d-flex buttonPdf m-1"} onClick={() => getFile(item)} ><AiOutlineFilePdf
                                color={'#E9573F'} size={25}/> <span className={"mx-3"}>yuklash</span></button>
                                {item.edit ? <div className={"d-flex justify-content-end w-25"}>
                                    <div style={{cursor: 'pointer'}} className={"mx-3"}
                                         onClick={() => handleShow2(3, item)}><RiDeleteBin2Fill color={'#E9573F'}
                                                                                                size={20}/></div>
                                    <div style={{cursor: 'pointer'}} onClick={() => handleShow(2, item)}><BsPencilSquare
                                        color={'orange'} size={20}/></div>
                                </div>:null}
                            </div>
                            <div className={'card px-2'}>
                                <div className={'d-flex justify-content-between align-items-center w-100'}>
                                    <div className={` my-Hover`}  onClick={()=>pushUrl(item)}>
                                        <span style={{fontSize: 25}} className={'fw-semibold'}>{item.name}</span>
                                        <br/>
                                        <span style={{fontSize: 20}}>{item.daily} kun uchun mo???ljallangan</span>
                                        <br/>
                                        <span>{item.regionalDepartmentName} tomonidan tuzilgan.</span>
                                    </div>
                                    <div className={'d-flex'}>
                                        <ReactApexChart options={{
                                            ...pie.options,
                                            colors: ['#BABDC6', colorTextStr(item.sanPinPercentage)],
                                            plotOptions: {
                                                pie: {
                                                    donut: {
                                                        labels: {
                                                            show: true,
                                                            total: {
                                                                showAlways: true,
                                                                show: true,
                                                                fontSize: '10px',
                                                                label: "Sanpin \n o'rtacha",
                                                                formatter: function (w) {
                                                                    return item.sanPinPercentage;
                                                                }
                                                            },
                                                        }
                                                    }
                                                }
                                            }
                                        }}
                                                        series={[item.sanPinPercentage > 100 ? 0 : 100 - item.sanPinPercentage, item.sanPinPercentage]}
                                                        type="donut" width={120}
                                                        height={150}/>
                                        <ReactApexChart options={{
                                            ...pie.options,
                                            colors: ['#BABDC6', colorTextStr(item.sanPinPercentageMax)],
                                            plotOptions: {
                                                pie: {
                                                    donut: {
                                                        labels: {
                                                            show: true,
                                                            total: {
                                                                showAlways: true,
                                                                show: true,
                                                                fontSize: '12px',
                                                                label: "Sanpin max",
                                                                formatter: function (w) {
                                                                    return item.sanPinPercentageMax;
                                                                }
                                                            },
                                                        }
                                                    }
                                                }
                                            }
                                        }}
                                                        series={[item.sanPinPercentageMax > 100 ? 0 : 100 - item.sanPinPercentageMax, item.sanPinPercentageMax]}
                                                        type="donut" width={120}
                                                        height={150}/>
                                        <ReactApexChart options={{
                                            ...pie.options,
                                            colors: ['#BABDC6', colorTextStr(item.sanPinPercentageMin)],
                                            plotOptions: {
                                                pie: {
                                                    donut: {
                                                        labels: {
                                                            show: true,
                                                            total: {
                                                                showAlways: true,
                                                                show: true,
                                                                fontSize: '10px',
                                                                label: "Sanpin min",
                                                                formatter: function (w) {
                                                                    return item.sanPinPercentageMin;
                                                                }
                                                            },
                                                        }
                                                    }
                                                }
                                            }
                                        }}
                                                        series={[item.sanPinPercentageMin > 100 ? 0 : 100 - item.sanPinPercentageMin, item.sanPinPercentageMin]}
                                                        type="donut" width={120}
                                                        height={150}/>
                                    </div>
                                </div>
                            </div>
                        </Col>)}
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={submitData}>
                    <Modal.Header closeButton>
                        <Modal.Title>Taomnoma</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label>Nomi</Form.Label>
                        <Form.Control type={'text'} required name={'name'} value={multiMenuState.name}
                                      onChange={onChangeItem(null)}/>
                        {number === 2 ? null : <>
                            <br/>
                            <Form.Label>Kunlar soni</Form.Label>
                            <Form.Control name={'daily'} type={'number'} onWheel={(e) => e.target.blur()} required
                                          onChange={onChangeItem(null)}
                                          max={31}
                                          min={1}
                            />
                            <br/>

                            <Form.Label>Ovqatlanish vaqtlari</Form.Label>
                            {multiMenuState?.mealTimeIdList?.map((item, index) =>
                                <div key={index}>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>{item.name}</InputGroup.Text>
                                        <InputGroup.Checkbox type={'checkbox'}
                                                             checked={item.checked ? item.checked : false}
                                                             onChange={onChangeItem(index)}
                                                             name={"mealTimeIdList"}/>
                                    </InputGroup>
                                </div>
                            )}
                        </>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Yopish
                        </Button>
                        <Button variant="primary" type={'submit'}>
                            Saqlash
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body><span style={{fontSize:20,color:'#f57f08'}}>{multiMenuState.name}</span>ni o'chirishni xohlaysizmi?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                        YO'Q
                    </Button>
                    <Button variant="primary" onClick={()=> dispatch(deleteMultiMenu(multiMenuState))}>
                        HA
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
        ;
}

export default MultiMenu;