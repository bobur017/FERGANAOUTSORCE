import React from 'react';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenuReport, oneDayFromAll } from "./ReportReducer";
import { useNavigate } from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import NavbarHeader from "../more/NavbarHeader";
import { getFileMultiMenuAll, getMultiMenuOne, replaceMenuDay } from "../multimenu/MultiMenuReducer";
import { timeout } from "workbox-core/_private";

function OneDayWithMttFromUsers() {
    const [fileType, setFileType] = useState();
    const dispatch = useDispatch();
    const history = useNavigate();
    const [replaceParams, setReplaceParams] = useState()
    const menuOneDay = useSelector(state => state.report.menuOneDay);
    const multiMenu = useSelector(state => state.multiMenu.multiMenu);
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
        if (firstUpdate.current) {
            console.log(multiMenu, "multiMenu")
        }
    }, [multiMenu]);


    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(oneDayFromAll());
        } else {
            if (stateSelector?.menu?.multiMenuId) {
                dispatch(getMultiMenuOne(stateSelector?.menu?.multiMenuId))
            }
            console.log(stateSelector, "stateSelector");
        }
    }, [stateSelector]);

    const getByDate = (e) => {
        dispatch(oneDayFromAll({ date: new Date(e.target.value).getTime() }));
        setReplaceParams({ ...replaceParams, time: new Date(e.target.value).getTime() });
    }
    const getFiles = (type) => {
        setFileType(type);
        dispatch(getMenuReport({ type, reportId: stateSelector?.id }))
    }

    const pushMenuId = () => {
        if (stateSelector?.menu?.id) {
            history("/sidebar/one-day-menu/" + stateSelector?.menu?.id)
        } else {
            toast.error("Bu kunga menyu biriktirilmagan!");
        }
    }
    const onSelectMenu = (e) => {
        setReplaceParams({ ...replaceParams, menuId: e.target.value });
    }
    const successReplaceMenu = () => {
        let time = new Date().getTime();
        if (replaceParams?.time) {
            time = replaceParams?.time;
        } else {
            setReplaceParams({ ...replaceParams, time })
        }
        dispatch(replaceMenuDay({ ...replaceParams, time }))
    }
    return (
        <div>
            <NavbarHeader name={"Kunlik taomnoma"} />
            <div className={"figma-card-first mt-3"}>
                <Container fluid={true}>
                    <Row className={'figma-card-first'}>
                        <Col className={'d-flex align-items-center justify-content-around'}>
                            {stateSelector?.kindergartenName !== null ?
                                <>
                                    <button className={'buttonInfo mx-1'}
                                        onClick={() => pushMenuId()}>Batafsil
                                    </button>
                                    <button className={'buttonPdf mx-1'} style={{ width: 100 }}
                                        onClick={() => getFiles("pdf")}>PDF
                                    </button>
                                    <button className={'buttonExcel mx-1'} onClick={() => getFiles("excel")}>Excel
                                    </button>
                                </>
                                : null}
                            <button className={'buttonPdf mx-1 d-flex'} style={{ width: 100 }}
                                onClick={() => dispatch(getFileMultiMenuAll())}>To'liq menyu
                            </button>
                        </Col>
                        <Col xs={6} sm={6} md={4}>
                            <Form.Label>Sana</Form.Label>
                            <Form.Control onChange={getByDate} type={'date'} name={'date'} />
                        </Col>
                    </Row>
                </Container>

                {stateSelector?.kindergartenName !== null ?
                    <div className={'figma-card mt-3'}>
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
                    </div> :
                    <div className={"figma-card text-center fs-3 mt-3"} style={{ color: '#e58107' }}>Bu kunga taomnoma
                        biriktirilmagan</div>}
                {stateSelector?.kidsNumber?.subDTO ? <div className={'figma-card mt-3'}>
                    <div className={'fs-5 fw-bolder'}> Kiritilgan bolalar soni</div>
                    {stateSelector?.kidsNumber?.subDTO?.map((age, index2) =>
                        < div key={index2} className={'infoText'}>
                            <div>{age?.ageGroupName}</div>
                            <div>{age?.number}</div>
                        </div>
                    )}
                </div> :
                    <div className={"figma-card text-center fs-3 mt-3"} style={{ color: '#e58107' }}>Bu kunga bolalar soni
                        kiritilmagan</div>}
            </div>
            <br />
            <Container fluid={true}>
                <Row className={'figma-card-first justify-content-between'}>
                    <Col xs={8} sm={8} md={8}>
                        <Form.Label>Tanlangan kun taomnomasini o'zgartirish uchun tanlang <br />
                            <span> {multiMenu?.name}dan</span></Form.Label>
                        <Form.Select defaultValue={replaceParams?.menuId || ""} onChange={(e) => onSelectMenu(e)}
                            name={"menuId"}>
                            <option value="">Taomnomalar</option>
                            {
                                multiMenu?.menuList?.map((item, index) =>
                                    <option value={item.id} key={index}>{item.name}</option>
                                )
                            }
                        </Form.Select>
                    </Col>
                    <Col className={'d-flex align-items-center'}>
                        {stateSelector?.kindergartenName !== null ?
                            <>
                                <button className={'buttonExcel mx-1 mt-4'}
                                    onClick={() => successReplaceMenu()}>ALMASHTIRISH
                                </button>
                            </>
                            : null}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default OneDayWithMttFromUsers;
