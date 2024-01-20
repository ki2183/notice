import { ChangeEvent, useEffect, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend, NativeTypes } from "react-dnd-html5-backend";

export default function TotalTest(){
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="w-screen h-screen flex items-center justify-center">
                <Test/>
            </div>
        </DndProvider>
    )
}

type textType = {
    content : string
}
type imgType = {
    imgSrc : File
}

function Test(){

    const [notice,setNotice] = useState<Array<string|File>>([''])

    const moveNotice = (dragIdx:number,hoverIdx:number) =>{
        const prevNotice = notice[dragIdx]
        const newNotice = [...notice]
        newNotice.splice(dragIdx,1)
        newNotice.splice(hoverIdx,0,prevNotice)
        setNotice(newNotice)
    }

    const addImgNotice = (file:FileList) =>{
        console.log(file[0])
        const imgfile = file[0]
        // (item as DataTransfer & { files: FileList }).files;
      
        if (imgfile && imgfile.type.startsWith('image/')) {
          if(imgfile !== null && imgfile !== undefined){
            setNotice([...notice,imgfile])
          }
        }
    }

    useEffect(()=>{console.log(notice)},[notice])

    const writingHandler =(e:ChangeEvent<HTMLInputElement>,idx:number)=>{
        console.log(e.target.value)
        setNotice(prevNotice=>{
            const prevNotice_ = [...prevNotice]
            prevNotice_[idx] = e.target.value
            return prevNotice_
        })
    }

    return (
        <div className="w-96 h-2/3 bg-slate-700 flex flex-col">
          {notice.map((item, index) => {
            if (typeof item === "string") {
              return (
                <Text
                  writingHandler={writingHandler}
                  key={index}
                  addImgNotice={addImgNotice}
                  moveNotice={moveNotice}
                  curIdx={index}
                  text={item}
                />
              );
            } else if (item instanceof File) {
              return <img src={URL.createObjectURL(item)} width='10px' height='10px' />;
            } else {
              // Handle other cases if needed
              return null;
            }
          })}
        </div>
      );
}

type TextProps = {
    writingHandler:(e:ChangeEvent<HTMLInputElement>,idx:number)=>void
    addImgNotice:(item:FileList)=>void
    moveNotice:(dragIdx:number,hoverIdx:number)=>void
    curIdx: number,
    text:string
}
type ItemProps = {
    idx:number;
    text?:string;
    imgFile?:File
}
type noticeType = 'TEXT' | 'IMG'

function Text({addImgNotice,writingHandler,moveNotice,curIdx,text}:TextProps){

    const [noticeType,setNotice]= useState<noticeType>('TEXT')

    const [,drag] = useDrag({
        type:'ITEM',
        item:{index:curIdx,text:text},
    })
    const dndRef = useRef(null)

    const [{ isOver }, drop] = useDrop({
        accept:['ITEM',NativeTypes.FILE],
     

        hover(draggedItem:{text:string,index:number}|{files:FileList}){
            console.log(draggedItem)
            if(draggedItem && 'text' in draggedItem){
                moveNotice(draggedItem.index,curIdx)
                draggedItem.index = curIdx
            }
            // else{
                
            // }
        },


        drop(draggedItem:{text:string,index:number}|{files:FileList}){
            if(draggedItem && 'files' in draggedItem){
                console.log(draggedItem.files)
                // const file = {draggedItem of DataTransfer & {files}}
                addImgNotice(draggedItem.files)
                setNotice('IMG')
            }
        },

        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),

    })

    drop(drag(dndRef))

    return(
        <div className="w-96 h-14 bg-slate-950 rounded-xl mt-5 flex items-center">
            {noticeType === "TEXT" ? <input 
                type="text" 
                className="bg-black" 
                ref={dndRef}
                value={text} 
                onChange={e=>{
                e.preventDefault()
                writingHandler(e,curIdx)
            }}/> : null}
            {/* <input 
                type="text" 
                className="bg-black" 
                ref={dndRef}
                value={text} 
                onChange={e=>{
                e.preventDefault()
                writingHandler(e,curIdx)
            }}/>
            {text} */}
        </div>
    )
}

function InputImg(){
    return (
        <div className="w-96 h-auto ba">
            <label htmlFor="image" className="w-96 h-96 bg-black flex items-center justify-center">
                드래그
            </label>
            <input id="image" type="file" multiple={false} accept="image/*" hidden={true}/>
        </div>
    )
}