import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "contract",
    initialState: {
        result: {},
        error: {},
        contracts: [],
        contractFile: {},
    },
    reducers: {
        contracts: (state, action) => {
            state.contracts = action.payload;
        },
        contract: (state, action) => {
            state.contract = action.payload;
        },
        contractFile: (state, action) => {
            state.contractFile = action.payload;
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

export const getContractOne = (id) => apiCall({
    url: "/contract/" + id,
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.contract.type,
    error: slice.actions.errorReducer.type
})

export const getContract = () => apiCall({
    url: "/contract",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.contracts.type,
    error: slice.actions.errorReducer.type
})

export const getContractFile = () => apiCall({
    url: "/contract",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.contractFile.type,
    error: slice.actions.errorReducer.type
})

export const deleteContract = (data) => apiCall({
    url: "/contract/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addContract = (data) => apiCall({
    url: "/contract",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const contractVerified = (id) => apiCall({
    url: "/contract/verified/" + id,
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editContract = (data) => apiCall({
    url: "/contract/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export default slice.reducer;