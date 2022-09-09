import { configureStore } from "@reduxjs/toolkit";
import login from "./pages/login/ReducerLogin";
import address from "./pages/address/AddressReducer";
import department from "./pages/sidebar/RegionDepartmentReducer";
import age from "./pages/age/AgeReducer";
import Api from "./Api"

export default configureStore({
    reducer: {
        login,
        address,
        department,
        age,
    },
    middleware: [Api],
});