import "./index.css";
import createTem from "../../assets/images/createTem.svg";
import { SyntheticEvent, useState , useEffect} from "react";
import plus from "../../assets/images/plus.svg";
import exit from "../../assets/images/exit.svg";
import ToDoItemType from "../../types";

interface ChildPropsType{
    status : string | null
}

const CreateToDo = ({status}: ChildPropsType) => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [todoName, setTodoName] = useState<string>("")
 const [data, setdata] = useState<ToDoItemType[]>([])

useEffect(() => {
setdata(JSON.parse(localStorage.getItem('todos') || ''))
    }, []); 


  const handleAddToDo = (e: SyntheticEvent) => {
    e.preventDefault();
      if (todoName) {
        
      const todo = {
        name: todoName,
        status: `${status}`,
          id: Date.now(),
        };
        
        
      data.push(todo);
          localStorage.setItem("todos", JSON.stringify(data));
          setIsAdding(false)
    }
  };

  return (
    <>
      {isAdding ? (
        <div className="addToCard">
          <input
            type="text"
            className="newToDoInput"
                      placeholder="Enter a title for this card..."
                      onChange={(e)=> setTodoName(e.target.value)}
          />
          <div className="d-flex">
            <button className="btn btn-primary" onClick={handleAddToDo}>
              Add card
            </button>
            <img onClick={()=> setIsAdding(false)} className="ml-2 cursor-pointer" src={exit} alt="" />
          </div>
        </div>
      ) : (
        <div className="addToCard-wrap">
          <div className="plus-add" onClick={() => setIsAdding(true)}>
            <img src={plus} alt="" />
            <p>Add a card</p>
          </div>
          <div className="createTem">
            <img src={createTem} alt="" />
          </div>
        </div>
      )}
    </>
  );
};

export default CreateToDo;
