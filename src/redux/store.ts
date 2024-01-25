import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./Slice/modeSlice";
import noticeSlice from "./Slice/noticeSlice";
export const store = configureStore({
    reducer:{
        theme:themeSlice,
        notice:noticeSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch