import { createSlice } from "@reduxjs/toolkit";
import { setApi } from "./ApiCall";
import {apiCall} from "../../ApiCall";
const slice = createSlice({
    name: "reducer",
    initialState: {
        result: {},
        error: {},
        department:[],
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
function getRole() {
    return localStorage.getItem("role");
}

export const addRegionDepartment = (data) => apiCall({
    url: "/regionDepartment",
    method: "POST",
    headers: {
        Authorization: getToken(),
        role: getRole(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const tokenNull = ()=>{
    return {
        type:slice.actions.tokenReducer.type,
        payload:null
    }
}




export default slice.reducer;