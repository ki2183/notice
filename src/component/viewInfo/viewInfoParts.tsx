import { useNavigate } from "react-router-dom";
import { NoticeDto } from "../../redux/Slice/noticeSlice";
import { useAppSelector } from "../../redux/hook";



/** ViewContents **/

//#region

type TotalViewContentsProps = {
    page: NoticeDto[][];
    computeContentsIdx: (idx: number) => number;
    optionClick: (x: number, y: number, idx: number) => void
    pageNum:number
}

export function TotalViewContents({page,pageNum,computeContentsIdx,optionClick}:TotalViewContentsProps){

    const theme = useAppSelector(state => state.theme.theme)

    return(
        <>
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
        </>
    )
}
//#endregion
/** ViewContents **/
//#region
type ViewContentsProps = {
    optionClick:(x:number,y:number,idx:number)=>void
    idx : number
    title: string
    creationDate:string
}

export function ViewContents({
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
    const theme = useAppSelector(state => state.theme.theme)

    return(
        <div className='frame-notice-info'>
        <div className='box-notice-info' onClick={viewInfo}>
            <div className='text-3xl flex items-center'>
                <span className='ml-4 mt-2'>{title}</span>
            </div>
            <div className='text-l flex items-center text-sm'>
                <span className='ml-4' style={{color:theme.lightText}}>{creationDate}</span>
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
// #endregion  

/** Pages **/
//#region
type FramePageProps = {
    page: NoticeDto[][]
    setPageNum: (value: React.SetStateAction<number>) => void
    pageNum:number
}

export function FramePageProps({page,setPageNum,pageNum}:FramePageProps){

    const theme = useAppSelector(state => state.theme.theme)

    return(
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
    )
}
//#endregion