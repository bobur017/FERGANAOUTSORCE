import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "user",
    initialState: {
        result: {},
        error: {},
        users: [],
        roles: [],
    },
    reducers: {
        users: (state, action) => {
            state.users = action.payload;
        },
        resultReducer: (state, action) => {
            state.result = action.payload;
            toast.success(action.payload?.text);
        },
        getRoles: (state, action) => {
            state.roles = action.payload;
            toast.success(action.payload?.text);
        },
        errorReducer: (state, action) => {
            state.error = action.payload;
            toastError(action.payload)
        },
    }
})

export const getUser = () => apiCall({
    url: "/userGroup",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.users.type,
    error: slice.actions.errorReducer.type
})

export const deleteUser = (data) => apiCall({
    url: "/userGroup/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addUserRegion = (data) => apiCall({
    url: "/user/region",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editUser = (data) => apiCall({
    url: "/userGroup/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const getRoles = () => apiCall({
    url: "/role",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.getRoles.type,
    error: slice.actions.errorReducer.type
})


export default slice.reducer;