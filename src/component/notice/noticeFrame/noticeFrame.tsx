
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import './noticeFrame.css'
import { arrNotice,noticeTypeIMG,noticeTypeTEXT,initialText } from '../noticeType'
import { useDrag, useDrop } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

import ReactModal from 'react-modal'

export default function NoticeFrame(){

    const [noticeInfo,setNoticeInfo] = useState<arrNotice>([initialText])
    const focusRef = useRef<Array<HTMLTextAreaElement|null>>([])
    const [optionXY,setOptionXY] = useState<{x:number,y:number}>({x:0,y:0})

    useEffect(()=>{console.log(noticeInfo)},[noticeInfo])

    function noticeTextHandler(e:ChangeEvent<HTMLTextAreaElement>,idx:number){
        const inputValue = e.target.value
        const prevNoticeInfo = [...noticeInfo]
        const curText = prevNoticeInfo[idx] as noticeTypeTEXT
        curText.text = inputValue
        setNoticeInfo(prevNoticeInfo)

    }

    function noticeKeyboardHandler(e:React.KeyboardEvent<HTMLTextAreaElement>,idx:number){

        if(e.key === 'Enter') {
            e.preventDefault()
            const prevNoticeInfo = [...noticeInfo]
            prevNoticeInfo.splice(idx+1,0,{text:''})
            setNoticeInfo(prevNoticeInfo)
            setTimeout(() => {
                focusRef.current[idx + 1]?.focus();
            }, 0);   
        }

        if(e.key === 'Backspace'){
            
            const curNoticeText = (noticeInfo[idx] as noticeTypeTEXT).text
            
            if(curNoticeText !== undefined && curNoticeText === "" && idx !== 0){
                const noticeMax = noticeInfo.length-1
                const prevNoticeText = (noticeInfo[idx-1] as noticeTypeTEXT).text
                const prevNoticeInfo = [...noticeInfo]
         
                console.log(prevNoticeText === undefined)
                if(prevNoticeText === undefined && noticeMax === idx){
                    focusRef.current[findTextBack()]?.focus();
                }else{
                    prevNoticeInfo.splice(idx,1)
                    setNoticeInfo(prevNoticeInfo)
                    focusRef.current[findTextBack()]?.focus();
                }
                    

                
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

    function computeOptionXY(x:number,y:number){
        setOptionXY({x:x,y:y})
        console.log(x,y)
    }

    useEffect(()=>{console.log(optionXY.x,optionXY.y)},[optionXY])

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const customStyles = {
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경색 및 투명도 조절
        },
        content: {
          width: '50%', // 너비 조절
          height: '50%', // 높이 조절
          margin: 'auto', // 가운데 정렬
          border: '1px solid #ccc', // 테두리 추가
          borderRadius: '8px', // 테두리 둥글게 처리
          padding: '20px', // 내부 간격
        },
      };

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='optionbutton' style={{left:`${optionXY.x+2}px`,top:`${optionXY.y+2}px`}}>
                <span>삭제</span>
                <span className="material-symbols-outlined select-none trash">
                        delete
                    </span>
            </div>
            <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="예제 모달"
        style={customStyles} // 사용자 정의 스타일 적용
      >
        <h2>모달 내용</h2>
        <p>원하는 내용을 여기에 넣을 수 있습니다.</p>
        <button onClick={closeModal}>모달 닫기</button>
      </ReactModal>

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
                            openModal={openModal}
                            focusRef={focusRef.current}
                            moveNotice={moveNotice}
                            AddNoticeImg={AddNoticeImg}
                            noticeTextHandler={noticeTextHandler}
                            computeOptionXY={computeOptionXY}
                            noticeKeyboardHandler={noticeKeyboardHandler}
                        />
                    ):<NoticeImg
                        key={idx} 
                        curIdx={idx}
                        curFile={imgItem}
                        openModal={openModal}
                        focusRef={focusRef.current}
                        moveNotice={moveNotice}
                        computeOptionXY={computeOptionXY}

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
    computeOptionXY:(x:number,y:number) => void
    openModal:()=> void
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
        computeOptionXY(e.clientX,e.clientY)
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
                    <div className='pt-1'>
                    <span 
                        ref={getOptionHW} 
                        className="item-option w-6 h-6 material-symbols-outlined cursor-pointer rounded-full flex items-center justify-center select-none"
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