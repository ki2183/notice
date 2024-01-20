import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './test.css'


type ItemProps = {
  id : number;
  content: string;
}

type DndItemProps = {
  item : ItemProps;
  index : number;
  moveItem : (dragIdx:number,hoverIdx:number)=>void
}

function DndItem({item,index,moveItem}:DndItemProps){
  const ref = React.useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  const [,drag] = useDrag({
    type:'ITEM',
    item: {id:item.content,index},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const [{isDragging}, drop] = useDrop({
    accept:'ITEM',
    hover: (draggedItem:{id:string,index:number})=>{
      moveItem(draggedItem.index,index)
      draggedItem.index = index
    },collect: (monitor) => ({
      isDragging: !!monitor.isOver(),
    }),
    
  })

  let bg = isDragging ? 'bg-gray-500' : 'bg-gray-700'

  drag(drop(ref));

  return(
    <div 
      ref={ref} 
      className={`h-10 flex items-center justify-center text-xl ${bg} item_`}

      >
      {item.content}
    </div>
  )
}

function Background(){
  
  const [item,setItem] = useState<Array<ItemProps>>([
    {
      id:1,
      content:'q'
    },
    {
      id:2,
      content:'w'
    },
    {
      id:3,
      content:'e'
    },
    {
      id:4,
      content:'r'
    }
  ])

  const moveItem = (dragIdx:number,hoverIdx:number) =>{
    const prevItem = item[dragIdx]
    const newItem = [...item]
    newItem.splice(dragIdx,1)
    newItem.splice(hoverIdx,0,prevItem)
    setItem(newItem)
  }

  return(
    <div className='w-screen h-screen bg-slate-950 flex items-center justify-center'>
      <div className='w-2/3 h-5/6 bg-slate-800'>
      {item.map((item_, idx) => (
          // <div key={idx} className='h-10 flex items-center justify-center text-xl'>
          //     {item_.content}
          // </div>
          <DndItem key={idx} item={item_} index={idx} moveItem={moveItem}/>
      ))}
      </div>
    </div>
  )
}


const YourApp = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Background></Background>
    </DndProvider>
  );
};

export default YourApp;