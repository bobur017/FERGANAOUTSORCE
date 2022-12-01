import {toast} from "react-toastify";
import React from "react";

export const getToken = () => {
    return localStorage.getItem("Authorization");
}
export const getRefreshToken = () => {
    return localStorage.getItem("Refresh");
}
export const toastError = (error) => {
    toast.error(error?.response?.data?.text);
    toast.error(error?.response);
    toast.error(error?.response?.error);
    toast.error(!error?.response?.data?.text ? error.message + "\n  " + error.code : undefined);
}
export const checkSame = (array, data, paramA, paramB) => {
    let has = false;
    array.forEach(item => {
        if (item[paramA] === data[paramB]) {
            has = true;
        }

    })
    return has;
}
export const deleteSame = (array, data, paramA, paramB) => {
    return array.filter(item =>
        item[paramA] !== data[paramB]
    )
}

export const tableRowCustomTd3 = (maiList) => {

    return (
        maiList?.map((item, index) => {
            if (index !== 0){
                return (
                    <tr key={("a" + index) + 1}>
                        <td>{item.ageGroupName}</td>
                        <td>{item.weight}</td>
                    </tr>
                );
            }
            }
        ));
}