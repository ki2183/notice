import { useAppSelector } from "../../../redux/hook";
import "./noticeView.css";
import { noticeTypeIMG, noticeTypeTEXT } from "../../notice/noticeType";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Notice } from "../../../redux/Slice/noticeSlice";
import { useEffect } from "react";

function NoticeView(){

    const noticeInfo = useAppSelector(state=>state.notice)
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const page = queryParams.get('page')
    const num = page !== null ? parseInt(page, 10) : 0

    return (
        <div className="container-view">

            {noticeInfo.length === 0 ? null : 
            
            <>
            <ViewInfo
                title={noticeInfo[num].title}
                creationDate={noticeInfo[num].creationDate}
            />
            <div className="frame-view-info">

                {
                    noticeInfo[num].arrNotice.length !== 0 ? 
                    noticeInfo[num].arrNotice.map((item,idx)=>{
                        const text = item as noticeTypeTEXT
                        const img = item as noticeTypeIMG
                        return text.text !== undefined ? 
                        <span key={idx} className="view-info-text">
                            {text.text}
                        </span> :
                        <img 
                            key={idx} 
                            className="frame-view-img" 
                            src={img.url} 
                            alt={img.name}
                        />
                    })
                    : null
                }
                
            </div>
            </>

            }
            

            <div className="frame-view-division"/>

            <AroundNotice num={num} noticeInfo={noticeInfo}/>
            <div className='null-view'/>
        </div>
    )
}

type ViewInfoProp = {
    title:string;
    creationDate:string;
}

function ViewInfo({title,creationDate}:ViewInfoProp){
    return (
        <div className="frame-view-title">
            <span>{title}</span>
            <span>{creationDate}</span>
        </div>
    )
}

type AroundNoticeProps = {
    noticeInfo: Notice;
    num: number;
}

function AroundNotice({noticeInfo,num}:AroundNoticeProps){ //다음 이전 글

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
 
export default NoticeView;