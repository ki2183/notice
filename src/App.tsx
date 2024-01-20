import React, { createContext, useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './redux/hook';
import { GlobalStyle } from './globalStyles/global-styles';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './page/mainPage';
import YourApp from './dnd/test_';
import TotalPage from './dnd/test';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TotalTest from './dnd/totalTestcopy';
import TotalTestt from './dnd/totalTest';
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
        <Route path='/dnd' element={<DndProvider backend={HTML5Backend}><TotalPage/></DndProvider>}/>
        <Route path='/d' element={<YourApp/>}/>
        <Route path='/total' element={<TotalTest/>}/>
        <Route path='/t' element={<TotalTestt/>}/>
        <Route path='/notice' element={<NoticePage/>}/>
      </Routes>
    </div>
  );
}

export default App;


// const Test = () => {

//   const mode = useAppSelector(state => state.mode.mode)
//   const dispatch = useAppDispatch()


//   function onclick(){
//     dispatch(changeMode())
//   }

//   return (
//     <button onClick={onclick}>
//       {mode}
//     </button>
//   )
// }
