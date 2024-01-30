import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hook";
import { Notice } from "../../../redux/Slice/noticeSlice";

type ViewInfoProp = {
    title:string;
    creationDate:string;
    num:number
}

export function ViewInfo({title,creationDate,num}:ViewInfoProp){

    const theme = useAppSelector(state => state.theme.theme)
    const navigate = useNavigate()
    const updateHandler = () => {
        navigate(`/update?page=${num}`)
    }
    return (
        <div className="frame-view-title">
            <span>{title}</span>
            <div className="flex flex-row item-center justify-between">
                <span className="text-sm" style={{color:theme.lightText}}>{creationDate}</span>
                <button 
                    className="updateButton" 
                    style={{background:theme.modal}}
                    onClick={updateHandler}
                >
                    수정하기
                </button>
            </div>
        </div>
    )
}

type AroundNoticeProps = {
    noticeInfo: Notice;
    num: number;
}

export function AroundNotice({noticeInfo,num}:AroundNoticeProps){ //다음 이전 글

    const navigate = useNavigate()
    const theme = useAppSelector(state => state.theme.theme)

    return(
        <div className="frame-view-aroundNotice">
                {//이 인덱스가 마지막이 아니고 다음것이 있어야함
                    (num < noticeInfo.length - 1 && noticeInfo[num + 1]) ? 
                    (<div className="next-notice" onClick={e=>{
                        navigate(`/view?page=${num + 1}`)
                    }}>
                        <span className="material-symbols-outlined cursor-pointer view-button viewup">
                            arrow_drop_up
                        </span>
                        <span style={{color:theme.lightText}}>
                            {noticeInfo[num + 1].title}
                        </span>
                    </div>) : null
                }
                {//이 인덱스가 마지막이 아니고 다음것이 있어야함
                    (num > 0 && noticeInfo[num - 1]) ? 
                    (<div className="next-notice" onClick={e=>{
                        navigate(`/view?page=${num-1}`)
                    }}>
                        <span className="material-symbols-outlined cursor-pointer view-button viewup">
                            arrow_drop_down
                        </span>
                        <span style={{color:theme.lightText}}>
                            {noticeInfo[num - 1].title}
                        </span>
                    </div>) : null
                }

        </div>
        )
}
