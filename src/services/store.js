import { configureStore } from "@reduxjs/toolkit";
// import getDefaultMiddleware from "./reducer";
import { articleApi } from './article'
export const store = configureStore({
    reducer :{
        [articleApi.reducerPath]:articleApi.reducer
    },
    middleware:(getDefaultMiddleware) =>getDefaultMiddleware().concat(articleApi.middleware)
})