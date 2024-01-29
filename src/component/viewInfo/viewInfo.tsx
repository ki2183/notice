import React, { useEffect, useRef, useState } from 'react'
import './viewInfo.css'
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import NoticeModal from '../notice/noticeFrame/noticeItem/noticeModal';
import { Notice, NoticeDto, removeNoticeArr } from '../../redux/Slice/noticeSlice';
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
    const [page,setPage] = useState<NoticeDto[][]>([])
    const [pageNum,setPageNum] = useState<number>(1)
    const contentNum = 6 //보여주는 컨텐츠 개수
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
    const noticeLen = noticeInfo.length
    const noticeInfo_ =  [...noticeInfo].reverse()
    const theme = useAppSelector(state => state.theme.theme)
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
        // const arr = []
        const newArr = Array.from({length:Math.ceil(noticeInfo.length / contentNum)},
        (v,i)=> noticeInfo_.slice(i*contentNum, i*contentNum +contentNum))
        setPage(newArr)
    },[noticeInfo])

    useEffect(()=>{
        console.log(noticeInfo)
        // const arr = []
        const newArr = Array.from({length:Math.ceil(noticeInfo.length / contentNum)},
        (v,i)=> noticeInfo_.slice(i*contentNum, i*contentNum +contentNum))
        setPage(newArr)
    },[])


    useEffect(()=>{
        console.log(page)
    },[page])

    const computeContentsIdx = (idx:number):number=>{  
        return noticeLen-idx-1-(pageNum-1)*contentNum
    }



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
            {/* {noticeInfo.length === 0 ?  */}
            {page.length === 0 ? 
            <div style={{color:theme.lightText}} className='w-50 h-70 flex flex-col item items-center gap-5 ml-auto mr-auto text-gray-300'>
                <span>글이 없읍니다.</span> 
                <span>좌측 상단 메뉴에서 글쓰기로 글을 써주세요</span>
            </div> : 
            page[pageNum-1].map((item,idx)=>(
                <ViewContents
                    key={idx}
                    creationDate={item.creationDate}
                    title={item.title}
                    idx={computeContentsIdx(idx)}
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
    
            <div style={{width:"500px",marginTop:'1rem'}} className='flex items-center justify-center gap-2'>
                {page.map((item,idx)=>(
                    <div 
                        className='text-sm cursor-pointer pageNum' 
                        style={{color: idx+1 === pageNum ? theme.text : theme.lightText}} 
                        key={idx}
                        onClick={e=>{
                            setPageNum(idx+1)
                        }}
                    >{idx+1}
                    </div>
                ))}
            </div>

            <div className='h-5'></div>
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
    const textLightcolor = useAppSelector(state => state.theme.theme.lightText)

    return(
        <div className='frame-notice-info'>
        <div className='box-notice-info' onClick={viewInfo}>
            <div className='text-3xl flex items-center'>
                <span className='ml-4 mt-2'>{title}</span>
            </div>
            <div className='text-l flex items-center text-sm'>
                <span className='ml-4' style={{color:textLightcolor}}>{creationDate}</span>
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