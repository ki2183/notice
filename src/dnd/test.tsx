import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { types } from "util";
import { NativeTypes } from 'react-dnd-html5-backend';
import { FILE } from "dns";

function TotalPage(){

  const [selectedFile, setSelectedFile] = useState<Array<File>>([]);
  const ref = useRef(null)

  const [,drop] = useDrop({
    accept: [NativeTypes.FILE],
    drop(item, monitor) {
      const files = (item as DataTransfer & { files: FileList }).files;
      
      if (files && files.length > 0 && files[0].type.startsWith('image/')) {
        if(files[0] !== null && files[0] !== undefined)
          setSelectedFile([...selectedFile,files[0]])
      } else {
        alert('이미지가 아닙니다.')
      }
    },
  })



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if(file !== null && file !== undefined)
      setSelectedFile([...selectedFile,file])
  }


  useEffect(()=>{
    console.log(selectedFile)
  },[selectedFile])

  drop(ref)
  return(
      <div className="w-screen h-screen flex items-center justify-center">
        <label ref={ref} htmlFor="imginput" className="w-52 h-52 flex items-center justify-center bg-slate-900">
          <span>드래그 하거나 클릭
          </span>
        </label>
        <input id="imginput" type="file" accept="image/*" hidden={true} required={true} multiple={false} onChange={handleFileChange}></input>

        {selectedFile && selectedFile.length > 0 ? (
          <div className="w-15 h-auto bg-slate-600">
            {selectedFile.map((file, idx) => (
              <div key={idx} className="w-15 h-15">
                <img src={URL.createObjectURL(file)} width='10px' height='10px'/>
              </div>
            ))}
          </div>
        ) : null}
      </div>
  )
}

export default TotalPage;