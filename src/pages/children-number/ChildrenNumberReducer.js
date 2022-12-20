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
        kidsNumber: {},
    },
    reducers: {
        kidsNumbers: (state, action) => {
            state.kidsNumbers = action.payload;
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