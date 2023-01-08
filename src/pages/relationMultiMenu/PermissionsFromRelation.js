import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changePermission, getPermission} from "../permission/PermissionReducer";
import CheckBoxCustom2 from "../more/CheckBoxCustom2";

function PermissionsFromRelation(props) {
    const [state, setState] = useState([]);
    const dispatch = useDispatch();
    const permissions = useSelector(state => state.permission.permissionsMenu)
    const result = useSelector(state => state.permission.result)
    const firstUpdate = useRef(false);
    useEffect(() => {
        if (!firstUpdate.current) {
        } else {
            dispatch(getPermission());
        }
    }, [  result]);
    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getPermission());
        } else {
            setState(permissions);
        }
    }, [permissions]);

    const getCheckedItem = (data) => {
        dispatch(changePermission(data));
    }

    const colorText = (name) => {
        if (name === "RUXSAT ETILGAN") {
            return '#56c44b'
        }else {
            return '#ff8c8c'
        }
    }

    return (
        <div className={'figma-card-first allMain'}>
            <div className={'tableCalendar'}>
                <table>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th></th>
                        <th>Nomi</th>
                        <th>Holati</th>
                        <th>O'zgartirish</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        state?.map((item, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className={item.state ? 'userStatusActive' : 'userStatusInActive'}></div>
                                </td>
                                <td>{item.name}</td>
                                <td style={{color:colorText(item.status)}}>{item.status}</td>
                                <td><button className={"buttonSuccess"} onClick={()=>getCheckedItem(item)}>O'zgartirish</button></td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PermissionsFromRelation;