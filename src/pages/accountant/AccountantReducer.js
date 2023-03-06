import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "accountant",
    initialState: {
        result: {},
        error: {},
        accountants: [],
    },
    reducers: {
        accountants: (state, action) => {
            state.accountants = action.payload;
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

export const getAccountant = () => apiCall({
    url: "/accountant",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.accountants.type,
    error: slice.actions.errorReducer.type
})

export const deleteAccountant = (data) => apiCall({
    url: "/accountant/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addAccountant = (data) => apiCall({
    url: "/accountant",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editAccountant = (data) => apiCall({
    url: "/accountant/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export default slice.reducer;
