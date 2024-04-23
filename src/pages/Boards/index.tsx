import SearchAppBar from "../../components/AppBar";
import DoingCard from "../../components/DoingCard";
import DoneCard from "../../components/DoneCard";
import TestingCard from "../../components/TestingCard";
import ToDoCard from "../../components/ToDoCard";
import "./index.css";
import {DragDropContext} from 'react-beautiful-dnd'

const Boards = () => {
  return (
    <div >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <SearchAppBar ></SearchAppBar>
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
            <DragDropContext onDragEnd={() => {
              console.log("dragdrop");
              
            }} >
            <ToDoCard></ToDoCard>
            <DoingCard></DoingCard>
            <TestingCard></TestingCard>
              <DoneCard></DoneCard>
              </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boards;
