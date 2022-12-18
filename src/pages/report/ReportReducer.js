import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "report",
    initialState: {
        result: {},
        error: {},
        oneDay: {},
        reports: [],
    },
    reducers: {
        reports: (state, action) => {
            state.reports = action.payload;
        },
        oneDay: (state, action) => {
            state.oneDay = action.payload;
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

export const getReport = () => apiCall({
    url: "/report",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.reports.type,
    error: slice.actions.errorReducer.type
})

export const oneDay = (id) => apiCall({
    url: "/report/getReportById/"+id,
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.oneDay.type,
    error: slice.actions.errorReducer.type
})

export const deleteReport = (data) => apiCall({
    url: "/report/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addReport = (data) => apiCall({
    url: "/report",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editReport = (data) => apiCall({
    url: "/report/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export default slice.reducer;