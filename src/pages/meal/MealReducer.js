import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "meal",
    initialState: {
        result: {},
        error: {},
        meals: [],
        mealOne: [],
        mealSanpin: [],
    },
    reducers: {
        meals: (state, action) => {
            state.meals = action.payload;
        },
        mealOne: (state, action) => {
            state.mealOne = action.payload;
        },
        mealSanpin: (state, action) => {
            state.mealSanpin = action.payload;
        },
        resultReducer: (state, action) => {
            state.result = action.payload;
            toast.success(action.payload?.text);
        },
        errorReducer: (state, action) => {
            state.error = action.payload;
            toastError(action.payload);
        },
    }
});

export const getMeal = () => apiCall({
    url: "/meal",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.meals.type,
    error: slice.actions.errorReducer.type
})
export const getMealOne = (id) => apiCall({
    url: "/meal/getProduct/"+id,
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.mealOne.type,
    error: slice.actions.errorReducer.type
})

export const getMealSanpin = (params,data) => apiCall({
    url: "/meal/getSanPin",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    params,
    data,
    success: slice.actions.mealSanpin.type,
    error: slice.actions.errorReducer.type
})

export const deleteMeal = (data) => apiCall({
    url: "/meal/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const addMeal = (data) => apiCall({
    url: "/meal",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editMeal = (data,id) => apiCall({
    url: "/meal/" +id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})
export default slice.reducer;