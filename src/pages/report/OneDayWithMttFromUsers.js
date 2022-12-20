import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMenuReport, oneDay, oneDayFromAll} from "./ReportReducer";
import {TimestampToInputDate} from "../funcs/Funcs";
import {useNavigate} from "react-router-dom";
import {Form} from "react-bootstrap";
import fileDownload from "js-file-download";

function OneDayWithMttFromUsers({id}) {
    const [fileType,setFileType]=useState();
    const dispatch = useDispatch();
    const history = useNavigate();
    const menuOneDay = useSelector(state => state.report.menuOneDay);
    const stateSelector = useSelector(state => state.report.oneDay)
    const firstUpdate = useRef(false);

    useEffect(() => {
        if (!firstUpdate.current) {

        } else {
            console.log(menuOneDay, "menuOneDay");
                var fileDownload = require('js-file-download');
            if (fileType === 'pdf'){
                fileDownload(menuOneDay, 'Kunlik-menyu-hisoboti.pdf');
            }else {
                fileDownload(menuOneDay, 'Kunlik-menyu-hisoboti.xlsx');
            }
        }
    }, [menuOneDay]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(oneDayFromAll());
        } else {
            console.log(stateSelector, "stateSelector");
        }
    }, [stateSelector]);

    const getByDate = (e) => {
        dispatch(oneDayFromAll({date:new Date(e.target.value).getTime()}));
    }
    const getFiles = (type) => {
        setFileType(type);
        dispatch(getMenuReport({type,reportId:stateSelector?.id}))
    }

    return (
        <div>
            <div className={'d-flex figma-card justify-content-around'}>
                <div className={'d-flex align-items-center justify-content-around'}>

                <button className={'buttonInfo mx-1'}
                        onClick={() => history("/sidebar/one-day-menu/" + stateSelector?.menu?.id)}>Batafsil
                </button>
                <button className={'buttonPdf mx-1'} style={{width:100}} onClick={()=>getFiles("pdf")}>PDF</button>
                <button className={'buttonExcel mx-1'}  onClick={()=>getFiles("excel")}>Excel</button>
                </div>
                <div>
                    <Form.Label>Sana</Form.Label>
                    <Form.Control onChange={getByDate} type={'date'} name={'date'}/>
                </div>
            </div>
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
            </div>
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
    );
}

export default OneDayWithMttFromUsers;