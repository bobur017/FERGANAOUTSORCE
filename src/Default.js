import React from 'react';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const baseUrl = () => {
    return "http://95.130.227.104:7788/out/api/"
    // return "http://192.168.0.119:8888/out/api/attachment/";
}

export const baseUrl3 = () => {
    // return "https://feednet.uz";
    return "http://95.130.227.104:7788/out/api/"
    // return "http://localhost:3000"
}
export const pushLogin = () => {
    localStorage.setItem("Authorization"," ");
    localStorage.setItem("Refresh"," ");
    window.history.pushState("object or string", "Title", "/");
    window.location.reload();
}

export const pushLogin2 = (url) => {
    localStorage.setItem("Authorization"," ");
    localStorage.setItem("Refresh"," ");
    window.history.pushState("object or string", "Title", `${url}`);
    window.location.reload();
}

export const baseUrl2 = () => {
    return "https://feednet.uz/out/api";
    // return "http://192.168.0.103:7788/out/api"
    // return "http://95.130.227.104:7788/out/api"
    // return "http://localhost:7788/out/api";
}
export const RolesName = {
    admin:"ROLE_ADMIN",
    texnolog:"ROLE_TEXNOLOG",
    super_admin:"ROLE_SUPER_ADMIN",
    buxgalter:"ROLE_BO`LIM_BUXGALTER",
    warehouser:"ROLE_OMBORCHI",
    hamshira:"ROLE_HAMSHIRA",
    director:"ROLE_RAXBAR",
    support_buxgalter:"ROLE_BOSHQARMA_BUXGALTER",
    cadr:"ROLE_XODIMLAR_BO`LIMI",
}

function Default(props) {
    const [state, setState] = useState();
    const dispatch = useDispatch();
    const stateSelector = useSelector(state => state);
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
