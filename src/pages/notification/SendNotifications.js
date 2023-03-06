import React from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import NavbarHeader from "../more/NavbarHeader";
import CheckBoxCustom2 from "../more/CheckBoxCustom2";
import {getRolesGet} from "../users/UserReducer";
import {addNotification} from "./NotificationReducer";
import {toast} from "react-toastify";

function SendNotifications() {
    const def = {
        "header": "string",
        "message": "string",
        "roleIdList": []
    }
    const [role, setRole] = useState([]);
    const dispatch = useDispatch();
    const roles = useSelector(state => state.user.rolesGet);
    const result = useSelector(state => state.notification.result);
    const firstUpdate = useRef(false);

    useEffect(() => {
        if (firstUpdate.current) {
            setRole(roles);
        }
    }, [roles]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getRolesGet());
        }
    }, []);

    const checkedRole = (data, checked, index) => {
        let item = [...role];
        item[index] = {...data, checked};
        setRole(item);
    }
    const allChecked = (checked) => {
        setRole(role.map((item, index) => {
            return {...item, checked}
        }))
    }

    const sendSubmit = (e) => {
        e.preventDefault();
        if (role.some(item => item.checked)) {
            dispatch(addNotification({
                ...def,
                header: e.target.header.value,
                message: e.target.message.value,
                roleIdList: role.filter(item => item.checked).map(item => item.id)
            }))
        }else {
            toast.error("Lavozimni tanlang");
        }
    }

    return (
        <Container fluid={true}>
            <NavbarHeader name={"Bildirishnoma yuborish bo'limi"}/>
            <Row>
                <Col className={"figma-card-first mt-3"} xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Form onSubmit={sendSubmit} id={"sendForm"}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Bildirishnoma sarlavhasi</Form.Label>
                            <Form.Control type="text" placeholder="Sarlavha" name={"header"} required={true}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Bildirishnoma matni</Form.Label>
                            <Form.Control as="textarea" rows={3} name={"message"} required={true}/>
                        </Form.Group>
                        <button className={"createButtons"} type={"submit"}>yuborish</button>
                    </Form>
                </Col>
                <Col className={"figma-card-first mt-3"} xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Row>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                            <CheckBoxCustom2 name={"positionName"} list={role} getChecked={checkedRole}
                                             allChecked={allChecked}/>
                        </Col>

                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default SendNotifications;
