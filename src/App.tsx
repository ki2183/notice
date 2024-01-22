import React, { createContext, useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './redux/hook';
import { GlobalStyle } from './globalStyles/global-styles';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './page/mainPage';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { NoticePage } from './page/noticePage';


function App() {
  const theme = useAppSelector(state => state.theme.theme)

  useEffect(()=>{
    console.log(theme)
  },[theme])
  
  return (
    <div>
      <GlobalStyle theme={theme} />
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/notice' element={<NoticePage/>}/>
      </Routes>
    </div>
  );
}

export default App;

