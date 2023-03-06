import React from 'react'
import { useState ,CSSProperties} from "react";
// import { css } from "@emotion/react";
import ClockLoader from "react-spinners/ClockLoader";
import {useSelector} from "react-redux";

function LoadingPage() {
    const [stateLoader, setStateLoader] = useState(true);
    const load = useSelector(state => state.age.loading);
    if (!load) {
        return null;
    }
    return (
        <div className='headLoader'>
            <div className='loader'>
                <ClockLoader size={70} loading={stateLoader} />
                <br />
                <br />
                <br />
                <span style={{ fontSize: 30 }}>Iltimos jarayon yakunlanguncha kutib turing...</span>
            </div>
        </div>
    )
}

export default LoadingPage
