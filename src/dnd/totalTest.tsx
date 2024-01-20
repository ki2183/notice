import React, { ChangeEvent, RefObject, useCallback, useEffect, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend, NativeTypes } from "react-dnd-html5-backend";
import { noticeArr,noticeImgType,noticeTextType } from "./noticeType";

export default function TotalTestt(){
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="w-screen h-screen flex items-center justify-center">
                <Test/>
            </div>
        </DndProvider>
    )
}

function Test(){

    const [notice,setNotice] = useState<noticeArr>([
        {text:""}
    ])
    const inputRefs = useRef<Array<HTMLInputElement|null>>([]);
    const [file,setFile] = useState<File|null>(null)
    

    useEffect(()=>{
    if(file !==null){
        setNotice([...notice,{img:file}])
    }
    },[file])

    const moveNotice = (dragIdx:number,hoverIdx:number,imgTF:boolean) =>{
        const noticeLimit = notice.length-1
        const prevNotice = notice[dragIdx]
        const newNotice = [...notice]
        newNotice.splice(dragIdx,1)
        newNotice.splice(hoverIdx,0,prevNotice)
        if(imgTF===true && (dragIdx === noticeLimit || hoverIdx === noticeLimit))
            newNotice.push({text:''})

        setNotice(newNotice)
    }

    function changeInputText(e:ChangeEvent<HTMLInputElement>,idx:number){
        const prevNotice = [...notice]
        prevNotice[idx] = {text:e.target.value}
        setNotice(prevNotice)
    }

    function addTextInput(e:React.KeyboardEvent,idx:number){
        if(e.key === 'Enter'){
            if(idx === notice.length-1){
                setNotice([...notice,{text:""}])
                // console.log(inputRefs.current)
                setTimeout(() => {
                    inputRefs.current[idx + 1]?.focus();
                },0)
            }
            else{
                if(inputRefs.current && inputRefs.current[idx + 1]) {
                    inputRefs.current[idx + 1]?.focus();
                }else{
                    if(inputRefs.current){
                        let i = idx + 1
                        for(; i<inputRefs.current.length-1; i++){
                            if(inputRefs.current[i] !== null)
                                inputRefs.current[i]?.focus();
                        }
                   }
                }
            }
        }
        if(e.key === 'Backspace'){
            const noticeItem = notice[idx] as noticeTextType
            const prevnoticeItem = notice[idx-1] as noticeTextType
            if(notice && noticeItem.text === '' && prevnoticeItem.text !== undefined){
                const prevNotice = [...notice]
                prevNotice.splice(idx,1)
                setNotice(prevNotice)
                setTimeout(() => {
                    if(idx-1 > 0)
                        inputRefs.current[idx - 1]?.focus();
                },0)
            }
        }
    } 
    
    function insertImg(file:File,idx:number){
        if (file && file.type.startsWith('image/')) {
          if(file !== null && file !== undefined){
            const prevNotice = [...notice]
            prevNotice.splice(idx+1,0,{img:file})
            if(idx === notice.length-1){
                prevNotice.push({text:""})
            }
            setNotice(prevNotice)            
          }
        }
    }

    return (
        <div className="w-96 h-auto bg-slate-700 flex flex-col">
            {notice.map((item,idx)=>{
                const item_ = item as noticeTextType
                const file_ = item as noticeImgType
                
                console.log(item_.text)
                return item_ && item_.text || item_.text === "" ? 
                (
                    <NoticeItem 
                        key={idx} 
                        changeInputText={changeInputText}
                        addTextInput={addTextInput}
                        curIdx={idx}
                        curItem={item_}
                        moveNotice={moveNotice}
                        insertImg={insertImg}
                        inputRefs={inputRefs}
                        
                    />
                )
                : 
                (
                <>
                <NoticeImgItem 
                    key={idx} 
                    curIdx={idx}
                    curFile={file_}
                    moveNotice={moveNotice}
                    insertImg={insertImg}
                />
                </>
                )
            })}
        </div>
      );
}

