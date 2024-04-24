import { useEffect, useState } from "react";
import SearchAppBar from "../../components/AppBar";
import DoingCard from "../../components/DoingCard";
import DoneCard from "../../components/DoneCard";
import TestingCard from "../../components/TestingCard";
import ToDoCard from "../../components/ToDoCard";
import "./index.css";
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import ToDoItemType from "../../types";

const Boards = () => {
    const [todos, setTodos] = useState<ToDoItemType[]>([]);

  useEffect(() => {
      function getData(): any[] {
    let data: any[] = [];
    if (localStorage.getItem('todos')) {
        data = JSON.parse(localStorage.getItem('todos') || '');
    }

    return data;
}

        setTodos(getData());
    }, []);

    const onDragEnd = (result: DropResult) => {
        console.log(result);

        const { destination, source, draggableId } = result;

        if (!destination || destination.droppableId === source.droppableId) {
            return;
        }

        const draggedTodo = todos.find(todo => todo.id.toString() === draggableId);
        if (draggedTodo) {

            const updatedTodo = { ...draggedTodo, status: destination.droppableId };

            const updatedTodos = todos.map(todo => {
                if (todo.id === updatedTodo.id) {
                    return updatedTodo;
                }
                return todo;
            });

            setTodos(updatedTodos);

            localStorage.setItem('todos', JSON.stringify(updatedTodos));
        }
    }

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <SearchAppBar />
            </div>
            <div className="main">
                <div className="nav-wrapper">
                    <h3>Trello workspace</h3>
                </div>
                <div className="right-side">
                    <div className="main-header">
                        <h4>My Trello Board</h4>
                    </div>
                    <div className="cards-wrapper">
                        <DragDropContext onDragEnd={onDragEnd}>
                            <ToDoCard />
                            <DoingCard />
                            <TestingCard />
                            <DoneCard />
                        </DragDropContext>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Boards;
