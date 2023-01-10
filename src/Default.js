import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export const baseUrl = () => {
    return "https://feednet.uz/out/api/attachment/"
}

export const baseUrl2 = () => {
    // return "https://feednet.uz/out/api"
    // return "http://localhost:8888/out/api"
    // return "http://185.237.15.42:8888/out/api"
    return "http://192.168.8.100:8888/out/api"
}

function Default(props) {
    const [state, setState] = useState();
    const dispatch = useDispatch();
    const stateSelector = useSelector(state => state)
    const firstUpdate = useRef(false);
    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
        }
    }, []);

    return (
        <div></div>
    );
}

export default Default;