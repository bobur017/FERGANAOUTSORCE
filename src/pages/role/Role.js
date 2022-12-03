import React from 'react';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Modal, Row, Table } from "react-bootstrap";
import {getRoles} from "../users/UserReducer";


function Role({getRoleId}) {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const roles = useSelector(state => state.user.roles)


    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getRoles())
        }else {
            console.log(roles);
        }
    }, [roles]);

    const onChangeRole = (data, number) => {

    }

    return (
        <Form.Select onChange={e=>getRoleId(e.target.value)} defaultValue={""} type={'text'} name={"roleId"} >
            <option value="">Lavozimni tanlang</option>
            {
                roles.map((role,index)=>
                    <option value={role.id} key={index}>{role.name}</option>
                )
            }
        </Form.Select>
    );
}

export default Role;