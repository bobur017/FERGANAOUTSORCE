import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {inputOutput} from "./ReportReducer";
import {Col, Form, Row} from "react-bootstrap";
import NavbarHeader from "../more/NavbarHeader";
import {TimestampToInputDate} from "../funcs/Funcs";

function InputOutput({data}) {
    const [params, setParams] = useState({start: '', end: ''});
    const dispatch = useDispatch();
    const inputOutputs = useSelector(state => state.report.inputOutput);
    const firstUpdate = useRef(false);


    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
        } else {

        }
    }, [inputOutputs]);

    const onChangeDate = (e) => {
        if (e.target.type === 'date') {
            setParams({...params, [e.target.name]: new Date(e.target.value).getTime()})
        }
    }

    const getData = (e) => {
        e.preventDefault();
        dispatch(inputOutput(params));
    }
    return (
        <div>
            <NavbarHeader name={"Kirim chiqim hisobotlari"}/>
            <div className={'figma-card mt-3'}>
                    <Form onSubmit={getData}>
                        <Row className="mb-3 align-items-center">
                            <Form.Group as={Col}>
                                <Form.Label>Boshlanish sana</Form.Label>
                                <Form.Control name={'start'} type={'date'} onChange={onChangeDate}
                                              required
                                              value={TimestampToInputDate(params.start)}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Tugash sana</Form.Label>
                                <Form.Control name={'end'} type={'date'} onChange={onChangeDate}
                                              required
                                              value={TimestampToInputDate(params.end)}
                                              min={TimestampToInputDate(params.start)}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <button className={'createButtons mt-4'} type={'submit'}>Tayyor</button>
                            </Form.Group>
                        </Row>

                    </Form>

            </div>
        </div>
    );
}

export default InputOutput;