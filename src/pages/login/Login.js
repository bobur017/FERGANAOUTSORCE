import React, { useEffect, useRef } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import './loginPage.css';
import logo from './image/img.png';
import { useDispatch, useSelector } from "react-redux";
import {errorNull, login, tokenNull} from "./ReducerLogin";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Login() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.login.token)
    const error = useSelector(state => state.login.error)
    const result = useSelector(state => state.login.result)
    const firstUpdate = useRef(false);
    const history = useNavigate();

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
        }
    }, []);

    useEffect(() => {
        if (token?.user_role !== undefined) {
            localStorage.setItem("role", token?.user_role);
            localStorage.setItem("Authorization", "Bearer " + token?.access_token);
            localStorage.setItem("Refresh", "Bearer " + token?.refresh_token);
            console.log("Authorization", token?.access_token);
            if (token?.user_role === "ROLE_ADMIN") {
                history("/sidebar/admin");
            } else if (token?.user_role === "ROLE_SUPER_ADMIN") {
                history("/sidebar/super-admin");
            }else if (token?.user_role === "ROLE_OMBORCHI") {
                history("/sidebar/info");
            }else if (token?.user_role === "ROLE_HAMSHIRA") {
                history("/sidebar/info");
            }else if (token?.user_role === "ROLE_BOSHQARMA_BUXGALTER") {
                history("/sidebar/info");
            }else if (token?.user_role === "ROLE_RAXBAR") {
                history("/sidebar/info");
            }else if (token?.user_role === "ROLE_XODIMLAR_BO`LIMI" || token?.user_role === "ROLE_BO`LIM_BUXGALTER") {
                history("/sidebar/info");
            }
            dispatch(tokenNull())
            dispatch(errorNull())
        }
    }, [token]);

    useEffect(() => {
        if (!firstUpdate.current) {

        } else {
            toast.error(error?.code)
            console.log(error?.code)
        }
    }, [error]);

    const loginSubmit = (e) => {
        e.preventDefault();
        const qs = require('qs');
        const data = { username: e.target.username.value, password: e.target.password.value };
        dispatch(login(qs.stringify(data)));
    }

    return (<div>
        <Container fluid={true}>
            <Row>
                <Col xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                    <Row className={'loginPage justify-content-center'}>
                        <Col xs={12} sm={12} lg={12} xxl={12} className={'inner text-center'}>
                            <img src={logo} alt="" height={300} width={300} />
                            <div className={'logoButtomText'}>Tizimga kirish</div>
                            <Row className={'justify-content-center'}>
                                <Col xs={10} sm={8} md={8} lg={6} xl={6}>
                                    <Form id={'login'} onSubmit={loginSubmit}>
                                        <Form.Control name={'username'} type={'text'} minLength="1" size={'sm'}
                                            className={'mt-3'} placeholder={'Loginni kiriting'} />
                                        <Form.Control type={'password'} name={'password'} minLength="1" size={'sm'} className={'mt-3'}
                                            placeholder={'Parolni kiriting'} />
                                    </Form>
                                    <br />
                                    <Button size={'sm'} type={'submit'} form={'login'} style={{ width: '50%', backgroundColor: '#48B1AB' }}>
                                        <span >
                                            KIRISH
                                        </span>
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <div className={'topImage'}>

                    </div>
                    <div className={'buttomImage'}>
                        <div className={'p-5'}>

                            <span className={'textLogin1'}>
                                Farg`ona viloyati
                                Maktabgacha ta`lim
                                boshqarmasi
                            </span>
                            <br />
                            <span className={'textLogin2'}>
                                ovqatlantirishni nazorat qilish tizimi
                            </span>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>

    </div>);
}

export default Login;