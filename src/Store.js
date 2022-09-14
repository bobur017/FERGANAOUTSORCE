import { configureStore } from "@reduxjs/toolkit";
import login from "./pages/login/ReducerLogin";
import address from "./pages/address/AddressReducer";
import department from "./pages/departments/RegionDepartmentReducer";
import age from "./pages/age/AgeReducer";
import product from "./pages/product/ProductReducer";
import mtt from "./pages/mtt/MttReducer";
import sanpinCategory from "./pages/product/SanpinCategoryReducer";
import Api from "./Api"

export default configureStore({
    reducer: {
        login,
        address,
        department,
        age,
        product,
        sanpinCategory,
        mtt,
    },
    middleware: [Api],
});