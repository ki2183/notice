import { ChangeEvent, TextareaHTMLAttributes, useEffect, useRef, useState } from 'react'
import './viewInfo.css'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function ViewInfo(){

    const [textArr,setTextArr] = useState<Array<string>>([''])
    const inputRefs = useRef<Array<HTMLTextAreaElement | null>>([]);
    const hiddenRefs = useRef<Array<HTMLDivElement | null>>([]);


    useEffect(() => {
        inputRefs.current = Array.from({ length: textArr.length }, (_, index) => inputRefs.current[index] || null);
        if(inputRefs.current && inputRefs.current[textArr.length-1]) {
            inputRefs.current[textArr.length-1]?.focus(); 
        }
      }, [textArr.length]);

    useEffect(()=>{
        console.log(textArr)
    },[textArr])
    
    function textChangeHandler(e:ChangeEvent<HTMLTextAreaElement>,index:number){

            setTextArr(prevTextArr => {
                const updatedArr = [...prevTextArr] // 새로운 배열 생성
                updatedArr[index] = e.target.value  // 해당 인덱스의 값을 업데이트
                return updatedArr  // 업데이트된 배열을 반환
            });
        
    }

    function keyListener(e:React.KeyboardEvent,index:number){
        if(e.key === 'Enter'){
            e.preventDefault()
            console.log(textArr[index+1])
            if(textArr[index+1] === undefined){ //없으면 추가
                setTextArr(prevTextArr =>[...prevTextArr,''])
            }else{ //있으면 다음 칸 포커싱
                if(inputRefs.current && inputRefs.current[index + 1]) {
                    inputRefs.current[index + 1]?.focus();
                }
            }
        }if(e.key === 'Backspace'){
            console.log(textArr[index])
            if(textArr[index] === '' && index > 0){
                const newTextArr = textArr.filter((_,i)=> i !== index)
                setTextArr(newTextArr)
            }
        }

        setTimeout(() => {
            if (inputRefs.current && inputRefs.current[index]) {
              const currentInputRef = inputRefs.current[index];
          
              if (currentInputRef) {
                currentInputRef.style.height = 'auto';
                currentInputRef.style.height = `${
                  hiddenRefs.current[index]?.scrollHeight ?? 0
                }px`;
              }
            }
          }, 0);
          
    }

    return (
        <div className='viewBox'>
            
            <div className='textbox'>
                {textArr.map((item,index)=>(
                    <>
                        <div 
                            className='textChild_'
                            ref={el=>(hiddenRefs.current[index] = el)}
                            >
                        {inputRefs.current[index]?.value}
                        </div>

                        <textarea
                            style={{height:'2rem'}}
                            className='textChild' 
                            key={index} 
                            ref={(el) => (inputRefs.current[index] = el)}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                textChangeHandler(e,index);
                              }}
                              
                            onKeyDown={e=>{
                                keyListener(e,index)
                            }}
                            defaultValue={item}
                        />
                    </>
                ))}
                
            </div>
        </div>
    )
}