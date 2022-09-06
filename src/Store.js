import { configureStore } from "@reduxjs/toolkit";
import login from "./pages/login/ReducerLogin";
import address from "./pages/address/AddressReducer";
import Api from "./Api"

export default configureStore({
    reducer: {
        login,
        address,
    },
    middleware: [Api],
});