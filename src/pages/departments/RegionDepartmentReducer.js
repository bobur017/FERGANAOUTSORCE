import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";
const slice = createSlice({
    name: "department",
    initialState: {
        result: {},
        error: {},
        regionDepartments: [],
        departmentsRel: [],
        departmentsRelAdd: [],
        departments: [],
    },
    reducers: {
        departments: (state, action) => {
            state.departments = action.payload;
        },
        regionDepartments: (state, action) => {
            state.regionDepartments = action.payload;
        },
        departmentsRel: (state, action) => {
            state.departmentsRel = action.payload;
        },
        departmentsRelAdd: (state, action) => {
            state.departmentsRelAdd = action.payload;
        },
        resultReducer: (state, action) => {
            getRegionDepartment();
            state.result = action.payload;
            toast.success(action.payload?.text);
        },
        errorReducer: (state, action) => {
            state.error = action.payload;
            toastError(action.payload);
        },
    }
})


export const addRegionDepartment = (data) => apiCall({
    url: "/regionDepartment",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editRegionDepartment = (data) => apiCall({
    url: "/regionDepartment/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const deleteRegionDepartment = (data) => apiCall({
    url: "/regionDepartment/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const getRegionDepartment = () => apiCall({
    url: "/regionDepartment",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.regionDepartments.type,
    error: slice.actions.errorReducer.type
})

export const getDepartment = () => apiCall({
    url: "/department",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.departments.type,
    error: slice.actions.errorReducer.type
})

export const getDepartmentFromRelation = (params) => apiCall({
    url: "/menu/getDepartmentAddMenu",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.departmentsRel.type,
    error: slice.actions.errorReducer.type
})


export const getDepartmentFromRelationAdd = (params) => apiCall({
    url: "/menu/getDepartmentAddMenuAdd",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.departmentsRelAdd.type,
    error: slice.actions.errorReducer.type
})


export const addDepartment = (data) => apiCall({
    url: "/department",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const editDepartment = (data) => apiCall({
    url: "/department/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const deleteDepartment = (data) => apiCall({
    url: "/department/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})





export default slice.reducer;