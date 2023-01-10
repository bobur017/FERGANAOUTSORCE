import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {editLogin, editPassword, getUserData} from "./UserReducer";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import NavbarHeader from "../more/NavbarHeader";

function UserInfos() {
    const def ={
        "oldPassword": "",
        "username": ""
    }
    const [state, setState] = useState(def);
    const [number, setNumber] = useState();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userData)
    const firstUpdate = useRef(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (num) => {
        setState(def);
        setNumber(num);
        setShow(true)
    };

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;

        } else {
            console.log(user, "user");
        }
    }, [user]);

    const fromModal = () => {
        if (number === 1) {
            return editLoginCurrent();
        } else if (number === 2) {
            return editPasswordCurrent();
        }
    }
    const changeInputs = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }

    const submitParol = (e) => {
      e.preventDefault();
      dispatch(editPassword(state));
    }
    const submitLogin = (e) => {
        e.preventDefault();
        dispatch(editLogin(state));
    }
    const editLoginCurrent = () => {
        return (
            <Form onSubmit={submitLogin}>
                <Modal.Header className={'text-center fs-3'}  closeButton>Loginni o'zgartirish</Modal.Header>
                <Modal.Body>
                    <Form.Label>Yangi loginni kiriting</Form.Label>
                    <Form.Control required name={"username"} minLength={5} value={state.username} onChange={changeInputs}/>
                    <Form.Label>Joriy parolni kiriting</Form.Label>
                    <Form.Control required name={"oldPassword"} minLength={8} onChange={changeInputs}
                                  value={state.oldPassword}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Yopish
                    </Button>
                    <Button variant="primary" type={'submit'}>
                        Tayyor
                    </Button>
                </Modal.Footer>
            </Form>
        )
    }

    const editPasswordCurrent = () => {
        return (
            <Form onSubmit={submitParol}>
                <Modal.Header  closeButton className={"fs-4"}>Parolni o'zgartirish</Modal.Header>
                <Modal.Body>
                    <Form.Label>Joriy parolni kiriting</Form.Label>
                    <Form.Control required name={"oldPassword"} minLength={8} onChange={changeInputs}
                                  value={state.oldPassword}/>
                    <Form.Label>Yangi parolni kiriting</Form.Label>
                    <Form.Control required name={"newPassword1"} minLength={8} onChange={changeInputs}
                                  value={state.newPassword1}/>
                    <Form.Label>Yangi parolni takroran kiriting</Form.Label>
                    <Form.Control required name={"newPassword2"} minLength={8} onChange={changeInputs}
                                  value={state.newPassword2}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Yopish
                    </Button>
                    <Button variant="primary" type={'submit'}>
                        Tayyor
                    </Button>
                </Modal.Footer>
            </Form>
        )
    }
    return (
        <Container fluid>
            <NavbarHeader name={"Ma'lumotlar"}/>
            <Row className={'mt-3'}>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div className={'figma-card-first'}>
                        <div className={"my-4 fs-3 text-center fw-bolder"}>Mening ma'lumotlarim</div>
                        <div className={'infoText'}>
                            <div>Ismi</div>
                            <div>{user?.name}</div>
                        </div>
                        <div className={'infoText'}>
                            <div>Familyasi</div>
                            <div>{user?.surname}</div>
                        </div>
                        <div className={'infoText'}>
                            <div>Sharifi</div>
                            <div>{user?.fatherName}</div>
                        </div>
                        <div className={'infoText'}>
                            <div>Manzili</div>
                            <div>{user?.departmentName}</div>
                        </div>
                        <div className={'infoText'}>
                            <div>Telefon raqami</div>
                            <div>{user?.phoneNumber}</div>
                        </div>
                        <div className={'infoText'}>
                            <div>Lavozimi</div>
                            <div>{user?.positionName}</div>
                        </div>
                        <div className={'infoText'}>
                            <div>Login</div>
                            <div>{user?.username}</div>
                        </div>
                        <div className={'mt-3 d-flex justify-content-between'}>
                            <button className={"createButtons"} onClick={() => handleShow(1)}>Loginni o'zgartirish
                            </button>
                            <button className={"createButtons"} onClick={() => handleShow(2)}>Parolni o'zgartirish
                            </button>
                        </div>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} className={'figma-card-first d-flex justify-content-center'}>
                    <img
                        src="https://avatars.mds.yandex.net/i?id=0213782fa2f027aab3965b1d66e913c0195b45eb-5232391-images-thumbs&n=13&exp=1"
                        alt="" width={"70%"}/>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                {fromModal()}
            </Modal>

        </Container>
    );
}

export default UserInfos;