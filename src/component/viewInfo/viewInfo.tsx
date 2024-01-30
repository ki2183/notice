import React, { useEffect, useRef, useState } from 'react'
import './viewInfo.css'
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import NoticeModal from '../notice/noticeFrame/noticeItem/noticeModal';
import { NoticeDto, removeNoticeArr } from '../../redux/Slice/noticeSlice';
import { FramePageProps, TotalViewContents } from './viewInfoParts';

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

    const [modalIsOpen,setModalIsOpen] = useState<boolean>(false) //모달 tf
    const [optionXY,setOptionXY] = useState<{x:number,y:number,idx:number}>({x:0,y:0,idx:0}) //버튼 x y idx
    const [page,setPage] = useState<NoticeDto[][]>([]) // 글 페이지별 분할
    const [pageNum,setPageNum] = useState<number>(1) //페이지 번호
    const contentNum = 6 //페이지당 보여주는 컨텐츠 개수
    const noticeInfo = useAppSelector(state => state.notice)  
    const noticeLen = noticeInfo.length
    const noticeInfo_ =  [...noticeInfo].reverse()
    const dispatch = useAppDispatch()

    const modalRef = useRef<Array<ModalItem>>([ //모달 func 초기값
        {
            info:"삭제하기",
            spanIcon:"delete",
            onclick:()=>{
                alert();
            }
        }
    ])
    /** modal open close **/
    // #region

    const closeModal = ()=> {
        setModalIsOpen(false)
    }
    const openModal = ()=> {
        setModalIsOpen(true)
    }
    // #endregion
    
    
    /** useEffect **/
    // #region
    
    useEffect(()=>{
        const newArr = Array.from({length:Math.ceil(noticeInfo.length / contentNum)},
        (v,i)=> noticeInfo_.slice(i*contentNum, i*contentNum +contentNum))
        setPage(newArr)
    },[])  //초기값 세팅

    useEffect(()=>{
        const newArr = Array.from({length:Math.ceil(noticeInfo.length / contentNum)},
        (v,i)=> noticeInfo_.slice(i*contentNum, i*contentNum +contentNum))
        setPage(newArr)
    },[noticeInfo]) 


    // #endregion

    /** func **/
    // #region  
    const computeContentsIdx = (idx:number):number=>{  //page idx 계산
        return noticeLen-idx-1-(pageNum-1)*contentNum
    }

    function optionClick(x:number,y:number,idx:number){ //버튼 xy idx 구하기
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
    
    // #endregion  

    return (
        <div className='viewBox'>

            <TotalViewContents
                computeContentsIdx={computeContentsIdx}
                optionClick={optionClick}
                page={page}
                pageNum={pageNum}
            />

            <NoticeModal
                optionXY={optionXY}
                modalItemArr={modalRef.current}
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
            />
    
            <FramePageProps
                page={page}
                pageNum={pageNum}
                setPageNum={setPageNum}
            />

            <div className='h-5'></div>
        </div>
    )
}

