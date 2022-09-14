import {toast} from "react-toastify";

export const getToken = () => {
    return localStorage.getItem("Authorization");
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