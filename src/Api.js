import axios from "axios";

const api = ({ dispatch }) => (next) => (action) => {
    if (action.type !== 'api/call') {
        next(action);
        return;
    } else {
        const { url, method, data, headers, params, success, error } = action.payload;
        console.log(data, url, "data");
        axios({
            // baseURL: "https://jsonplaceholder.typicode.com",
            // baseURL: "https://futboluz.uz",
            // baseURL: "http://192.168.82.204:7788/api",
            baseURL: "http://192.168.43.241:7788/api",
            // baseURL: "https://obhavouz.uz",
            url,
            method,
            data,
            headers,
            params
        }).then(res => {
            dispatch({
                type: success,
                payload: res.data
            });
            console.log(res.data, "success");
        }).catch(err => {
            dispatch({
                type: error,
                payload: err?.response?.data
            });
            console.log(err?.response?.data, "error");
        });
    }
}
export default api;