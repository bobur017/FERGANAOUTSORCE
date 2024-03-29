import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getMenuOne} from "../multimenu/MultiMenuReducer";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {getRoleStorage, tableRowCustomTd3} from "../more/Functions";

function GetOneDayMenu() {
    const [state, setState] = useState();
    const dispatch = useDispatch();
    const history = useNavigate();
    const stateSelector = useSelector(state => state.multiMenu.menu)
    const firstUpdate = useRef(false);
    const reportId = useParams("id");
    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getMenuOne(reportId?.id))
        } else {
            console.log(stateSelector, "stateSelector");
        }
    }, [stateSelector]);
    const backFromRole = (text) => {
        if (text === "ROLE_OMBORCHI" || text === "ROLE_HAMSHIRA" || text === "ROLE_RAXBAR") {
            return "/sidebar/menu-mtt";
        } else {
            return "/sidebar/relation-view";
        }
    }

    return (
        <div>
            <div className={'figma-card'}>
                <div className={"d-flex justify-content-between"}>
                    <div>
                        <button className={"buttonPdf"} onClick={() => history(backFromRole(getRoleStorage()))}>ORTGA
                        </button>
                    </div>
                    <div className={"d-flex"}>
                        <div className={"mx-2 d-flex"}>
                            <Form.Label>Almashtirish kuni</Form.Label>
                            <div>

                            <Form.Control name={"dayMenyu"} type={"number"} size={'sm'} className={"mx-2"}/>
                            </div>
                        </div>
                        <div>

                            <button className={"buttonExcel mx-2"}
                                    onClick={() => history(backFromRole(getRoleStorage()))}>
                                TAYYOR
                            </button>
                        </div>
                    </div>
                </div>
                <Col xs={12} sm={12} md={12}
                     className={'text-center mt-3'}>
                    <Card className={'m-0'}>
                        <Card.Header
                            style={{backgroundColor: '#d7d6d6'}}>{stateSelector?.multiMenuName}sini</Card.Header>
                        <Card.Header style={{backgroundColor: '#d7d6d6'}}>{stateSelector.name}</Card.Header>
                        <Container fluid>
                            <Row className={'justify-content-center text-center'}>
                                {
                                    stateSelector?.mealTimeStandardList?.map((mealTime, index2) =>
                                        <Col key={index2} xs={12} sm={12} md={6} lg={6} xl={6}>
                                            <div
                                                className={'w-100 d-flex justify-content-between my-2 fw-bolder'}>{mealTime.mealTimeName}
                                            </div>
                                            <div className={'miniTable1'}>
                                                <table>
                                                    <thead>
                                                    <tr style={{fontSize: 20}}>
                                                        <th>#</th>
                                                        <th>Taom nomi</th>
                                                        <th>Yosh toifalari</th>
                                                        <th>Miqdori</th>
                                                    </tr>
                                                    </thead>
                                                    {mealTime?.mealAgeStandardList?.map((meal, index3) => {
                                                            return (
                                                                <tbody key={index3}>
                                                                <tr style={{fontSize: 20}}>
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
            </div>
        </div>
    );
}

export default GetOneDayMenu;
