import React, { createContext, useEffect, useLayoutEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './redux/hook';
import { GlobalStyle } from './globalStyles/global-styles';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './page/mainPage';
import { NoticePage } from './page/noticePage';
import { ViewPage } from './page/viewPage';
import { changeTheme } from './redux/Slice/modeSlice';
import { startNotice } from './redux/Slice/noticeSlice';


function App() {
  const theme = useAppSelector(state => state.theme.theme)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    if(localStorage.getItem('theme') === "light_mode"){
        dispatch(changeTheme())
    }
    dispatch(startNotice())
    const notice = localStorage.getItem('notice')
    if(notice !== null)
      console.log(JSON.parse(notice))
  },[])

  useEffect(()=>{
    localStorage.setItem('theme', theme.span);
  },[theme])
  
  return (
    <div className='overflow-x-hidden overflow-y-auto'>
      <GlobalStyle theme={theme} />
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/notice' element={<NoticePage/>}/>
        <Route path='/view' element={<ViewPage/>}/>
      </Routes>
    </div>
  );
}

export default App;

