import './index.css'
import menu from '../../assets/images/menu.svg'
import {  useState } from 'react'
import ToDoItems from '../ToDoItems'


const DoingCard = () => {
  const [isInput, setIsInput] = useState<boolean>(false)
  const [title, setTitle] = useState<string | null>("Doing")

  
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
                defaultValue={"Doing"}

        />
          ) : (
               <h2>{title} </h2>
          )
          }
        </div>
        <div className='menuImg'><img src={menu} alt="" /></div>
      </div>
      <div >
         <ToDoItems status={title}></ToDoItems> 
      </div>
    </div>
  )
}

export default DoingCard