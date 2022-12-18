import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getMenuOne} from "../multimenu/MultiMenuReducer";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {tableRowCustomTd3} from "../more/Functions";

function GetOneDayMenu() {
    const [state, setState] = useState();
    const dispatch = useDispatch();
    const stateSelector = useSelector(state => state.multiMenu.menu)
    const firstUpdate = useRef(false);
    const reportId = useParams("id");
    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getMenuOne(reportId?.id))
        }else {
            console.log(stateSelector,"stateSelector")
        }
    }, [stateSelector]);

    return (
        <div>
           <div className={'figma-card'}>
                       <Col xs={12} sm={12} md={12}
                            className={'text-center mt-3'}>
                           <Card className={'m-0'}>
                               <Card.Header style={{backgroundColor: '#d7d6d6'}}>{stateSelector?.multiMenuName}sini</Card.Header>
                               <Card.Header style={{backgroundColor: '#d7d6d6'}}>{stateSelector.name}</Card.Header>
                               <Container fluid>
                                   <Row className={'justify-content-center text-center'}>
                                       {
                                           stateSelector?.mealTimeStandardList?.map((mealTime, index2) =>
                                               <Col key={index2} xs={12} sm={12} md={6} lg={6} xl={6}>
                                                   <div
                                                       className={'w-100 d-flex justify-content-between my-2 fw-bolder'}>{mealTime.mealTimeName}
                                                   </div>
                                                   <div className={'miniTable'}>
                                                       <table>
                                                           <thead>
                                                           <tr>
                                                               <th>#</th>
                                                               <th>Taom nomi</th>
                                                               <th>Yosh toifalari</th>
                                                               <th>Miqdori</th>
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