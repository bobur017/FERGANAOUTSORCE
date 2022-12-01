import axios from "axios";
import {baseUrl} from "./pages/funcs/Funcs";
import {useNavigate} from "react-router-dom";
import {getRefreshToken} from "./pages/more/Functions";

const api = ({dispatch}) => (next) => (action) => {
    if (action.type !== 'api/call') {
        next(action);
        return;
    } else {
        const {url, method, data, headers, params, success, error} = action.payload;
        console.log(data, url, "data");
        axios({
            baseURL: baseUrl(),
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
            if (err?.response.status === 403) {
                if (err?.response?.data?.error_message?.startsWith("The Token has expired")) {
                    renewAccessToken();
                }
            }else {
            dispatch({
                type: error,
                payload: err
            });
            console.log(err, "error");
            }
        });
        const renewAccessToken = () => {
            axios({
                url: baseUrl() + "/token/refresh",
                method: "GET",
                headers: {
                    Authorization: getRefreshToken()
                }
            }).then(res => {
                localStorage.setItem("Authorization", "Bearer " + res.data?.access_token);
                localStorage.setItem("Refresh", "Bearer " + res.data?.refresh_token);
                axios({
                    baseURL: baseUrl(),
                    url,
                    method,
                    data,
                    headers:{...headers,Authorization: "Bearer " +res.data?.access_token},
                    params
                }).then(res => {
                    dispatch({
                        type: success,
                        payload: res.data
                    });
                }).catch(err => {
                    dispatch({
                        type: error,
                        payload: err
                    });

                });
            }).catch(errors => {
                // if (errors?.response.status === 403) {
                    if (errors?.response?.data?.refresh_error_message?.startsWith("The Token has expired")) {
                        window.history.pushState("object or string", "Title", "/");
                        window.location.reload();

                    }
                // }
            })
        }
    }
}

export default api;
