import './sideNavOl.css'

export default function SideNavOl(){
    return <ol className='container-sideNavOl'>

        <li className='container-sideNavLi'>
            <span className='sideNavSpan'>홈</span>
        </li>

        <li className='container-sideNavLi'>
            <span className='sideNavSpan'>공지사항</span>
        </li>

        <li className='container-sideNavLi flex flex-row'> 
            <span className='sideNavSpan'>React</span>
        </li>
      
    </ol>
}