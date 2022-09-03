import { configureStore } from "@reduxjs/toolkit";
import login from "./pages/login/ReducerLogin";
import Api from "./Api"

export default configureStore({
    reducer: {
        login,
    },
    middleware: [Api],
});