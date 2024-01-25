import { DndProvider } from 'react-dnd'
import './notice.css'
import { HTML5Backend } from 'react-dnd-html5-backend'
import NoticeFrame from './noticeFrame/noticeFrame'
import { useRef } from 'react'

export default function Notice(){

    return (
        <div className="container-notice">
            <DndProvider backend={HTML5Backend}>
                <NoticeFrame/>
            </DndProvider>
        </div> 
    )
}

