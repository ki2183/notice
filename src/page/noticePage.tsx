import { useEffect, useRef, useState } from "react";
import { Nav } from "../component/nav/nav";
import gsap from "gsap";
import SideNavOl from "../component/nav/sideNavOl/sideNavOl";
import Notice from "../component/notice/notice";
import { useAppDispatch } from "../redux/hook";
import { updateScollRate } from "../redux/Slice/scrollRefSlice";

export function NoticePage(){
    
const widthRef = useRef<HTMLDivElement>(null)
const navControlerRef = useRef<HTMLDivElement>(null)
const [navControler,setNavControler] = useState(false)

const scrollRef = useRef<HTMLDivElement>(null)

const dispatch = useAppDispatch()
useEffect(()=>{
    gsap.set(widthRef.current ,{
        gridTemplateColumns:'0rem auto'
    })
    gsap.set(navControlerRef.current,{
        borderRight:'0px'
    })
},[])

useEffect(()=>{
    gsap.to(widthRef.current ,{
        duration:0.3,
        ease:"power1.Out",
        gridTemplateColumns: !navControler ? '0rem auto' : '15rem auto',
    })
    gsap.to(navControlerRef.current,{
        duration:0.3,
        ease:"power1.Out",
        borderRight:  !navControler ? `0px solid gray` : `1px solid gray`
    })
},[navControler])

function SideNavControlor(){
    setNavControler(!navControler)
}

const scrollHandler = ()=>{
    const scroll = scrollRef.current

    if(scroll){
        const rateMax = scroll.scrollHeight-scroll.clientHeight
        const scrollValue = scroll.scrollTop
        console.log(scrollValue/rateMax)
        dispatch(updateScollRate(scrollValue/rateMax))
        
    }
}

useEffect(()=>{
    scrollRef.current?.addEventListener('scroll',scrollHandler)

    return ()=>{
        scrollRef.current?.removeEventListener('scroll',scrollHandler)
    }
},[])



return (
        <div ref={scrollRef} className="overflow-x-hidden overflow-y-auto container-Noticepage" style={{ height:'100vh', display:"grid", gridTemplateRows: "4rem auto"}}>
            <Nav SideNavControlor={SideNavControlor}/>
            <div className="grid" ref={widthRef}>
                <div ref={navControlerRef}>
                    <SideNavOl/>
                </div>
                <div className="overflow-x-hidden">
                    <Notice/>
                </div>
            </div>
        </div>
    )
}