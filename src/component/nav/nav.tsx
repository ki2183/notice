import { useDispatch, useSelector } from "react-redux"
import { useAppDispatch, useAppSelector } from "../../redux/hook"
import { changeTheme } from "../../redux/Slice/modeSlice";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type NavProps = {
    SideNavControlor : ()=> void;
}

export function Nav({SideNavControlor}:NavProps){
    const theme = useAppSelector(state => state.theme.theme);
    const dispatch = useAppDispatch()
    const spanRef = useRef<HTMLSpanElement>(null)


    useEffect(()=>{
        gsap.set(spanRef.current,{
            rotate: 180
        })
    },[])
    

    const darkmodeHandler = ()=>{
        gsap.to(spanRef.current,{
            duration:0.2,
            ease:"back.out",
            rotate: theme.span === 'dark_mode' ? 180 : 0
        })
    }

    function changetheme(){
        dispatch(changeTheme())
        darkmodeHandler()
    }

    return(
        <div className="w-screen flex flex-row items-center justify-between"
        style={{borderBottom:`1px solid ${theme.border}`}}>
            <div className="pl-8">
            <span className="material-symbols-outlined cursor-pointer select-none" onClick={SideNavControlor}>menu</span>
            </div>
            <div className="pr-8 flex flex-row">
            <span className="material-symbols-outlined cursor-pointer" ref={spanRef} onClick={changetheme}
            style={{userSelect:"none"}}
            >
                {theme.span}
            </span>
            </div>
        </div>
    )
}