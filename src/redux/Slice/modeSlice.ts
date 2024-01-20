import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Theme, darkTheme, lightTheme } from "../../type/theme";

type ThemeState = { 
    theme: Theme
}

const initialState:ThemeState = {
    theme:darkTheme
}

export const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers:{
        changeTheme: state=>{
            state.theme = state.theme.body === lightTheme.body ? darkTheme : lightTheme
        }
    }
})

export const { changeTheme } = themeSlice.actions
export const selectTheme = (state: RootState) => state.theme.theme
export default themeSlice.reducer