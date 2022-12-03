import React from 'react';
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {addUserRegion, getRoles} from "./UserReducer";
import NavbarHeader from "../more/NavbarHeader";
import Role from "../role/Role";

function Users() {
    const [show, setShow] = useState(false);
    const [roleId, setRoleId] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [userState, setUserState] = useState({name: '', role: '', photoFile: '',});
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
        }
    }, [])

    const getRoleInRole = (id) => {
        console.log(id)
        setUserState({...userState, role: id});
    }
    const onChangeState = (e) => {
        setUserState({...userState, [e.target.name]: e.target.value});
    }

    const submit = (e) => {
        e.preventDefault();
        console.log(userState)
    }
    return (
        <div>
            <NavbarHeader name={"Xodimlar bo'limi"} buttonName={"Xodim qo'shish"} handleShow={handleShow}/>
            <Container>
                <Row>
                    <Col></Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={submit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label>Lavozimni tanlang</Form.Label>
                        <Role getRoleId={getRoleInRole}/>
                        <Form.Control name={'name'} value={userState.name} onChange={onChangeState}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" size={'sm'} onClick={handleClose}>
                            Ortga
                        </Button>
                        <Button variant="primary" size={'sm'} type={'submit'}>
                            Saqlash
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default Users;