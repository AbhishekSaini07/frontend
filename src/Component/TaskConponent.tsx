import React from "react";
import { TaskData } from "../DataModel/taskModel";
import TaskService from "../Service/TaskService";
import style from "../Styles/taskComponent.module.css";



const TaskComponent: React.FC<TaskData> = ({ 
    taskId, 
    taskName, 
    taskDescription, 
    taskDeadline, 
    taskStatus, 
    taskCreatedTime, 
    taskDoneTime, 
}) => {

    const handleComplete = () => {
       TaskService.taskComplete(taskId);
        
    };

    const handleRemove = () => {
       TaskService.deleteTask(taskId);
        
    };

    const handleTaskButton= ()=> {
        alert(taskName);
    }

    return (
        <div className={style.task}>
        <div onClick={handleTaskButton}>
            <h3>{taskName}</h3>
        </div>
        <div >
            <p>{taskDescription}</p>
        </div>
        <div >
            <p>Status: {taskStatus}</p>
        </div>
        <div className={style.time}>
            <p>Task Deadline: {taskDeadline}</p>
            <p>Created Time: {taskCreatedTime}</p>
        </div>
        <div className={style.buttoncolumn}>
            <button onClick={handleComplete}>Mark as Done</button>
            <button onClick={handleRemove}>Delete Task</button>
        </div>
    </div>
    );
}

export default TaskComponent;
