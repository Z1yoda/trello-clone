import save from "../../assets/images/save.svg";
import edit from "../../assets/images/edit.svg";
import { SyntheticEvent, useEffect, useState } from "react";
import ToDoItemType from "../../types";
import CreateToDo from "../CreateToDo";
import { Droppable, Draggable } from 'react-beautiful-dnd';

interface StatusPropsType {
    status: string | null;
}

const ToDoItems = ({ status }: StatusPropsType) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [edited, setEdited] = useState<string>("");
    const [editingItemId, setEditingItemId] = useState<number | null>(null);
    const [todos, setTodos] = useState<ToDoItemType[]>([]);

    useEffect(() => {
        function getData(): any[] {
    let data: any[] = [];
    if (localStorage.getItem('todos')) {
        data = JSON.parse(localStorage.getItem('todos') || '');
    }

    return data;
}

        const storedTodos = getData();
        setTodos(storedTodos);
    }, []); 

    const handleEdit = (itemId: number) => {
        setIsEditing(true);
        setEditingItemId(itemId);
    };

    const handleEditSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        const updatedTodos = todos.map((todo) => {
            if (todo.id === editingItemId) {
                return { ...todo, name: edited };
            }
            return todo;
        });

        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));

        setIsEditing(false);
        setEditingItemId(null);
        setEdited("");
    };

    return (
        <div className="todos-wrapper">
            <Droppable droppableId={status || 'default'}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {todos && todos.map((todo, index) => (
                            (status === todo.status) && (
                                <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <div className="hoverBorder">
                                                {isEditing && editingItemId === todo.id ? (
                                                    <div style={{ border: isEditing ? "2px solid rgb(182, 194, 207)" : "2px solid transparent", marginBottom: "6px" }} className="todo-wrapper">
                                                        <div className="editBtn">
                                                            <img onClick={(e) => handleEditSubmit(e)} src={save} alt="" />
                                                        </div>
                                                        <input
                                                            onChange={(e) => setEdited(e.target.value)}
                                                            type="text"
                                                            className="ToDoInput"
                                                            defaultValue={todo.name}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="todo-wrapper" style={{ marginBottom: "6px" }}>
                                                        <div onClick={() => handleEdit(todo.id)} className="editBtn">
                                                            <img src={edit} alt="" />
                                                        </div>
                                                        <p>{todo.name}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            )
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <CreateToDo status={status} />
        </div>
    );
};

export default ToDoItems;
