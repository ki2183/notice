import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { arrNotice } from "../../component/notice/noticeType";

type NoticeDto = {
    arrNotice:arrNotice,
    title:string,
    creationDate:string,
}

type Notice = Array<NoticeDto>

const initialState:Notice = [
    { arrNotice: [
        { text: '동해물과 백두산이' },
        { text: '마르고 닳도록' },
        { text: '하느님이 보우하사' },
        { text: '우리나라만세' },
        { text: '무궁화 삼천리' },
        { text: '화려강산' },
        { text: '대한사람 대한으로' },
        { text: '길이보전하세.' }
      ],
      title: '애국가',
      creationDate:"2018-01-29",
    },
    { arrNotice: [
        { text: '동해물과 백두산이' },
        { text: '마르고 닳도록' },
        { text: '하느님이 보우하사' },
        { text: '우리나라만세' },
        { text: '무궁화 삼천리' },
        { text: '화려강산' },
        { text: '대한사람 대한으로' },
        { text: '길이보전하세.' }
      ],
      title: '애국가',
      creationDate:"2018-01-29",
    }
]

export const noticeSlice = createSlice({
    name:'notice',
    initialState,
    reducers:{
        addNoticeArr:(state, action:PayloadAction<NoticeDto>)=>{
            state.push(action.payload)
        },
        removeNoticeArr:(state,action:PayloadAction<number>)=>{
            state.splice(action.payload,1)
        },
        editNoticeArr:(state,action:PayloadAction<{arrNotice:arrNotice,title:string,idx:number}>)=>{
            const getData = action.payload
            const prevDataDate = state[getData.idx]?.creationDate
            state.splice(getData.idx,1,{arrNotice:getData.arrNotice,title:getData.title,creationDate:prevDataDate})
        }
    }
})

export const { addNoticeArr,removeNoticeArr } = noticeSlice.actions
export const selectNotice = (state: RootState) => state.notice
export default noticeSlice.reducer