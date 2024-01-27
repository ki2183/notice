import { useEffect } from "react";
import { useAppSelector } from "../../../redux/hook";
import "./noticeView.css";
import { noticeTypeIMG, noticeTypeTEXT } from "../../notice/noticeType";
import { useLocation, useParams } from 'react-router-dom';

function NoticeView(){

    const noticeInfo = useAppSelector(state=>state.notice)
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const page = queryParams.get('page')
    const num = page !== null ? parseInt(page, 10) : 0

    return (
        <div className="container-view">
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

            <div className="frame-view-division"/>

            <div className="frame-view-aroundNotice">
                <div className="next-notice">
                    <span className="material-symbols-outlined cursor-pointer view-button viewup">
                        arrow_drop_up
                    </span>
                    <span>
                        다음이야 다음이야 다음이야~~~~
                    </span>
                </div>
                <div className="next-notice">
                    <span className="material-symbols-outlined cursor-pointer view-button viewdown">
                        arrow_drop_down
                    </span>
                    <span>
                        이전이야 이전이야 이전이야 ~~~~
                    </span>
                </div>
            </div>
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
 
export default NoticeView;