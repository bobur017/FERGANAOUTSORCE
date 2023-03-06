import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Container, Form, InputGroup, Modal, Offcanvas, Row, Table} from "react-bootstrap";
import NavbarHeader from "../more/NavbarHeader";
import {getAge} from "../age/AgeReducer";
import {addMultiMenuMeal, deleteMultiMenuOne, getMultiMenuOne} from "./MultiMenuReducer";
import {useNavigate, useParams} from "react-router-dom";
import {getMeal, getMealOne, getMealSanpin} from "../meal/MealReducer";
import DropdownCustom from "../more/DropdownCustom";
import {percentage, tableRowCustomTd3} from "../more/Functions";
import {colorText} from "../funcs/Funcs";
import {toast} from "react-toastify";

function MultiMenuOne() {
    const defaultData = {
        id: '', "ageStandardList": [
            {
                "ageGroupId": '',
                "weight": ''
            }
        ],
        "mealId": '',
        mealName: ''
    };
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setNumber(0);
    };

    const handleShow = (num, data) => {
        console.log(data, "Maaaaaaaaaaaaaaaaaana")
        if (num === 1) {
            setNumber(num);
            setMealState({
                ...mealState,
                ageStandardList: data?.ageStandardList,
                id: data?.id,
                mealName: '',
                mealId: ''
            });
            dispatch(getAge());
            dispatch(getMeal());
        } else if (num === 2) {
            setNumber(num);
        }
        setShow(true);
    };
    const [showCanvas, setShowCanvas] = useState(false);
    const handleCloseCanvas = () => setShowCanvas(false);
    const handleShowCanvas = () => setShowCanvas(true);

    const [multiMenuState, setMultiMenuState] = useState({});
    const [mealState, setMealState] = useState(defaultData);
    const [multiMenuId, setMultiMenuId] = useState(useParams("id"));
    const [number, setNumber] = useState(0);
    const dispatch = useDispatch();
    const mealOne = useSelector(state => state.meal.mealOne);
    const mealSanpin = useSelector(state => state.meal.mealSanpin);
    const meals = useSelector(state => state.meal.meals);
    const multiMenu = useSelector(state => state.multiMenu);
    const firstUpdate = useRef(false);
    const history = useNavigate();
    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getMultiMenuOne(multiMenuId.id));
            handleClose();
        }
    }, [multiMenu.result]);

    useEffect(() => {
        setMultiMenuState(multiMenu.multiMenu);
    }, [multiMenu.multiMenu]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getMultiMenuOne(multiMenuId.id));
        }
    }, []);

    const submitData = (e) => {
        e.preventDefault();
        dispatch(addMultiMenuMeal(mealState));
    }


    const onChangeItem = (index, data) => (e) => {
        if ((parseInt(e.target.value) >= 0 && parseInt(e.target.value) <= 250) || e.target.value === '') {
            if (mealState.mealId) {
                let list = [...mealState.ageStandardList];
                list[index] = {...list[index], [e.target.name]: e.target.value, ageGroupId: data.id}
                setMealState({...mealState, ageStandardList: list});
                dispatch(getMealSanpin({
                    multiMenuId: multiMenuId?.id,
                    mealId: mealState.mealId,
                }, list));
            }else {
                toast.error("Avval taomni tanlasg")
            }
        }
    }

    const getMealOnclicked = (data) => {
        dispatch(getMealOne(data?.id));
        dispatch(getMealSanpin({
            multiMenuId: multiMenuId?.id,
            mealId: data.id
        }, mealState.ageStandardList.map((item, index) => {
            return {...item, weight: '', ageGroupId: item.id};
        })));
        console.log(mealState.ageStandardList.map((item, index) => {
            return {...item, weight: '', ageGroupId: item.id};
        }), "mealState.ageStandardList")
        setMealState({
            ...mealState,
            mealName: data.name,
            mealId: data.id,
            ageStandardList: mealState.ageStandardList.map((item, index) => {
                return {...item, weight: '', ageGroupId: item.id};
            })
        })
    }
    const renderAddMealToMenu = () => {
        return (
            <Form onSubmit={submitData}>
                <Modal.Header closeButton>
                    <Modal.Title>Taomnoma</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DropdownCustom name={"Taomlar"} setData={getMealOnclicked} list={meals}/>
                    <br/>
                    <Form.Control type={"text"} disabled
                                  value={"Taom nomi : " + mealState.mealName} required onChange={onChangeItem()}/>
                    <br/>
                    {
                        mealState.ageStandardList?.map((item, index) =>
                            <InputGroup size="sm" className="mb-3" key={item?.id}>
                                <InputGroup.Text id="inputGroup-sizing-sm"
                                                 style={{width: '70%'}}>{item.name}</InputGroup.Text>
                                <Form.Control type={'number'} step={"0.001"} required name={"weight"} size={'sm'}
                                              value={item.weight ? item.weight : ""}
                                              onWheel={(e) => e.target.blur()}
                                              placeholder={"vazni"} onChange={onChangeItem(index, item)}/>
                            </InputGroup>
                        )
                    }<br/>
                    <div className={"d-flex w-100"}>
                        <div className={'miniTable2'}>
                            <table>
                                <thead>
                                <tr>
                                    <th>T/R</th>
                                    <th>Nomi</th>
                                    <th>Vazni</th>
                                </tr>
                                </thead>
                                <tbody>
                                {mealOne.map((item, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item?.name}</td>
                                        <td>{item?.weight}</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                        <div className={'miniTable'} style={{width: "70%",fontSize:20}}>
                            <table >
                                <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Nomi</th>
                                    <th>Yosh toifa</th>
                                    <th>Rejada</th>
                                    <th>Amalda</th>
                                    <th>Foiz</th>
                                </tr>
                                </thead>
                                {
                                    mealSanpin?.map((item, index) => {
                                            return (
                                                <tbody key={index}>
                                                {
                                                    item?.ageGroupSanpinNormList?.map((sanpinNorm, index2) => {
                                                        if (index2 !== 0) {
                                                            return (
                                                                <tr key={index2}>
                                                                    <td style={{maxWidth: 100}}>{sanpinNorm?.ageGroupName}</td>
                                                                    <td className={'text-center'}>{sanpinNorm?.planWeight}</td>
                                                                    <td className={'text-center'}>{sanpinNorm?.doneWeight}</td>
                                                                    <td className={'text-center'}
                                                                        style={colorText(percentage(sanpinNorm?.doneWeight, sanpinNorm?.planWeight))}>{percentage(sanpinNorm?.doneWeight, sanpinNorm?.planWeight)} %
                                                                    </td>
                                                                </tr>
                                                            )
                                                        } else {
                                                            return (<tr key={index2}>
                                                                <td rowSpan={item?.ageGroupSanpinNormList.length}>{index + 1}</td>
                                                                <td rowSpan={item?.ageGroupSanpinNormList.length}
                                                                    style={{maxWidth: 100}}>{item.sanpinCategoryName}</td>
                                                                <td className={'text-center'}>{item?.ageGroupSanpinNormList[0].ageGroupName}</td>
                                                                <td className={'text-center'}>{item?.ageGroupSanpinNormList[0].planWeight}</td>
                                                                <td className={'text-center'}>{item?.ageGroupSanpinNormList[0].doneWeight}</td>
                                                                <td className={'text-center'}
                                                                    style={colorText(percentage(item?.ageGroupSanpinNormList[0].doneWeight, item?.ageGroupSanpinNormList[0].planWeight))}>{percentage(item?.ageGroupSanpinNormList[0].doneWeight, item?.ageGroupSanpinNormList[0].planWeight)} %
                                                                </td>
                                                            </tr>)
                                                        }
                                                    })
                                                }
                                                </tbody>
                                            )
                                        }
                                    )
                                }
                            </table>
                        </div>
                    </div>
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
        )
    }
    const myRender = () => {
        if (number === 1) {
            return renderAddMealToMenu();
        }
    }
    const deleteOnclick = (data) => {
        dispatch(deleteMultiMenuOne(data))
    }
    const back = () => {
        history("/sidebar/multiMenu")
    }


    return (
        <div className={'allMain'}>
            <NavbarHeader name={multiMenuState.name + " taomnoma"}
                          handleShow={handleShowCanvas}/>
            <Container fluid>
                <Row>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} className={'figma-card-first mt-3'}>
                        <Row>
                            <div>
                                <button className={"buttonPdf"} onClick={() => back()}>Ortga</button>
                            </div>
                            {
                                multiMenuState?.menuList?.map((menu, index) =>
                                    <Col key={index} xs={12} sm={12} md={12} lg={6} xl={6}
                                         className={'text-center mt-3'}>
                                        <Card className={'m-0'}>
                                            <Card.Header style={{backgroundColor: '#d7d6d6'}}>{menu.name}</Card.Header>
                                            <Container fluid>
                                                <Row className={'justify-content-center text-center'}>
                                                    {
                                                        menu?.mealTimeStandardList?.map((mealTime, index2) =>
                                                            <Col key={index2} xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                <div
                                                                    className={'w-100 d-flex justify-content-between my-2 fw-bolder'}>{mealTime.mealTimeName}
                                                                    <button className={'createButtons mx-2'}
                                                                            style={{fontSize: 13}}
                                                                            onClick={() => handleShow(1, mealTime)}>Taom
                                                                        qo'shish
                                                                    </button>
                                                                </div>
                                                                <div className={'miniTable'}>
                                                                    <table>
                                                                        <thead>
                                                                        <tr>
                                                                            <th>#</th>
                                                                            <th>Taom nomi</th>
                                                                            <th>Yosh toifalari</th>
                                                                            <th>Miqdori</th>
                                                                            <th>O'chirish</th>
                                                                        </tr>
                                                                        </thead>
                                                                        {mealTime?.mealAgeStandardList?.map((meal, index3) => {
                                                                                return (
                                                                                    <tbody key={index3}>
                                                                                    <tr>
                                                                                        <td rowSpan={meal.ageStandardList.length}>{index3 + 1}</td>
                                                                                        <td rowSpan={meal.ageStandardList.length}>{meal.mealName}</td>
                                                                                        <td>
                                                                                            {
                                                                                                meal?.ageStandardList[0].ageGroupName
                                                                                            }
                                                                                        </td>
                                                                                        <td>
                                                                                            {meal?.ageStandardList[0].weight}
                                                                                        </td>
                                                                                        <td rowSpan={meal.ageStandardList.length}>
                                                                                            <Button
                                                                                                variant={"outline-danger"}
                                                                                                size={"sm"}
                                                                                                onClick={() => deleteOnclick(meal)}>
                                                                                                O'chiirish
                                                                                            </Button>
                                                                                        </td>
                                                                                    </tr>
                                                                                    {
                                                                                        tableRowCustomTd3(meal?.ageStandardList)
                                                                                    }
                                                                                    </tbody>
                                                                                )
                                                                            }
                                                                        )}
                                                                    </table>
                                                                </div>
                                                            </Col>
                                                        )
                                                    }
                                                </Row>
                                            </Container>
                                        </Card>
                                    </Col>
                                )
                            }
                        </Row>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4} className={'figma-card-first mt-3'}>
                        <div className={'miniTable'}>
                            <table>
                                <thead>
                                <tr>
                                    <th>№</th>
                                    <th style={{maxWidth: 100}}>Nomi</th>
                                    <th>Yosh toifa</th>
                                    <th>Rejada</th>
                                    <th>Amalda</th>
                                    <th>Foiz</th>
                                </tr>
                                </thead>
                                {
                                    multiMenuState?.sanpinMenuNorm?.map((item, index) => {
                                            return (
                                                <tbody key={index}>
                                                {
                                                    item?.ageGroupSanpinNormList?.map((sanpinNorm, index2) => {
                                                        if (index2 !== 0) {
                                                            return (
                                                                <tr key={index2}>
                                                                    <td style={{maxWidth: 100}}>{sanpinNorm?.ageGroupName}</td>
                                                                    <td className={'text-center'}>{sanpinNorm?.planWeight}</td>
                                                                    <td className={'text-center'}>{sanpinNorm?.doneWeight}</td>
                                                                    <td className={'text-center'}
                                                                        style={colorText(percentage(sanpinNorm?.doneWeight, sanpinNorm?.planWeight))}>{percentage(sanpinNorm?.doneWeight, sanpinNorm?.planWeight)} %
                                                                    </td>
                                                                </tr>
                                                            )
                                                        } else {
                                                            return (<tr key={index2}>
                                                                <td rowSpan={item?.ageGroupSanpinNormList.length}>{index + 1}</td>
                                                                <td rowSpan={item?.ageGroupSanpinNormList.length}
                                                                    style={{maxWidth: 100}}>{item.sanpinCategoryName}</td>
                                                                <td className={'text-center'}>{item?.ageGroupSanpinNormList[0].ageGroupName}</td>
                                                                <td className={'text-center'}>{item?.ageGroupSanpinNormList[0].planWeight}</td>
                                                                <td className={'text-center'}>{item?.ageGroupSanpinNormList[0].doneWeight}</td>
                                                                <td className={'text-center'}
                                                                    style={colorText(percentage(item?.ageGroupSanpinNormList[0].doneWeight, item?.ageGroupSanpinNormList[0].planWeight))}>{percentage(item?.ageGroupSanpinNormList[0].doneWeight, item?.ageGroupSanpinNormList[0].planWeight)} %
                                                                </td>
                                                            </tr>)
                                                        }
                                                    })
                                                }
                                                </tbody>
                                            )
                                        }
                                    )
                                }
                            </table>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose} size={number === 1 ? "lg" : ""}>
                {
                    myRender()
                }
            </Modal>
            <Offcanvas show={showCanvas} onHide={handleCloseCanvas}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
        ;
}

export default MultiMenuOne;
