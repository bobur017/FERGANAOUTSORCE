import axios from "axios";
import { getRefreshToken } from "./pages/more/Functions";
import { baseUrl2 } from "./Default";
import { loadingStart } from "./pages/age/AgeReducer";

const api = ({ dispatch }) => (next) => (action) => {
    if (action.type !== 'api/call') {
        next(action);
        return;
    } else {
        dispatch(loadingStart(true));
        const { url, method, data, headers, params, success, error } = action.payload;
        console.log(data, url, "data");
        axios({
            baseURL: baseUrl2(),
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
            dispatch(loadingStart(false));
            console.log(res.data, "success");
        }).catch(err => {
            if (err?.response.status === 403 || err?.response.status === 502) {
                if (err?.response?.data?.error_message?.startsWith("The Token has expired")
                    || err?.response?.data?.startsWith("<html>\r\n<head><title>502 Bad Gateway")) {
                    // window.history.pushState("object or string", "Title", "/");
                    // window.location.reload();
                    console.log(err);
                } else {
                    dispatch(loadingStart(false));
                    dispatch({
                        type: error,
                        payload: err,
                    });
                    console.log(err, "error");
                }
            } else {
                dispatch({
                    type: error,
                    payload: err,
                });
                console.log(err, "error");
            }
        });
        const renewAccessToken = () => {
            axios({
                url: baseUrl2() + "/token/refresh",
                method: "GET",
                headers: {
                    Authorization: getRefreshToken()
                }
            }).then(res => {
                console.log(res.data?.refresh_token, "refresh");
                localStorage.setItem("Authorization", "Bearer " + res.data?.access_token);
                localStorage.setItem("Refresh", "Bearer " + res.data?.refresh_token);
                axios({
                    baseURL: baseUrl2(),
                    url,
                    method,
                    data,
                    headers: { ...headers, Authorization: "Bearer " + res.data?.access_token },
                    params,
                }).then(res => {
                    dispatch({
                        type: success,
                        payload: res.data
                    });
                }).catch(err => {
                    dispatch(loadingStart(false));
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
