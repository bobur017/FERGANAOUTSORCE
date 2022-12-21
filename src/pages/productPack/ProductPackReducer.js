import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "pack",
    initialState: {
        result: {},
        error: {},
        packs: [],
    },
    reducers: {
        packs: (state, action) => {
            state.packs = action.payload;
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

export const getPack = () => apiCall({
    url: "/pack",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.packs.type,
    error: slice.actions.errorReducer.type
})

export const deletePack = (data) => apiCall({
    url: "/pack/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addPack = (id, data) => apiCall({
    url: "/pack/" + id,
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})
//
// export const editPack = (id, data) => apiCall({
//     url: "/pack/" + id,
//     method: "PUT",
//     headers: {
//         Authorization: getToken(),
//     },
//     data,
//     success: slice.actions.resultReducer.type,
//     error: slice.actions.errorReducer.type
// })


export default slice.reducer;