import { createSlice } from "@reduxjs/toolkit";
import { apiCall } from "../../ApiCall";
const slice = createSlice({
    name: "department",
    initialState: {
        result: {},
        error: {},
        departments: [],
    },
    reducers: {
        resultReducer: (state, action) => {
            state.result = action.payload;
        },
        errorReducer: (state, action) => {
            state.error = action.payload;
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





export default slice.reducer;