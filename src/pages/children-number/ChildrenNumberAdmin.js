import React from 'react';
import {useEffect, useRef, useState} from "@types/react";
import {useDispatch, useSelector} from "react-redux";
import {getKidsNumbersAdmin} from "./ChildrenNumberReducer";

function ChildrenNumberAdmin(props) {
    const [state, setState] = useState();
    const dispatch = useDispatch();
    const stateSelector = useSelector(state => state.kidsNumber.kidsNumbersAdmin);
    const firstUpdate = useRef(false);
    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getKidsNumbersAdmin())
        }
    }, []);

    return (
        <div>

        </div>
    );
}

export default ChildrenNumberAdmin;