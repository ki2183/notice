import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./Slice/modeSlice";
import noticeSlice from "./Slice/noticeSlice";
import scrollSlice from "./Slice/scrollRefSlice"
export const store = configureStore({
    reducer:{
        theme:themeSlice,
        notice:noticeSlice,
        scroll:scrollSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch