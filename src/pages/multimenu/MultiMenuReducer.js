import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "multiMenu",
    initialState: {
        result: {},
        relationsResult: {},
        error: {},
        multiMenuList: [],
        multiMenu: {},
        menu: {},
        checkCalendar: {},
        checkCalendar2: {},
        multiMenuFile: "",
        multiMenuProductFile: "",
        multiMenuProduct: [],
    },
    reducers: {
        multiMenuList: (state, action) => {
            state.multiMenuList = action.payload;
        },
        multiMenuProductFile: (state, action) => {
            // state.multiMenuFile = action.payload;
            var win = window.open(action.payload, '_blank');
            win.focus();
        },
        multiMenuProduct: (state, action) => {
            state.multiMenuProduct = action.payload;
        },
        multiMenuFile: (state, action) => {
            // state.multiMenuFile = action.payload;
            var win = window.open(action.payload, '_blank');
            win.focus();
        },
        checkCalendar: (state, action) => {
            state.checkCalendar = action.payload;
        },
        checkCalendar2: (state, action) => {
            state.checkCalendar2 = action.payload;
        },
        multiMenu: (state, action) => {
            state.multiMenu = action.payload;
        },
        menu: (state, action) => {
            state.menu = action.payload;
        },
        resultReducer: (state, action) => {
            state.result = action.payload;
            toast.success(action.payload?.text);
        },
        resultMenuRelationsReducer: (state, action) => {
            state.relationsResult = action.payload;
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

export const getMultiMenuProduct = (id) => apiCall({
    url: "/multiMenu/getProduct/" + id,
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.multiMenuProduct.type,
    error: slice.actions.errorReducer.type
})
export const getMultiMenuProductFile = (id) => apiCall({
    url: "/multiMenu/getProductFile/" + id,
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.multiMenuProductFile.type,
    error: slice.actions.errorReducer.type
})
export const getMultiMenuOne = (id) => apiCall({
    url: "/multiMenu/" + id,
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.multiMenu.type,
    error: slice.actions.errorReducer.type
})

export const getMenuOne = (id) => apiCall({
    url: "/menu/" + id,
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.menu.type,
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

export const getFileMultiMenu = (data) => apiCall({
    url: "/multiMenu/getFile/" + data.id,
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.multiMenuFile.type,
    error: slice.actions.errorReducer.type
})
export const relationMultiMenu = (data, id) => apiCall({
    url: "/menu/" + id,
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultMenuRelationsReducer.type,
    error: slice.actions.errorReducer.type
})
export const addMultiMenuMeal = (data) => apiCall({
    url: "/multiMenu/addMeal/" + data.id,
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type,
})

export const editMultiMenu = (params, data) => apiCall({
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
});

export const checkCalendarByMtts = (id, params) => apiCall({
    url: "/byCalendarKindergarten/" + id,
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.checkCalendar2.type,
    error: slice.actions.errorReducer.type
});


export default slice.reducer;