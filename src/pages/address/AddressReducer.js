import { createSlice } from "@reduxjs/toolkit";
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

// export const getAddress = () => apiCall({
//     url: "/region",
//     method: "get",
//     headers: {
//         "Authorization": "Bearer " + getToken(),
//     },
//     success: slice.actions.resultReducer.type,
//     error: slice.actions.errorReducer.type
// })

export const getAddress = () => apiCall({
    url: "/region",
    method: "GET",
    headers: {
        "Authorization": getToken()
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})



export default slice.reducer;