import { ChangeEvent, TextareaHTMLAttributes, useEffect, useRef, useState } from 'react'
import './viewInfo.css'

type stackType = {
    left:string | null;
    number:number
}

function ViewInfo(){

    const [textArr,setTextArr] = useState<Array<string>>([''])
    const [text,setText] = useState<string>('')
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        inputRefs.current = Array.from({ length: textArr.length }, (_, index) => inputRefs.current[index] || null);
        if(inputRefs.current && inputRefs.current[textArr.length-1]) {
            inputRefs.current[textArr.length-1]?.focus(); 
        }
      }, [textArr.length]);
    
    function textChangeHandler(e:ChangeEvent<HTMLInputElement>){
        setText(e.target.value)
    }

    function keyListener(e:React.KeyboardEvent,index:number){
        if(e.key === 'Enter'){
            console.log(textArr[index+1])
            if(textArr[index+1] === undefined){ //없으면 추가
                setTextArr(prevTextArr =>[...prevTextArr,''])
            }else{ //있으면 다음 칸 포커싱
                if(inputRefs.current && inputRefs.current[index + 1]) {
                    inputRefs.current[index + 1]?.focus();
                }
            }
        }
    }

    useEffect(()=>{
        console.log(textArr[1+1])
    },[])

    return (
        <div className='viewBox'>
            
            <div className='textbox'>
                {textArr.map((item,index)=>(
                    <input 
                        type="text" 
                        className='textChild' 
                        key={index} 
                        ref={(el) => (inputRefs.current[index] = el)}
                        onChange={e=>{
                            textChangeHandler(e)
                        }}
                        onKeyDown={e=>{
                            keyListener(e,index)
                        }}
                        defaultValue={item}
                    ></input>
                ))}
            
            </div>
        </div>
    )
}