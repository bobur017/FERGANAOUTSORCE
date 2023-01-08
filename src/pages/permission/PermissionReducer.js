import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "permission",
    initialState: {
        result: {},
        error: {},
        permissionsMenu: [],
    },
    reducers: {
        permissions: (state, action) => {
            state.permissionsMenu = action.payload;
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

export const getPermission = () => apiCall({
    url: "/permission",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.permissions.type,
    error: slice.actions.errorReducer.type
})

export const changePermission = (data) => apiCall({
    url: "/permission/" + data.id,
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addPermission = (data) => apiCall({
    url: "/permission",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editPermission = (data) => apiCall({
    url: "/permission/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export default slice.reducer;