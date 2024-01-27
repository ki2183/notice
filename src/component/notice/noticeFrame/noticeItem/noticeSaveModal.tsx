import ReactModal from "react-modal";

type saveMoalProbs ={
    saveModalIsOpen : boolean;
    closeSaveModal : ()=> void;
    saveXY: {x:number,y:number}
}

export default function SaveModal({closeSaveModal,saveModalIsOpen,saveXY}:saveMoalProbs){
    const customStyles = {
        overlay: {
          backgroundColor: 'transparent', // 배경색 및 투명도 조절
        },
        content: {
          width: '100vw', 
          height: '100vh', 
          backgroundColor: 'transparent',
          left:0,
          top:0,
          overflow:'hidden',
          border:'none'
        },
      };
    return(
        <ReactModal
        isOpen={saveModalIsOpen}
        onRequestClose={closeSaveModal}
        style={customStyles}
      >
        <div className='optionbutton-item w-screen h-screen'onClick={closeSaveModal}/>
        <div 
            className='bg-slate-100 w-5 h-5 absolute' 
            style={{
                left:`${saveXY.x}px`,
                top:`${saveXY.y}px`, 
            }}

            >
                <div className='optionbutton-item' onClick={e=>{ closeSaveModal()}}>
                    <span>삭제하기</span>
                    <span className="material-symbols-outlined select-none trash">
                            delete
                        </span>
                </div>
                
            </div>
      </ReactModal>
    )
}