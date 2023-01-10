import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getInputOutputKidsNumber, inputOutput} from "./ReportReducer";
import {Col, Form, Row} from "react-bootstrap";
import NavbarHeader from "../more/NavbarHeader";
import {TimestampToInputDate} from "../funcs/Funcs";
import {getKidsNumbersByDate} from "../children-number/ChildrenNumberReducer";
import {toast} from "react-toastify";

function InputOutputKidsNumber({data}) {
    const [params, setParams] = useState({startDate: '', endDate: ''});
    const dispatch = useDispatch();
    const kidsNumbersByDate = useSelector(state => state.kidsNumber.kidsNumbersByDate);
    const kidsNumber = useSelector(state => state.report.kidsNumber);
    const firstUpdate = useRef(false);


    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
        } else {

        }
    }, [kidsNumber]);

    const onChangeDate = (e) => {
        if (e.target.type === 'date') {
            setParams({...params, [e.target.name]: new Date(e.target.value).getTime()})
        }
    }

    const getDataFile = () => {
        if (kidsNumbersByDate.length > 0) {
            dispatch(getInputOutputKidsNumber(params));
        } else {
            toast.error("Ma'lumotlar mavjud emas!");
        }
    }
    const getData = (e) => {
        e.preventDefault();
        dispatch(getKidsNumbersByDate({id: 0}, params));
    }
    const colors = (name) => {
        if (name === "TASDIQLANDI") {
            return "#029605";
        } else {
            return "#e16107";
        }
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
                                <Form.Control name={'startDate'} type={'date'} onChange={onChangeDate}
                                              required
                                              value={TimestampToInputDate(params.startDate)}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Tugash sana</Form.Label>
                                <Form.Control name={'endDate'} type={'date'} onChange={onChangeDate}
                                              value={TimestampToInputDate(params.endDate)}
                                              required
                                              min={TimestampToInputDate(params.startDate)}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPassword" className={"d-flex"}>
                                <button className={'createButtons mt-4 mx-3'} type={'submit'}>Tayyor</button>
                                <button className={'buttonPdf mt-4'} type={'submit'} onClick={getDataFile}>PDF
                                </button>
                            </Form.Group>
                        </Row>
                    </Form>
                </div>

            </div>
            <div xs={7} sm={7} md={7} lg={7} xl={7} className={'figma-card-first mt-3'}>
                {kidsNumbersByDate.length > 0 ? <div className={"tableCalendar"}>
                    <table>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>MTT nomi</th>
                            {
                                kidsNumbersByDate.length > 0 ? kidsNumbersByDate[0].subDTO.map((item, index) =>
                                    <th key={index}>{item.ageGroupName}</th>
                                ) : null
                            }
                            <th>Holati</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            kidsNumbersByDate.map((item, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.date?.join("-")}</td>
                                    {
                                        item.subDTO.map((item2, index2) =>
                                            <td key={index2}>{item2.number}</td>
                                        )
                                    }
                                    <td style={{color: colors(item.status), fontWeight: 600}}>{item.status}</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div> : <div className={"text-center"}>Bu kunda ma'lumot mavjud emas</div>}
            </div>
        </div>
    );
}

export default InputOutputKidsNumber;