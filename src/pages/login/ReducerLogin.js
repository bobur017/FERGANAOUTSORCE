import { createSlice } from "@reduxjs/toolkit";
import { apiCall } from "../../ApiCall";
const slice = createSlice({
    name: "login",
    initialState: {
        result: {},
        token: {},
        error: {},

    },
    reducers: {
        resultReducer: (state, action) => {
            state.result = action.payload;
        },
        tokenReducer: (state, action) => {
            state.token = action.payload;
        },
        errorReducer: (state, action) => {
            state.error = action.payload;
        },
    }
})

export const login = (data) => apiCall({
    url: "/login",
    method: "POST",
    headers: {
        'Content-type': 'application/x-www-form-urlencoded'
    },
    data,
    success: slice.actions.tokenReducer.type,
    error: slice.actions.errorReducer.type
})
export const tokenNull = () => {
    return {
        type: slice.actions.tokenReducer.type,
        payload: ''
    }
}
export const errorNull = () => {
    return {
        type: slice.actions.errorReducer.type,
        payload: ''
    }
}


export default slice.reducer;
