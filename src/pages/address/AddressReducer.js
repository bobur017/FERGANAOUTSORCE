import { createSlice } from "@reduxjs/toolkit";
import { setApi } from "./ApiCall";
import { apiCall } from "../../ApiCall";
const slice = createSlice({
    name: "address",
    initialState: {
        address: [],
        error: {},
    },
    reducers: {
        resultReducer: (state, action) => {
            state.address = action.payload;
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

export const getAddress = () => apiCall({
    url: "/region",
    method: "GET",
    headers: {
        Authorization: getToken(),
        role: getRole(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})




export default slice.reducer;