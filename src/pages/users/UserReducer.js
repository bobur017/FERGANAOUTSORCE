import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getRoleStorage, getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "user",
    initialState: {
        userData: {},
        result: {},
        error: {},
        users: {},
        roles: [],
        departmentRoles: [],
        kindergartenRoles: [],
    },
    reducers: {
        users: (state, action) => {
            state.users = action.payload;
        },
        userData: (state, action) => {
            state.userData = action.payload;
        },
        resultReducer: (state, action) => {
            state.result = action.payload;
            toast.success(action.payload?.text);

        },
        getKindergartenRoles: (state, action) => {
            state.kindergartenRoles = action.payload;
        },
        getDepartmentRoles: (state, action) => {
            state.departmentRoles = action.payload;
        },
        getRoles: (state, action) => {
            state.roles = action.payload;
        },
        errorReducer: (state, action) => {
            state.error = action.payload;
            toastError(action.payload)
        },
    }
})

export const editPassword = (data) => apiCall({
    url: "/user/credentials/password",
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.userData.type,
    error: slice.actions.errorReducer.type
});
export const editLogin = (data) => apiCall({
    url: "/user/credentials/login",
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.userData.type,
    error: slice.actions.errorReducer.type
});
export const getUserData = (params) => apiCall({
    url: "/user/getMyData",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.userData.type,
    error: slice.actions.errorReducer.type
});
export const getAllUser = (params) => apiCall({
    url: "/user",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.users.type,
    error: slice.actions.errorReducer.type
});

export const statusUser = (data,params) => apiCall({
    url: "/user/changeStatus/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
});

export const deleteUser = (data) => apiCall({
    url: "/user/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
});


export const addUserDepartment = (data,params) => apiCall({
    url: "/user/department",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    params,
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const addUserRegion = (data) => apiCall({
    url: "/user/region",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const addUserKindergarten = (data,params) => apiCall({
    url: "/user/kindergarten",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    params,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editUser = (data) => apiCall({
    url: "/user/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const getKindergartenRoles = () => apiCall({
    url: "/role/kindergarten",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.getKindergartenRoles.type,
    error: slice.actions.errorReducer.type
})

export const getDepartmentRoles = () => apiCall({
    url: "/role/department",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.getDepartmentRoles.type,
    error: slice.actions.errorReducer.type
})

export const getRoles = (params) => apiCall({
    url: "/role",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.getRoles.type,
    error: slice.actions.errorReducer.type
})


export default slice.reducer;