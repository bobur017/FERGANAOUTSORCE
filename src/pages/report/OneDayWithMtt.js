import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {oneDay} from "./ReportReducer";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function GetOneDayWithMtt({id}) {
    const dispatch = useDispatch();
    const history = useNavigate();
    const stateSelector = useSelector(state => state.report.oneDay)
    const firstUpdate = useRef(false);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            if (id) {

                dispatch(oneDay(id));
            } else {
                toast.error("Bu kunda menyu topilmadi!")
                // dispatch(oneDay());
            }
        } else {
            console.log(stateSelector, "stateSelector");
        }
    }, [stateSelector]);

    return (
        <div>
            <div className={'d-flex'}>
                <button className={'buttonInfo mx-1'}
                        onClick={() => history("/sidebar/one-day-menu/" + stateSelector?.menu?.id)}>Batafsil
                </button>
                <button className={'buttonPdf mx-1'}>PDF</button>
                <button className={'buttonExcel mx-1'}>Excel</button>
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

export default GetOneDayWithMtt;