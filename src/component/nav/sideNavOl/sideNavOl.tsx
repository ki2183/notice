import { useNavigate } from 'react-router-dom'
import './sideNavOl.css'

export default function SideNavOl(){

    const navigate = useNavigate()

    const moveURL = (url:string)=>{
        navigate(url)
    }
    
    return <ol className='container-sideNavOl'>

        <li className='container-sideNavLi' onClick={e=>{moveURL('/')}}>
            <span className='sideNavSpan'>홈</span>
        </li>

        <li className='container-sideNavLi' onClick={e=>{moveURL('/notice')}}>
            <span className='sideNavSpan'>글쓰기</span>
        </li>

        <li className='container-sideNavLi flex flex-row'> 
            <span className='sideNavSpan'>Test</span>
        </li>
      
    </ol>
}