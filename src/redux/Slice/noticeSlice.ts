import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { arrNotice } from "../../component/notice/noticeType";

export type NoticeDto = {
    arrNotice:arrNotice,
    title:string,
    creationDate:string,
}

export type Notice = Array<NoticeDto>

const initialState:Notice = [

]

export const noticeSlice = createSlice({
    name:'notice',
    initialState,
    reducers:{
        addNoticeArr:(state, action:PayloadAction<NoticeDto>)=>{
            state.push(action.payload)
            localStorage.setItem('notice', JSON.stringify(state));
        },
        removeNoticeArr:(state,action:PayloadAction<number>)=>{
            state.splice(action.payload,1)
            localStorage.setItem('notice', JSON.stringify(state));
        },
        editNoticeArr:(state,action:PayloadAction<{arrNotice:arrNotice,title:string,idx:number}>)=>{
            const getData = action.payload
            const prevDataDate = state[getData.idx]?.creationDate
            state.splice(getData.idx,1,{arrNotice:getData.arrNotice,title:getData.title,creationDate:prevDataDate})
        },startNotice:state=>{
            const notice = localStorage.getItem('notice')
            if(state.length === 0 && notice !== null){
                const notice_ = JSON.parse(notice) as Notice
                notice_.map(item => state.push(item))
                
            }
        }
    }
})

export const { addNoticeArr,removeNoticeArr,startNotice } = noticeSlice.actions
export const selectNotice = (state: RootState) => state.notice
export default noticeSlice.reducer