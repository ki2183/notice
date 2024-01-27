import React, { useEffect, useRef, useState } from 'react'
import './viewInfo.css'
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import NoticeModal from '../notice/noticeFrame/noticeItem/noticeModal';
import { removeNoticeArr } from '../../redux/Slice/noticeSlice';
import { getCurrentDate } from '../notice/getDate';
import { useNavigate } from 'react-router-dom';

export type ModalItem = {
    info:string;
    spanIcon:string;
    onclick:()=> void;
  }
  
  export type NoticeModalProps={
      optionXY:{x:number,y:number,idx?:number};
      modalItemArr:Array<ModalItem>
      modalIsOpen:boolean;
      closeModal:()=> void;
  }

export default function ViewInfo(){

    const [modalIsOpen,setModalIsOpen] = useState<boolean>(false)
    const [optionXY,setOptionXY] = useState<{x:number,y:number,idx:number}>({x:0,y:0,idx:0})
    const modalRef = useRef<Array<ModalItem>>([
        {
            info:"삭제하기",
            spanIcon:"delete",
            onclick:()=>{
                alert();
            }
        }
    ])
    const noticeInfo = useAppSelector(state => state.notice)
    const dispatch = useAppDispatch()

    //modal open close
    // #region
    const closeModal = ()=> {
        setModalIsOpen(false)
    }
    const openModal = ()=> {
        setModalIsOpen(true)
    }
    // #endregion

    useEffect(()=>{
        console.log(noticeInfo)
    },[])

    function optionClick(x:number,y:number,idx:number){
        setOptionXY({x:x,y:y,idx:idx})
        modalRef.current[0] = {
            info:"삭제하기",
            spanIcon:"delete",
            onclick:()=>{
                dispatch(removeNoticeArr(idx))
            }
        }
        openModal()
    }
    
    return (
        <div className='viewBox'>
            {noticeInfo.length === 0 ? null : 
            noticeInfo.map((item,idx)=>(
                <ViewContents
                    key={idx}
                    creationDate={item.creationDate}
                    title={item.title}
                    idx={idx}
                    optionClick={optionClick}
                />
            ))
            }
      
            <NoticeModal
                optionXY={optionXY}
                modalItemArr={modalRef.current}
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
            />
        </div>
    )
}

type ViewContentsProps = {
    optionClick:(x:number,y:number,idx:number)=>void
    idx : number
    title: string
    creationDate:string
}

function ViewContents({
    optionClick,
    creationDate,
    title,
    idx,
}:ViewContentsProps){

    function onClickHandler(e:React.MouseEvent<HTMLSpanElement>){
        optionClick(e.clientX,e.clientY,idx)
    }
    const navigate = useNavigate()
    const viewInfo = () =>{
        navigate(`/view?page=${idx}`)
    }

    return(
        <div className='frame-notice-info' onClick={viewInfo}>
        <div className='box-notice-info'>
            <div className='text-3xl flex items-center'>
                <span className='ml-4 mt-2'>{title}</span>
            </div>
            <div className='text-l flex items-center'>
                <span className='ml-4'>{creationDate }</span>
            </div>
        </div>
        <div className='flex flex-col items-end'>
            <span onClick={onClickHandler} className="material-symbols-outlined select-none main-contents-option">
                more_horiz
            </span>
        </div>
    </div>
    )
}