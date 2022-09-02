import React from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import './loginPage.css'
import logo from './image/img.png'
import logo1 from './image/img_1.png'
import logo2 from './image/img_2.png'

function Login() {


    const loginSubmit = (e) => {
      e.preventDefault();
    }
    return (<div>
        <Container fluid={true}>
            <Row>
                <Col xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                    <Row className={'loginPage justify-content-center'}>
                        <Col xs={12} sm={12} lg={12} xxl={12} className={'inner text-center'}>
                            <img src={logo} alt="" height={300} width={300}/>
                            <div className={'logoButtomText'}>Tizimga kirish</div>
                            <Row className={'justify-content-center'}>
                                <Col xs={10} sm={8} md={8} lg={6} xl={6}>
                                    <Form id={'login'} onSubmit={loginSubmit}>
                                        <Form.Control name={'userName'} type={'text'} minlength="5" size={'sm'}
                                                      className={'mt-3'} placeholder={'Loginni kiriting'}/>
                                        <Form.Control type={'password'} name={'password'} minlength="8" size={'sm'} className={'mt-3'}
                                                      placeholder={'Parolni kiriting'}/>
                                    </Form>
                                    <br/>
                                    <Button variant={'primary'} size={'sm'} type={'submit'} form={'login'} style={{width:'50%',backgroundColor:'#52AAFB'}}>
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
                            <br/>
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