import React, { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './redux/hook';
import { GlobalStyle } from './globalStyles/global-styles';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './routerPage/mainPage';
import { NoticePage } from './routerPage/noticePage';
import { ViewPage } from './routerPage/viewPage';
import { changeTheme } from './redux/Slice/modeSlice';
import { startNotice } from './redux/Slice/noticeSlice';


function App() {
  const theme = useAppSelector(state => state.theme.theme)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    localStorage.setItem('theme', theme.span);
  },[theme])

  const deleteLocalData = () =>{
    setTimeout(() => {
        localStorage.clear()
    }, 300000);
  }  //30분 지나면 로컬 스토리지 삭제

  useEffect(()=>{
    
    deleteLocalData()

    if(localStorage.getItem('theme') === "dark_mode"){ //시작시 로컬에서 다크모드 불러옴
        dispatch(changeTheme()) 
    }
    dispatch(startNotice()) //시작시 로컬에 저장된 글 불러오기
  
  },[]) 


  return (
    <div className='overflow-x-hidden overflow-y-auto'>
      <GlobalStyle theme={theme} />
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/notice' element={<NoticePage/>}/>
        <Route path='/update' element={<NoticePage/>}/>
        <Route path='/view' element={<ViewPage/>}/>
      </Routes>
    </div>
  );
}

export default App;

