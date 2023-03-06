import { configureStore } from "@reduxjs/toolkit";
import login from "./pages/login/ReducerLogin";
import address from "./pages/address/AddressReducer";
import department from "./pages/departments/RegionDepartmentReducer";
import age from "./pages/age/AgeReducer";
import product from "./pages/product/ProductReducer";
import mtt from "./pages/mtt/MttReducer";
import meal from "./pages/meal/MealReducer";
import mealCategory from "./pages/meal/MealCategoryReducer";
import user from "./pages/users/UserReducer";
import mealTime from "./pages/meal/MealTimeReducer";
import supplier from "./pages/supplier/SupplierReducer";
import multiMenu from "./pages/multimenu/MultiMenuReducer";
import contract from "./pages/contract/ContractReducer";
import price from "./pages/price/PriceReducer";
import warehouse from "./pages/warehouse/WarehouseReducer";
import report from "./pages/report/ReportReducer";
import kidsNumber from "./pages/children-number/ChildrenNumberReducer";
import sanpinCategory from "./pages/product/SanpinCategoryReducer";
import getFiles from "./pages/getFiles/GetFilesReducer";
import notification from "./pages/notification/NotificationReducer";
import pack from "./pages/productPack/ProductPackReducer";
import permission from "./pages/permission/PermissionReducer";
import order from "./pages/order/OrderReducer";
import accountant from "./pages/accountant/AccountantReducer";
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
        mealCategory,
        meal,
        mealTime,
        multiMenu,
        user,
        supplier,
        price,
        contract,
        kidsNumber,
        warehouse,
        report,
        getFiles,
        notification,
        pack,
        permission,
        order,
        accountant,
    },
    middleware: [Api],
});
