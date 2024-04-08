import React from "react";
import TaskService from "../Service/TaskService";
import { TaskData } from "../DataModel/taskModel";



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

    return (
        <div className="task">
        <div className="column">
            <h3>{taskName}</h3>
        </div>
        <div className="column">
            <p>{taskDescription}</p>
        </div>
        <div className="column">
            <p>Status: {taskStatus}</p>
        </div>
        <div className="column">
            <p>Task Deadline: {taskDeadline}</p>
            <p>Created Time: {taskCreatedTime}</p>
        </div>
        <div className="button-column">
            <button onClick={handleComplete}>Mark as Done</button>
            <button onClick={handleRemove}>Delete Task</button>
        </div>
    </div>
    );
}

export default TaskComponent;
