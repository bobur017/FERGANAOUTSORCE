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
        menuOneDay: [],
        reports: [],
        inputOutput:{},
        kidsNumber:{},
        menuOneDayReport:{},
        menuOneDayReport2:'',
    },
    reducers: {
        kidsNumber: (state, action) => {
            state.kidsNumber = action.payload;
        },
        menuOneDay: (state, action) => {
            state.menuOneDay = action.payload;
        },
        menuOneDayReport: (state, action) => {
            state.menuOneDayReport = action.payload;
        },
        menuOneDayReport2: (state, action) => {
            state.menuOneDayReport2 = action.payload;
        },
        inputOutput: (state, action) => {
            state.inputOutput = action.payload;
        },
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

export const getMenuReport = (params) => apiCall({
    url: "/report/getMenuReport",
    method: "GET",
    headers: {
        Authorization: getToken(),
        // "Content-Type": "application/pdf"
    },
    // responseType:"blob",
    params,
    success: slice.actions.menuOneDayReport.type,
    error: slice.actions.errorReducer.type
})

export const getMenuReport2 = () => apiCall({
    url: "/attachment/file",
    method: "GET",
    headers: {
        Authorization: getToken(),
        "Content-Type": "application/octet-stream"
    },
    // params,
    responseType:"blob",
    success: slice.actions.menuOneDayReport2.type,
    error: slice.actions.errorReducer.type
})

export const inputOutput = (params) => apiCall({
    url: "/report/getReportInputOutPut",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.inputOutput.type,
    error: slice.actions.errorReducer.type
})

export const getInputOutputKidsNumber = (params) => apiCall({
    url: "/report/getKidsNumberReport",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.kidsNumber.type,
    error: slice.actions.errorReducer.type
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

export const oneDayFromAll = (params) => apiCall({
    url: "/report/getReportByDate",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
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