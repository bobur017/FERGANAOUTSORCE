import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../../ApiCall";
const slice = createSlice({
    name: "department",
    initialState: {
        result: {},
        error: {},
        departments: [],
    },
    reducers: {
        departments: (state, action) => {
            state.departments = action.payload;
        },
        resultReducer: (state, action) => {
            getRegionDepartment();
            state.result = action.payload;
            toast.success(action.payload?.text);
        },
        errorReducer: (state, action) => {
            state.error = action.payload;
            toast.error(action.payload?.response?.data?.text);
        },
    }
})

function getToken() {
    return localStorage.getItem("Authorization");
}


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
    success: slice.actions.departments.type,
    error: slice.actions.errorReducer.type
})





export default slice.reducer;