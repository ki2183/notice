import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

type scrollRef = {
    rate:number
}

const initialState:scrollRef = {rate:0}

export const scrollSlice = createSlice({
    name:'scroll',
    initialState,
    reducers:{
        updateScollRate:(state,action:PayloadAction<number>)=>{
            state.rate = action.payload
        }
    }
})

export const { updateScollRate } = scrollSlice.actions
export const scrollNotice = (state: RootState) => state.scroll
export default scrollSlice.reducer

//스크롤량 관리