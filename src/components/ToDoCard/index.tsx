import './index.css'
import menu from '../../assets/images/menu.svg'
import {  useState } from 'react'
import ToDoItems from '../ToDoItems'
import { Droppable } from 'react-beautiful-dnd'


const ToDoCard = () => {
  const [isInput, setIsInput] = useState<boolean>(false)
  const [title, setTitle] = useState<string | null>("ToDo")

  
  const handleClick = () => {
    if (isInput) {
      setIsInput(false)
    } else {
      setIsInput(true)
    }
  }
  


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
   setTitle(e.target.value);
  }
  
  return (
      <div  className='card-wrapper'>
      <div className='menu-title'>
        <div className='inputH2' style={{width:"100%"}} onClick={handleClick}>
          {
          isInput ? (
              <input
                className='titleInput'
                onChange={handleChange}
          type="text"
                autoFocus
                defaultValue={"ToDo"}

        />
          ) : (
               <h2>{title} </h2>
          )
          }
        </div>
        <div className='menuImg'><img src={menu} alt="" /></div>
      </div>
      <div >
        <Droppable droppableId={status || 'default'}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ToDoItems status={title}></ToDoItems>
            </div>
          )}
        </Droppable>
         
      </div>
    </div>
  )
}

export default ToDoCard