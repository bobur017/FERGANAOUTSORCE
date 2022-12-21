import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "notification",
    initialState: {
        result: {},
        error: {},
        notifications: [],
    },
    reducers: {
        notifications: (state, action) => {
            state.notifications = action.payload;
        },
        resultReducer: (state, action) => {
            state.result = action.payload;
            toast.success(action.payload?.text);
        },
        errorReducer: (state, action) => {
            state.error = action.payload;
            toastError(action.payload)
        },
    }
})

export const getNotification = () => apiCall({
    url: "/notification",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.notifications.type,
    error: slice.actions.errorReducer.type
})

export const deleteNotification = (data) => apiCall({
    url: "/notification/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addNotification = (data) => apiCall({
    url: "/notification",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editNotification = (data) => apiCall({
    url: "/notification/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export default slice.reducer;