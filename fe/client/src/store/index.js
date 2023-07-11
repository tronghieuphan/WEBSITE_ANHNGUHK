import { configureStore } from "@reduxjs/toolkit";
import dataAdd from "../slices/dataAdd";

const rootReducer = {
    dataAdd: dataAdd,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
