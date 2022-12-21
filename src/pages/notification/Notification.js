import React from 'react';
import NavbarHeader from "../more/NavbarHeader";
import {Col, Container, Row} from "react-bootstrap";

function Notification() {
    return (
        <div>
            <NavbarHeader name={"Bildirish nomalar"}/>
            <Container fluid={true}>
                <Row>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                        <div className={'figma-card mt-3'}>
                            Sizda bildirish noma mavjud emas
                        </div>
                    </Col>
                    <Col  xs={12} sm={12} md={8} lg={8} xl={8}>
                        <div className={'figma-card mt-3'}>
                            Asosiy
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Notification;