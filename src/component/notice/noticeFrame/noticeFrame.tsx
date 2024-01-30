
import { ChangeEvent,  useEffect, useRef, useState } from 'react'
import './noticeFrame.css'
import { arrNotice,noticeTypeIMG,noticeTypeTEXT,initialText } from '../noticeType'
import NoticeText from './noticeItem/noticeText'
import NoticeImg from './noticeItem/noticeImg'
import NoticeModal, { ModalItem } from './noticeItem/noticeModal'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { useLocation, useNavigate } from 'react-router-dom'
import { addNoticeArr, updateNoticeArr } from '../../../redux/Slice/noticeSlice'
import { getCurrentDate } from '../getDate'
import { NoticeSaveButton, NoticeSaveButtonFixVer } from './noticeItem/noticebutton'

export type NoticeProps = {
    curIdx : number;
    focusRef:Array<HTMLTextAreaElement|null>;
    moveNotice:(dragIdx:number, dropIdx:number)=>void
    getOptionXY:(x:number,y:number,idx:number) => void
    openModal:()=> void
}

export default function NoticeFrame(){

    const [noticeInfo,setNoticeInfo] = useState<arrNotice>([initialText]) //글데이터
    const [title,setTitle] = useState<string>("") //제목
    const [modalIsOpen, setModalIsOpen] = useState(false); //모달
    const focusRef = useRef<Array<HTMLTextAreaElement|null>>([]) //포커싱 Ref
    const [optionXY,setOptionXY] = useState<{x:number,y:number,idx:number}>({x:0,y:0,idx:0}) //버튼 좌표idx
    const modalRef = useRef<Array<ModalItem>>([]) //모달에 넣을 함수[]
    const noticeTotalInfo = useAppSelector(state => state.notice) //update에 필요
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [updateMode ,setUpdateMode] = useState<boolean>(false) //update로 들어왔으면 true

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const page = queryParams.get('page') //쿼리 변수

    useEffect(()=>{
        if(page !== null && page !== undefined){
            const intPage = parseInt(page)
            if (noticeTotalInfo.length > intPage) {
                setUpdateMode(true)
                setNoticeInfo(noticeTotalInfo[intPage].arrNotice)
                setTitle(noticeTotalInfo[intPage].title)
              }
        }
       
    },[])

    /* 키보드 함수 또는 추가 삭제 관리 */
    // #region

    function titleChangeHandler(e:React.ChangeEvent<HTMLInputElement>){
        setTitle(e.target.value)
    }

    function noticeTextHandler(e: ChangeEvent<HTMLTextAreaElement>, idx: number) {
        const inputValue = e.target.value;
        setNoticeInfo(prevNoticeInfo => {
            return prevNoticeInfo.map((item, i) => {
                if (i === idx && 'text' in item) {
                    return { ...item, text: inputValue };
                }
                return item;
            });
        });
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

     //옵션 위치 계산
    // #endregion
    /* 모달 관리 */
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

    /* 저장 관리 */
    // #region

    function getSaveButtonXY(x:number,y:number){
        setOptionXY({x:x,y:y,idx:0})
        const pageInt = page !== null && page !== undefined ? parseInt(page) : 0
        const saveFunc = [
            {    
                info:"저장하기",
                spanIcon:"save",
                onclick: ()=>{
                    if(title === ""){
                        alert('제목이 비어있어요!')
                        return
                    }
                    dispatch(addNoticeArr({title:title,arrNotice:noticeInfo,creationDate:getCurrentDate(),}))
                    navigate('/')
                }
            }
        ]

        const updateFunc = [
            {    
                info:"수정하기",
                spanIcon:"save",
                onclick: ()=>{
                    if(title === ""){
                        alert('제목이 비어있어요!')
                        return
                    }
                    dispatch(updateNoticeArr({title:title,arrNotice:noticeInfo,idx:pageInt,}))
                    navigate('/')
                }
            }
        ]

        modalRef.current = !updateMode ? saveFunc : updateFunc 
    }
    function getOptionXY(x:number,y:number,idx:number){
        setOptionXY({x:x,y:y,idx:idx})
        modalRef.current = [
            
            {    
                info:"추가하기",
                spanIcon:"add",
                onclick: ()=>addNotice(idx)
            },{    
                info:"삭제하기",
                spanIcon:"delete",
                onclick: ()=>delNotice(idx)
            }
        ]
    }
    // #endregion

    return (
        <div className='flex flex-col items-center justify-center'>
            <NoticeModal
                optionXY={optionXY}
                modalItemArr={modalRef.current}
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
            />

            <div className='null-notice'/>
            <NoticeSaveButton getSaveButtonXY={getSaveButtonXY} openModal={openModal}/>
            <NoticeSaveButtonFixVer getSaveButtonXY={getSaveButtonXY} openModal={openModal}/>
            <div className="frame-notice">
                <input type='text' value={title} className='notice-title' placeholder='제목 입력' onChange={titleChangeHandler}/>
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
                            getOptionXY={getOptionXY}
                            noticeKeyboardHandler={noticeKeyboardHandler}
                        />
                    ):<NoticeImg
                        key={idx} 
                        curIdx={idx}
                        curFile={imgItem}
                        openModal={openModal}
                        focusRef={focusRef.current}
                        moveNotice={moveNotice}
                        getOptionXY={getOptionXY}
                    />
                })}
                
            </div>
           
            <div className='null-notice-bottom'/>
        </div>
    )
}