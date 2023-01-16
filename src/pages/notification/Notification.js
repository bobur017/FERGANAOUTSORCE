import React from 'react';
import NavbarHeader from "../more/NavbarHeader";
import {Col, Container, Row} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getNotification, getNotificationOne} from "./NotificationReducer";
import FromPageSizeBottom from "../fromPage/FromPageSizeBottom";

function Notification() {
    const [state, setState] = useState();
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notification.notifications)
    const notificationOne = useSelector(state => state.notification.notificationOne)
    const firstUpdate = useRef(false);
    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getNotification())
        }
    }, []);


    const getMessage = (id) => {
      dispatch(getNotificationOne(id))
    }

    return (
        <div>
            <NavbarHeader name={"Bildirish nomalar"}/>
            <Container fluid={true}>
                <Row>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                        <div className={'figma-card mt-3'}>
                            {notifications?.list?.length > 0 ? notifications?.list?.map((item, index) =>
                                <div key={index} onClick={()=>getMessage(item.id)} className={"shadow rows"}>{item.header}</div>
                            ) : <div className={"w-100 text-center fs-3 "} style={{color: 'red'}}>Xabarlar yo'q</div>}
                            <br/>
                            <FromPageSizeBottom/>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                        <div className={'figma-card mt-3'}>
                            {notificationOne?.message}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Notification;