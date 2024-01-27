import { ChangeEvent, TextareaHTMLAttributes, useEffect, useRef, useState } from 'react'
import './viewInfo.css'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../redux/hook';

export default function ViewInfo(){
    const noticeInfo = useAppSelector(state => state.notice)
    return (
        <div className='viewBox'>
            {noticeInfo.length !== 0 ? null : 
            noticeInfo.map((item,idx)=>(
                <div></div>
            ))
            }

            <div className='frame-notice-info'>
                <div></div>
                <div>
                    
                </div>
            </div>
            <div className='frame-notice-info'></div>
        </div>
    )
}