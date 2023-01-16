import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "kidsNumber",
    initialState: {
        result: {},
        error: {},
        kidsNumbers: [],
        kidsNumbersByDate: {},
        kidsNumbersByDepartment: {},
        kidsNumberDefault: [],
    },
    reducers: {
        kidsNumbers: (state, action) => {
            state.kidsNumbers = action.payload;
        },
        kidsNumberDefault: (state, action) => {
            state.kidsNumberDefault = action.payload;
        },
        kidsNumbersByDepartment: (state, action) => {
            state.kidsNumbersByDepartment = action.payload;
        },
        kidsNumbersByDate: (state, action) => {
            state.kidsNumbersByDate = action.payload;
        },
        kidsNumber: (state, action) => {
            state.kidsNumber = action.payload;
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

export const getDefaultKidsNumbers = (params) => apiCall({
    url: "/averageKidsNumber",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.kidsNumberDefault.type,
    error: slice.actions.errorReducer.type
})

export const addDefaultKidsNumbers = (data,id) => apiCall({
    url: "/averageKidsNumber/"+id,
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editDefaultKidsNumbers = (data,id) => apiCall({
    url: "/averageKidsNumber/"+id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const getKidsNumbersByDate = (data,params) => apiCall({
    url: "/kidsNumber/getAllByDate/"+data.id,
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.kidsNumbersByDate.type,
    error: slice.actions.errorReducer.type
})

export const getKidsNumbersByDepartment = (data,params) => apiCall({
    url: "/kidsNumber/getAllByDepartmentId/"+data.id,
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.kidsNumbersByDepartment.type,
    error: slice.actions.errorReducer.type
})

export const getKidsNumber = (params) => apiCall({
    url: "/kidsNumber",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.kidsNumbers.type,
    error: slice.actions.errorReducer.type
})

export const getKidsNumberOne = (params) => apiCall({
    url: "/kidsNumber/getOne",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.kidsNumber.type,
    error: slice.actions.errorReducer.type
})

export const deleteKidsNumber = (data) => apiCall({
    url: "/kidsNumber/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addKidsNumber = (data) => apiCall({
    url: "/kidsNumber",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const verifide = (data) => apiCall({
    url: "/kidsNumber/verified/"+data?.id,
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editKidsNumber = (data) => apiCall({
    url: "/kidsNumber/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export default slice.reducer;