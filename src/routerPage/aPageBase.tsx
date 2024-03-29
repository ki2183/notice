import { ReactNode, useEffect, useRef, useState } from "react";
import { Nav } from "../component/nav/nav";
import gsap from "gsap";
import SideNavOl from "../component/nav/sideNavOl/sideNavOl";

type BasePageProps = {
    children: ReactNode;
  };

  export function BasePage({children}: BasePageProps): React.ReactElement {
    
    const widthRef = useRef<HTMLDivElement>(null)
    const navControlerRef = useRef<HTMLDivElement>(null)
    const [navControler,setNavControler] = useState(false)

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

    return (
        <div style={{ height:'100vh', display:"grid", gridTemplateRows: "4rem auto"}}>
            <Nav SideNavControlor={SideNavControlor}/>
            <div className="grid" ref={widthRef}>
                <div ref={navControlerRef}>
                    <SideNavOl/>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}