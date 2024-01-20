
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import './noticeFrame.css'
import { arrNotice,noticeTypeIMG,noticeTypeTEXT,initialText } from '../noticeType'
import { useDrag, useDrop } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

export default function NoticeFrame(){

    const [noticeInfo,setNoticeInfo] = useState<arrNotice>([initialText])
    const focusRef = useRef<Array<HTMLTextAreaElement|null>>([])

    useEffect(()=>{console.log(noticeInfo)},[noticeInfo])

    function noticeTextHandler(e:ChangeEvent<HTMLTextAreaElement>,idx:number){
        const inputValue = e.target.value
        const prevNoticeInfo = [...noticeInfo]
        const curText = prevNoticeInfo[idx] as noticeTypeTEXT
        curText.text = inputValue
        setNoticeInfo(prevNoticeInfo)

    }

    function noticeKeyboardHandler(e:React.KeyboardEvent<HTMLTextAreaElement>,idx:number){
    
        if(e.key === 'Enter'){
            const noticeMax = noticeInfo.length-1
            e.preventDefault()
            if(idx === noticeMax){
                setNoticeInfo([...noticeInfo,{text:""}])
                setTimeout(() => {
                    if(focusRef.current){
                        focusRef.current[idx + 1]?.focus();
                    }
                }, 0);
                
            }
            focusRef.current[idx + 1]?.focus();

        }
        if(e.key === 'Backspace'){
            
            const curNoticeText = (noticeInfo[idx] as noticeTypeTEXT).text
            if(curNoticeText !== undefined && curNoticeText === "" && idx !== 0){
                const prevNoticeInfo = [...noticeInfo]
                prevNoticeInfo.splice(idx,1)
                setNoticeInfo(prevNoticeInfo)
                focusRef.current[findTextBack()]?.focus();
            }              
        }
        if(e.key === 'ArrowUp'){
            e.preventDefault()
            const curNoticeText = (noticeInfo[idx] as noticeTypeTEXT).text
            if(idx > 0 && curNoticeText !== undefined){
                focusRef.current[findTextBack()]?.focus();
            }
        }
        if(e.key === 'ArrowDown'){
            e.preventDefault()
            const noticeMax = noticeInfo.length-1
            const curNoticeText = (noticeInfo[idx] as noticeTypeTEXT).text
            if(idx < noticeMax && curNoticeText !== undefined){
                focusRef.current[findTextFront()]?.focus();
            }
        }

        function findTextBack():number{
            if(idx === 0){
                return 0
            }
            for(let i = idx-1; i > 0; i--){
                const checkTextType = noticeInfo[i] as noticeTypeTEXT
                if(checkTextType.text !== undefined){
                    return i
                }
            }

            return 0
        }
        function findTextFront():number{
            const noticeMax = noticeInfo.length - 1
            if(idx === noticeMax){
                return noticeMax
            }
            
            for(let i = idx+1; i < noticeMax; i++){
                const checkTextType = noticeInfo[i] as noticeTypeTEXT
                if(checkTextType.text !== undefined){
                    return i
                }
            }

            return noticeMax
        }


    }

    function moveNotice(dragIdx:number, dropIdx:number){
        const dropNotice = noticeInfo[dragIdx]
        const prevNoticeInfo = [...noticeInfo]
        const noticeMax = noticeInfo.length-1
        prevNoticeInfo.splice(dragIdx,1)
        prevNoticeInfo.splice(dropIdx,0,dropNotice)


        const lastItem = prevNoticeInfo[noticeMax] as noticeTypeTEXT
        if(lastItem.text === undefined){
            prevNoticeInfo.push({text:''})
        }

        setNoticeInfo(prevNoticeInfo)
    }
    
    function AddNoticeImg(file: {files: FileList},idx:number){
        console.log(file.files)
        const img = file.files[0]
        const prevNoticeInfo = [...noticeInfo]

        if (img && img.type.startsWith('image/')) {
            if(noticeInfo.length-1 === idx){
                prevNoticeInfo.push({img:img})
                prevNoticeInfo.push({text:""})        
            }else{
                prevNoticeInfo.splice(idx,0,{img:img})
            }
            setNoticeInfo(prevNoticeInfo)
        }
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='null-notice'/>
            <div className="frame-notice">
                <input type='text' className='notice-title' placeholder='제목 입력'/>
                {noticeInfo.map((item,idx)=>{

                    const textItem = (item as noticeTypeTEXT).text
                    const imgItem = (item as noticeTypeIMG).img

                    return textItem !== undefined ?(
                        <NoticeText 
                            key={idx} 
                            curIdx={idx}
                            text={textItem}
                            focusRef={focusRef.current}
                            moveNotice={moveNotice}
                            AddNoticeImg={AddNoticeImg}
                            noticeTextHandler={noticeTextHandler}
                            noticeKeyboardHandler={noticeKeyboardHandler}
                        />
                    ):<NoticeImg
                        key={idx} 
                        curIdx={idx}
                        curFile={imgItem}
                        focusRef={focusRef.current}
                        moveNotice={moveNotice}

                    />
                })}
                
            </div>
            <div className='null-notice-bottom'/>
        </div>
    )
}

export type NoticeProps = {
    curIdx : number;
    focusRef:Array<HTMLTextAreaElement|null>;
    moveNotice:(dragIdx:number, dropIdx:number)=>void
}

interface NoticeTextProps extends NoticeProps{
    AddNoticeImg:(file: { files: FileList },idx:number)=>void
    noticeTextHandler: (e:ChangeEvent<HTMLTextAreaElement>,idx:number)=>void;
    noticeKeyboardHandler : (e:React.KeyboardEvent<HTMLTextAreaElement>,idx:number)=> void
    
    text:string;
}

function NoticeText({
    text,
    curIdx,
    focusRef,
    moveNotice,
    AddNoticeImg,
    noticeTextHandler,
    noticeKeyboardHandler,
    }:NoticeTextProps){

    const setHeightRef = useRef<HTMLTextAreaElement|null>(null) 
    const getHeighRef = useRef<HTMLDivElement|null>(null)

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
            <textarea 
                ref={combinedRef} 
                className='notice-title' 
                placeholder='텍스트 입력'
                value={text}
                onChange={e=>{
                    noticeTextHandler(e,curIdx)                   
                }}
                onKeyDown={e=>{
                    noticeKeyboardHandler(e,curIdx)
                }}
            />
            <div 
                ref={getHeighRef} 
                className='notice-title-div bg-slate-500'
            >{text}</div>
        </>
    )
}

interface NoticeImgProps extends NoticeProps{
    curFile:File
}

function NoticeImg({
    curFile,
    curIdx,
    focusRef,
    moveNotice
    }:NoticeImgProps){

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
        <div style={{width:'100%'}}>
        <img 
            ref={imgRef}
            key={curIdx} 
            src={URL.createObjectURL(curFile)} 
            width='10px' 
            height='10px'
            />
        <div className="bg-slate-50 h-5" ref={null}></div>
        </div>
    )
}