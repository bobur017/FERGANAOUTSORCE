import { configureStore } from "@reduxjs/toolkit";
import qr from "./Reducer";
import Api from "./Api"

export default configureStore({
    reducer: {
        qr,
    },
    middleware: [Api],
});