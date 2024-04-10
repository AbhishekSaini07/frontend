import React from "react";

import style from "../Styles/taskComponent.module.css";



const TaskComponentDetails: React.FC = () => {


    return (
        <div className={style.task}>
        <div >
            <h3>TaskName</h3>
        </div>
        <div >
            <p>Task Description</p>
        </div>
        <div >
            <p>Task Status</p>
        </div>
        <div >
           Times
        </div>
        <div >
            Operations
        </div>
    </div>
    );
}

export default TaskComponentDetails;
