import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Theme, darkTheme, lightTheme } from "../../type/theme";
import { arrNotice } from "../../component/notice/noticeType";

type NoticeDto = {
    arrNotice:arrNotice,
    title:string
}

type Notice = Array<NoticeDto>

const initialState:Notice = []

export const noticeSlice = createSlice({
    name:'notice',
    initialState,
    reducers:{
        addNoticeArr:(state, action:PayloadAction<NoticeDto>)=>{
            state.push(action.payload)
        }
    }
})

export const { addNoticeArr } = noticeSlice.actions
export const selectNotice = (state: RootState) => state.notice
export default noticeSlice.reducer