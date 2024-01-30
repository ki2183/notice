import { useAppSelector } from "../../../redux/hook";
import "./noticeView.css";
import { noticeTypeIMG, noticeTypeTEXT } from "../../notice/noticeType";
import { useLocation } from 'react-router-dom';
import { AroundNotice, ViewInfo } from "./noticeViewParts";

export default function NoticeView(){

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
                num = {num}
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