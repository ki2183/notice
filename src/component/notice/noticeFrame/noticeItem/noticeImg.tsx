import { useEffect, useRef } from "react"
import { NoticeProps } from "../noticeFrame"
import { useDrag, useDrop } from "react-dnd"

interface NoticeImgProps extends NoticeProps{
    curFile:File
}

export default function NoticeImg({
    curFile,
    curIdx,
    focusRef,
    openModal,
    moveNotice,
    computeOptionXY
    }:NoticeImgProps){

    const getOptionHW = useRef<HTMLSpanElement|null>(null)

    function OptionHW(e: React.MouseEvent<HTMLSpanElement>) {
        console.log(e.clientX,e.clientY)
        computeOptionXY(e.clientX,e.clientY,curIdx)
        openModal()
       
    }

    const [,drag] = useDrag({
        type:'NOTICE',
        item:{curIdx:curIdx}
    })
    const [,drop] = useDrop({
        accept:'NOTICE',
        drop(draggingItem:{curIdx:number}) {
            moveNotice(draggingItem.curIdx,curIdx)
        },
    })

    const imgRef = useRef<HTMLImageElement>(null)

    drag(drop(imgRef))

    useEffect(()=>{
        if(focusRef !== null)
            focusRef[curIdx] = null
    },[])

    return (
        <div className='frame-textItem'>
        <img 
            ref={imgRef}
            key={curIdx} 
            src={URL.createObjectURL(curFile)} 
            width='10px' 
            height='10px'
            />
        <div className='pd-1'>
            <div className='frame-img-option'>
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
    )
}