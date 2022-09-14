import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";

function Default(props) {

    const [state,setState] = useState();
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    useEffect(()=>{
        if (!firstUpdate.current){
            firstUpdate.current = true;
        }
    },[])

    return (
        <div></div>
    );
}

export default Default;