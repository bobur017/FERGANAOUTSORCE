import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "multiMenu",
    initialState: {
        result: {},
        error: {},
        multiMenuList: [],
        multiMenu: {},
        checkCalendar: {},
    },
    reducers: {
        multiMenuList: (state, action) => {
            state.multiMenuList = action.payload;
        },
        checkCalendar: (state, action) => {
            state.checkCalendar = action.payload;
        },
        multiMenu: (state, action) => {
            state.multiMenu = action.payload;
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

export const getMultiMenu = () => apiCall({
    url: "/multiMenu",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.multiMenuList.type,
    error: slice.actions.errorReducer.type
})
export const getMultiMenuOne = (id) => apiCall({
    url: "/multiMenu/"+id,
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.multiMenu.type,
    error: slice.actions.errorReducer.type
})

export const deleteMultiMenu = (data) => apiCall({
    url: "/multiMenu/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const deleteMultiMenuOne = (data) => apiCall({
    url: "/multiMenu/deleteMeal/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addMultiMenu = (data) => apiCall({
    url: "/multiMenu",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})
export const addMultiMenuMeal = (data) => apiCall({
    url: "/multiMenu/addMeal/"+data.id,
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type,
})

export const editMultiMenu = (params,data) => apiCall({
    url: "/multiMenu/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const checkCalendar = (params) => apiCall({
    url: "/byCalendar",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.checkCalendar.type,
    error: slice.actions.errorReducer.type
})





export default slice.reducer;