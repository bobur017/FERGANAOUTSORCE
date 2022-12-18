import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addReport, deleteReport, editReport, getReport} from "./ReportReducer";
import {Button, Form, Modal, Row, Table} from "react-bootstrap";
import NavbarHeader from "../more/NavbarHeader";


function Report() {
    const [show, setShow] = useState(false);
    const [reportState, setReportState] = useState({id: '', name: ''});
    const [reports, setReports] = useState([]);
    const handleClose = () => {
        setShow(false);
        setReportState({id: '', name: ''});
    };
    const handleShow = () => {
        setShow(true)
    };


    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const report = useSelector(state => state.report)


    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getReport());
            handleClose();
        }
    }, [report.result])

    useEffect(() => {
        setReports(report.reports);
    }, [report.reports]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getReport());
        }
    }, [])

    const submitReport = (e) => {
        e.preventDefault();
        if (reportState.id !== '') {
            dispatch(editReport(reportState));
        } else {
            dispatch(addReport(reportState))
        }
    }
    const onClickDepartment = (data, number) => {
        if (number === 1) {
            setReportState(data);
            handleShow();
        } else if (number === 2) {
            dispatch(deleteReport(data));
        }
    }


    const onChanges = (param) => (e) => {
        setReportState({...reportState, [param]: e.target.value});
    }

    return (
        <div className={'allMain'}>
            <NavbarHeader name={"Yosh toifalari bo'limi"} handleShow={handleShow}
                          buttonName={"Yosh toifasini_qo'shish"}/>
            <br/>
            <div className={'figma-card'}>
                <div className={'tableCalendar'}>
                    <table style={{color: 'black'}}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Nomi</th>
                            <th>O'zgartirish</th>
                            <th>O'chirish</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            reports?.map((item, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>

                                    <td>
                                        <Button variant='outline-info' size='sm'
                                                onClick={() => onClickDepartment(item, 1)}>
                                            O'zgartirish
                                        </Button>
                                    </td>
                                    <td>
                                        <Button variant='outline-danger' size='sm'
                                                onClick={() => onClickDepartment(item, 2)}>
                                            O'chirish
                                        </Button>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={submitReport}>
                    <Modal.Header closeButton>
                        <Modal.Title>{reportState.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control name='name' required value={reportState.name} onChange={onChanges("name")}
                                      placeholder="Nomi "/>
                        <br/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Ortga
                        </Button>
                        <Button variant="primary" type='submit'>
                            Tayyor
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default Report;