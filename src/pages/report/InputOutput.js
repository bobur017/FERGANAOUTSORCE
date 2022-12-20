import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {inputOutput} from "./ReportReducer";
import {Form} from "react-bootstrap";
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
            var win = window.open(inputOutputs, '_blank');
            win.focus();
        }
    }, [inputOutputs]);

    const onChangeDate = (e) => {
        if (e.target.type === 'date') {
            setParams({...params, [e.target.name]: new Date(e.target.value).getTime()})
        }
    }

    const getData = () => {
        dispatch(inputOutput(params));
    }
    return (
        <div>
            <NavbarHeader name={"Kirim chiqim hisobotlari"}/>
            <div className={'figma-card'}>
                <div>
                    <Form onSubmit={getData}>

                        <div>
                            <Form.Label>Boshlanish sana</Form.Label>
                            <Form.Control name={'start'} type={'date'} onChange={onChangeDate}
                                          required
                                          value={TimestampToInputDate(params.start)}/>
                        </div>
                        <div>
                            <Form.Label>Tugash sana</Form.Label>
                            <Form.Control name={'end'} type={'date'} onChange={onChangeDate}
                                          value={TimestampToInputDate(params.end)}
                                          required
                                          min={TimestampToInputDate(params.start)}/>
                        </div>
                        <button className={'createButtons'} type={'submit'}>Tayyor</button>
                    </Form>
                </div>

            </div>
        </div>
    );
}

export default InputOutput;