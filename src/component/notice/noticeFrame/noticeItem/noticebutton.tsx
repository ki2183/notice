import { useEffect, useRef } from "react"
import { useAppSelector } from "../../../../redux/hook"
import gsap from "gsap"
type SaveButtonProp = {
    getSaveButtonXY:(x:number,y:number)=>void
    openModal:()=>void
}

export function NoticeSaveButton({getSaveButtonXY,openModal}:SaveButtonProp){

    const scrollHeight = useAppSelector(state => state.scroll)
    const scrollRef = useRef<HTMLDivElement>(null)
    const modalColor = useAppSelector(state => state.theme.theme.modal)

    function OptionXY(e: React.MouseEvent<HTMLSpanElement>) {
        console.log(e.clientX,e.clientY)
        getSaveButtonXY(e.clientX,e.clientY) 
        openModal()
    }

    useEffect(()=>{
        gsap.to(scrollRef.current,{
            duration:0.2,
            top:`${scrollHeight.rate*20}%`,
            ease:'power1.inOut'
        })
    },[scrollHeight])

    return (
        <div className='frame-noticeSaveButton' ref={scrollRef} style={{marginTop:"184px",background:modalColor}}>
                <span onClick={OptionXY} className="material-symbols-outlined cursor-pointer saveButton">
                save
                </span>
        </div>
    )
}


export function NoticeSaveButtonFixVer({getSaveButtonXY,openModal}:SaveButtonProp){

    function OptionXY(e: React.MouseEvent<HTMLSpanElement>) {
        console.log(e.clientX,e.clientY)
        getSaveButtonXY(e.clientX,e.clientY) 
        openModal()
    }

    const modalColor = useAppSelector(state => state.theme.theme.modal)

    return (
        <div className='frame-noticeSaveButtonSaveVer' style={{background:modalColor}}>
                <span onClick={OptionXY} className="material-symbols-outlined cursor-pointer saveButton">
                save
                </span>
        </div>
    )
}