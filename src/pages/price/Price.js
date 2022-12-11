import React from 'react';
import NavbarHeader from "../more/NavbarHeader";
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";

function Price() {
    const [state, setState] = useState();
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
        }
    }, []);


    return (
        <div className={"allMain"}>
            <NavbarHeader name={"Mahsulot narxlari"}/>
                <Row className={'mt-3'}>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                        <div className={'figma-card'}></div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                        <div className={'figma-card'}></div>
                    </Col>
                </Row>

            Narx navo
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Price;