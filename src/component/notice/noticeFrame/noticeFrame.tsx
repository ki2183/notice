
import { ChangeEvent,  useEffect, useRef, useState } from 'react'
import './noticeFrame.css'
import { arrNotice,noticeTypeIMG,noticeTypeTEXT,initialText } from '../noticeType'
import NoticeText from './noticeItem/noticeText'
import NoticeImg from './noticeItem/noticeImg'
import NoticeModal from './noticeItem/noticeModal'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { useNavigate } from 'react-router-dom'
import { addNoticeArr } from '../../../redux/Slice/noticeSlice'

export type NoticeProps = {
    curIdx : number;
    focusRef:Array<HTMLTextAreaElement|null>;
    moveNotice:(dragIdx:number, dropIdx:number)=>void
    computeOptionXY:(x:number,y:number,idx:number) => void
    openModal:()=> void
}

export default function NoticeFrame(){

    const [noticeInfo,setNoticeInfo] = useState<arrNotice>([initialText])
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const focusRef = useRef<Array<HTMLTextAreaElement|null>>([])
    const [optionXY,setOptionXY] = useState<{x:number,y:number,idx:number}>({x:0,y:0,idx:0})
    const dispatch = useAppDispatch();
    const notice = useAppSelector(state => state.notice)
    const navigate = useNavigate()
    

    function noticeTextHandler(e:ChangeEvent<HTMLTextAreaElement>,idx:number){
        const inputValue = e.target.value
        const prevNoticeInfo = [...noticeInfo]
        const curText = prevNoticeInfo[idx] as noticeTypeTEXT
        curText.text = inputValue
        setNoticeInfo(prevNoticeInfo)
    } // 입력저장

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


    } //키보드 이벤트 핸들러

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
    } //드래그 핸들러
    
    function AddNoticeImg(url:string,name:string,idx:number){
        const prevNoticeInfo = [...noticeInfo]
        if(noticeInfo.length-1 === idx){ //끝에 img추가하면 text한줄 추가
            prevNoticeInfo.push({url:url,name:name})
            prevNoticeInfo.push({text:""}) 
        }else{
            prevNoticeInfo.splice(idx,0,{url:url,name:name})
        }
        setNoticeInfo(prevNoticeInfo)
        
    } // 이미지 추가

    function computeOptionXY(x:number,y:number,idx:number){
        setOptionXY({x:x,y:y,idx:idx})
    } //옵션 위치 계산

    /* Modal */
    // #region
    function delNotice(idx:number){
        const prevNoticeInfo = [...noticeInfo]
        if(noticeInfo.length !== 1){
            prevNoticeInfo.splice(idx,1)
            setNoticeInfo(prevNoticeInfo)
        } 
    }
    function addNotice(idx:number){
        const prevNoticeInfo = [...noticeInfo]

        prevNoticeInfo.splice(idx+1,0,{text:''})
        setNoticeInfo(prevNoticeInfo) 
    }

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };


    // #endregion

    return (
        <div className='flex flex-col items-center justify-center'>
            <NoticeModal
                optionXY={optionXY}
                delNotice={delNotice}
                addNotice={addNotice}
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
            />

            <div className='null-notice'/>
            <div className="frame-notice">
                <input type='text' className='notice-title' placeholder='제목 입력'/>
                {noticeInfo.map((item,idx)=>{

                    const textItem = (item as noticeTypeTEXT).text
                    const imgItem = (item as noticeTypeIMG)

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
                <button onClick={e=>{
                    console.log(notice)
                }}>확인</button>
                <button onClick={e=>{
                    dispatch(addNoticeArr({
                        title:'',
                       arrNotice:noticeInfo 
                    }))
                }}>체크</button>
                
            </div>
           
            <div className='null-notice-bottom'/>
        </div>
    )
}


// function SideOption(){

//     const [x,setX] = useState<number>(0)
//     const [y,setY] = useState<number>(0)


//     useEffect(()=>{
//         const optionX = document.querySelector(".frame-sideOptionBar")
//         const optionY = document.querySelector(".container-Noticepage")
//         if(optionX){
//             setX(optionX.getBoundingClientRect().x)
//         }
//         if(optionY){
//             setY(optionY.scrol)
//         }
//     },[])

//     useEffect(()=>{console.log(y)},[y])

//     return(
//         <div>

//         </div>
//     )
// }