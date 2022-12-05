import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";

export const baseUrl = () => {
    return "http://185.217.131.74:8888/out/api/attachment/"
    // return "http://192.168.21.204:8888/out/api/attachment/"
}

export const baseUrl2 = () => {
    return "https://feednet.uz/out/api"
    // return "http://185.217.15.41:8888/out/api"
    // return "http://192.168.231.204:8888/out/api"
}

function Default(props) {

    const [state, setState] = useState();
    const dispatch = useDispatch();
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