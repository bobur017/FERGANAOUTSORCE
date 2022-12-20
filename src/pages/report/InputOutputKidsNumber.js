import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getInputOutputKidsNumber, inputOutput} from "./ReportReducer";
import {Col, Form, Row} from "react-bootstrap";
import NavbarHeader from "../more/NavbarHeader";
import {TimestampToInputDate} from "../funcs/Funcs";

function InputOutputKidsNumber({data}) {
    const [params, setParams] = useState({start: '', end: ''});
    const dispatch = useDispatch();
    const kidsNumber = useSelector(state => state.report.kidsNumber);
    const firstUpdate = useRef(false);


    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
        } else {
            console.log(kidsNumber, "inputOutputs");
            var fileDownload = require('js-file-download');
            fileDownload(data, 'Bolalar-soni-hisoboti.pdf');
        }
    }, [kidsNumber]);

    const onChangeDate = (e) => {
        if (e.target.type === 'date') {
            setParams({...params, [e.target.name]: new Date(e.target.value).getTime()})
        }
    }

    const getData = (e) => {
        e.preventDefault();
        dispatch(getInputOutputKidsNumber(params));
    }
    return (
        <div>
            <NavbarHeader name={"Bolalar soni hisoboti"}/>
            <div className={'figma-card-first mt-3'}>
                <div>
                    <Form onSubmit={getData}>
                        <Row className="mb-3 justify-content-around align-items-center">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Boshlanish sana</Form.Label>
                                <Form.Control name={'start'} type={'date'} onChange={onChangeDate}
                                              required
                                              value={TimestampToInputDate(params.start)}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Tugash sana</Form.Label>
                                <Form.Control name={'end'} type={'date'} onChange={onChangeDate}
                                              value={TimestampToInputDate(params.end)}
                                              required
                                              min={TimestampToInputDate(params.start)}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <button className={'createButtons mt-4'} type={'submit'}>Tayyor</button>
                            </Form.Group>
                        </Row>
                    </Form>
                </div>

            </div>
        </div>
    );
}

export default InputOutputKidsNumber;