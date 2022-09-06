import axios from "axios";

const api = ({ dispatch }) => (next) => (action) => {
    if (action.type !== 'api/call') {
        next(action);
        return;
    } else {
        const { url, method, data, headers, params, success, error } = action.payload;
        console.log(data, url, headers, "data");
        axios({
            // baseURL: "https://jsonplaceholder.typicode.com",
            // baseURL: "https://futboluz.uz",
            baseURL: "http://192.168.43.241:8888/out/api",
            // baseURL: "http://192.168.91.204:8888/out/api",
            // baseURL: "http://192.168.91.204:7788",
            // baseURL: "http://185.217.131.74:8888/out/api",
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
                payload: err
            });
            console.log(err, "error");
        });
    }
}
export default api;