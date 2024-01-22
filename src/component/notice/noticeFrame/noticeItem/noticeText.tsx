import { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { NoticeProps } from "../noticeFrame";

interface NoticeTextProps extends NoticeProps{
    AddNoticeImg:(file: { files: FileList },idx:number)=>void
    noticeTextHandler: (e:ChangeEvent<HTMLTextAreaElement>,idx:number)=>void;
    noticeKeyboardHandler : (e:React.KeyboardEvent<HTMLTextAreaElement>,idx:number)=> void
    text:string;
}

export default function NoticeText({
    text,
    curIdx,
    focusRef,
    openModal,
    moveNotice,
    AddNoticeImg,
    computeOptionXY,
    noticeTextHandler,
    noticeKeyboardHandler,
    }:NoticeTextProps){

    const setHeightRef = useRef<HTMLTextAreaElement|null>(null) 
    const getHeighRef = useRef<HTMLDivElement|null>(null)
    const getOptionHW = useRef<HTMLSpanElement|null>(null)

    function OptionHW(e: React.MouseEvent<HTMLSpanElement>) {
        console.log(e.clientX,e.clientY)
        computeOptionXY(e.clientX,e.clientY,curIdx)
        openModal()
       
    }

    const [,drag] = useDrag({
        type:'NOTICE',
        item:{text:text,curIdx:curIdx}
    })

    const [,drop] = useDrop({
        accept:'NOTICE',
        drop(draggingItem:{text:string,curIdx:number}) {
            moveNotice(draggingItem.curIdx,curIdx)
        },
    })

    const [,dropFile] = useDrop({
        accept:[NativeTypes.FILE],
        drop(file: { files: FileList }) {
            AddNoticeImg(file,curIdx)
        },
    })

    drag(drop(dropFile(setHeightRef)))

    const computeHeight = () =>{
        const getHeight = getHeighRef.current?.clientHeight as number
        if (setHeightRef.current) {
            setHeightRef.current.style.height = `${getHeight}px`;
        }   
    }

    const combinedRef = useCallback(
        (el: HTMLTextAreaElement | null) => {
            setHeightRef.current = el;
            if(focusRef !== null)
                focusRef[curIdx] = el
        },
        [setHeightRef, focusRef, curIdx]
    )

    useEffect(()=>{
        computeHeight()
    },[text])
    
    return (
        <>  
            <div className='frame-textItem'>
                <textarea 
                    ref={combinedRef} 
                    className='notice-item'
                    placeholder='텍스트 입력'
                    value={text}
                    onChange={e=>{
                        noticeTextHandler(e,curIdx)                   
                    }}
                    onKeyDown={e=>{
                        noticeKeyboardHandler(e,curIdx)
                    }}
                />
                <div className='pd-1'>
                    <div className='pt-1 frame-item-option'>
                    <span 
                        ref={getOptionHW} 
                        className="item-option material-symbols-outlined"
                        onClick={OptionHW}
                        >
                        more_horiz
                    </span>
                    
                    </div>
                </div>
            </div>
            

            <div 
                ref={getHeighRef} 
                className='notice-title-div bg-slate-500'
            >{text}</div>
        </>
    )
}