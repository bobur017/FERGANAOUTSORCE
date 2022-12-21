import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

export const baseUrl = () => {
    return "http://185.217.131.74:8888/out/api/attachment/"
    // return "http://192.168.21.204:8888/out/api/attachment/"
}

export const baseUrl2 = () => {
<<<<<<< HEAD
    // return "https://feednet.uz/out/api"
    // return "http://185.237.15.42:8888/out/api"
    // return "https://32f4-188-113-207-71.in.ngrok.io/out/api"
    // return "http://192.168.8.100:8888/out/api"
    return "http://localhost:8888/out/api"
=======
    return "https://feednet.uz/out/api"
    // return "http://localhost:8888/out/api"
    // return "http://185.237.15.42:8888/out/api"
    // return "https://32f4-188-113-207-71.in.ngrok.io/out/api"
    // return "http://192.168.8.100:8888/out/api"
>>>>>>> 78c49d97fc2052a9a7241a0ebc52b4169b937aea
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