import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMenuReport, getMenuReport2, oneDay, oneDayFromAll} from "./ReportReducer";
import {TimestampToInputDate} from "../funcs/Funcs";
import {useNavigate} from "react-router-dom";
import {Col, Container, Form, Row} from "react-bootstrap";
import fileDownload from "js-file-download";
import {baseUrl2} from "../../Default";
import FileDownload from "js-file-download";
import {toast} from "react-toastify";
import NavbarHeader from "../more/NavbarHeader";

function OneDayWithMttFromUsers({id}) {
    const [fileType, setFileType] = useState();
    const dispatch = useDispatch();
    const history = useNavigate();
    const menuOneDay = useSelector(state => state.report.menuOneDay);
    const stateSelector = useSelector(state => state.report.oneDay)
    const menuOneDayReport = useSelector(state => state.report.menuOneDayReport)
    const firstUpdate = useRef(false);
    const FileDownload = require('js-file-download');

    useEffect(() => {
        if (!firstUpdate.current) {

        } else {

        }
    }, [menuOneDayReport]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(oneDayFromAll());
        } else {
            console.log(stateSelector, "stateSelector");
        }
    }, [stateSelector]);

    const getByDate = (e) => {
        dispatch(oneDayFromAll({date: new Date(e.target.value).getTime()}));
    }
    const getFiles = (type) => {
        setFileType(type);
        console.log("ishlashi kerak")
        dispatch(getMenuReport({type, reportId: stateSelector?.id}))
    }

    const pushMenuId = () => {
        if (stateSelector?.menu?.id) {
            history("/sidebar/one-day-menu/" + stateSelector?.menu?.id)
        } else {
            toast.error("Bu kunga menyu biriktirilmagan!")
        }
    }
    return (
        <div>
            <NavbarHeader name={"Kunlik taomnoma"}/>
            <div className={"figma-card-first mt-3"}>
                {stateSelector?.kindergartenName !== null ? <Container fluid={true}>
                    <Row className={'figma-card-first'}>
                        <Col className={'d-flex align-items-center justify-content-around'}>

                            <button className={'buttonInfo mx-1'}
                                    onClick={() => pushMenuId()}>Batafsil
                            </button>
                            <button className={'buttonPdf mx-1'} style={{width: 100}}
                                    onClick={() => getFiles("pdf")}>PDF
                            </button>
                            <button className={'buttonExcel mx-1'} onClick={() => getFiles("excel")}>Excel</button>
                        </Col>
                        <Col>
                            <Form.Label>Sana</Form.Label>
                            <Form.Control onChange={getByDate} type={'date'} name={'date'}/>
                        </Col>
                    </Row>
                </Container>:null}
                {stateSelector?.kindergartenName !== null ? <div className={'figma-card mt-3'}>
                    <div>
                        <div className={'fs-5 fw-bolder mb-2'}>Taomnoma</div>
                        <div className={'infoText'}>
                            <div>MTT</div>
                            <div>{stateSelector?.kindergartenName}</div>
                        </div>
                        <div className={'infoText'}>
                            <div>Sana</div>
                            <div>{stateSelector.year + "-" + stateSelector.month + "-" + stateSelector.day}</div>
                        </div>
                        <div className={'infoText'}>
                            <div>Menyu nomi</div>
                            <div>{stateSelector?.menu?.multiMenuName}</div>
                        </div>
                        <div className={'infoText'}>
                            <div>Kuni</div>
                            <div>{stateSelector?.menu?.name}</div>
                        </div>
                    </div>
                </div>: <div className={"figma-card text-center fs-3 mt-3"} style={{color:'#e58107'}}>Bu kunga taomnoma biriktirilmagan</div>}
                <div className={'figma-card mt-3'}>
                    <div className={'fs-5 fw-bolder'}> Kiritilgan bolalar soni</div>
                    {stateSelector?.kidsNumber?.subDTO?.map((age, index2) =>
                        < div key={index2} className={'infoText'}>
                            <div>{age?.ageGroupName}</div>
                            <div>{age?.number}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OneDayWithMttFromUsers;