type NoticeItem = {
    changeInputText: (e:ChangeEvent<HTMLInputElement>,idx:number)=> void
    addTextInput: (e:React.KeyboardEvent<HTMLInputElement>,idx:number)=> void
    moveNotice : (dragIdx:number,hoverIdx:number,imgTF:boolean) => void
    insertImg:(file:File,idx:number) => void
    curIdx:number;
    curItem:noticeTextType;
    inputRefs:React.RefObject<Array<HTMLInputElement | null>>;
}
function NoticeItem({inputRefs,insertImg,moveNotice,changeInputText,addTextInput,curItem,curIdx}:NoticeItem){
    
    const ref = useRef<HTMLInputElement | null>(null);  
    const imgRef = useRef<HTMLInputElement | null>(null); 

    const [,drag] = useDrag({
        type:"TEXTITEM",
        item:{text:curItem.text,dragIdx:curIdx}
    })

    const [,drop] = useDrop({
        accept:"TEXTITEM",
        drop(draggedItem:{dragIdx:number,file:File}) {
            const imgTF = draggedItem.file === undefined
            moveNotice(draggedItem.dragIdx,curIdx,!imgTF)
            draggedItem.dragIdx = curIdx
        },
    })

    const [,imgDrop] = useDrop({
        accept:[NativeTypes.FILE],
        drop(item:{files:Array<File>}) {
            insertImg(item.files[0],curIdx)
        },
    })

    drag(drop(ref))
    imgDrop(imgRef)

    const combinedRef = useCallback(
        (el: HTMLInputElement | null) => {
            ref.current = el;
            imgRef.current = el
            if (inputRefs.current) {
                inputRefs.current[curIdx] = el as HTMLInputElement | null;
            }
        },
        [ref, inputRefs, curIdx]
    )

   

    return(
        <div style={{width:'100%'}}>
        <input 
            style={{width:'100%', outline:'none'}}
            key={curIdx}
            ref={combinedRef}
            type="text"
            value={curItem.text}
            className="bg-slate-600"
            onChange={e=>{
                e.preventDefault()
                changeInputText(e,curIdx)
            }}
            onKeyDown={e=>{
                addTextInput(e,curIdx)
            }}
        />
        <div className="bg-slate-50 h-5"></div>
        </div>
    )
}

type NoticeImgItem = {
    moveNotice : (dragIdx:number,hoverIdx:number,imgTF:boolean) => void
    insertImg:(file:File,idx:number) => void
    curIdx:number;
    curFile:noticeImgType;
}


function NoticeImgItem({insertImg,moveNotice,curFile,curIdx}:NoticeImgItem){
    const ref = useRef(null)
    const imgRef = useRef(null)
    
    const [,drag] = useDrag({
        type:"TEXTITEM",
        item:{file:curFile.img,dragIdx:curIdx}
    })

    const [,drop] = useDrop({
        accept:"TEXTITEM",
        drop(draggedItem:{dragIdx:number,file:File}) {
            const imgTF = draggedItem.file === undefined
            moveNotice(draggedItem.dragIdx,curIdx,!imgTF)
            // moveNotice(draggedItem.dragIdx,curIdx)
            draggedItem.dragIdx = curIdx
        },
    })

    drag(drop(ref))

    const [,imgDrop] = useDrop({
        accept:[NativeTypes.FILE],
        drop(item:{files:Array<File>}) {
            insertImg(item.files[0],curIdx)         
        },
    })

    imgDrop(imgRef)

    return (
        <div style={{width:'100%'}}>
        <img 
            ref={ref}
            key={curIdx} 
            src={URL.createObjectURL(curFile.img)} 
            width='10px' 
            height='10px'
            />
        <div className="bg-slate-50 h-5" ref={imgRef}></div>
        </div>
    )
}
