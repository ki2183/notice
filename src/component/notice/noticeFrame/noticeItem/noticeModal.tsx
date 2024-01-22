import ReactModal from "react-modal";
import { useAppSelector } from "../../../../redux/hook";
import { useEffect } from "react";

type NoticeModalProps={
    optionXY:{x:number,y:number,idx:number};
    delNotice:(idx:number)=>void;
    addNotice:(idx:number)=>void;
    modalIsOpen:boolean;
    closeModal:()=> void;

}

ReactModal.setAppElement('#root');

export default function NoticeModal({addNotice,delNotice,closeModal,modalIsOpen,optionXY}:NoticeModalProps){
    const theme = useAppSelector(state => state.theme.theme.span)
    useEffect(()=>{
        console.log(theme)
    },[])
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
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className='w-screen h-screen bg-transparent left-0 top-0 absolute 'onClick={closeModal}/>
        <div 
            className='optionbutton' 
            style={{
                left:`${optionXY.x+2}px`,
                top:`${optionXY.y+2}px`, 
                color: theme === "light_mode"? '#dbdbdb':'#383838', 
                background:theme !== "light_mode"? 'linear-gradient(161deg, rgb(223 223 223), rgb(186 186 186))':'linear-gradient(161deg, rgb(81, 81, 81),rgb(51 51 51))'
            }}
            // linear-gradient(141deg, rgb(51 51 51), rgb(81, 81, 81));

            >
                <div className='optionbutton-item' onClick={e=>{delNotice(optionXY.idx); closeModal()}}>
                    <span>삭제하기</span>
                    <span className="material-symbols-outlined select-none trash">
                            delete
                        </span>
                </div>
                <div className='optionbutton-item' onClick={e=>{addNotice(optionXY.idx); closeModal()}}>
                    <span>추가하기</span>
                    <span className="material-symbols-outlined select-none trash">
                            add
                        </span>
                </div>
                
            </div>
      </ReactModal>
    )
}