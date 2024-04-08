import React, { useState } from "react";
import { NewTaskData } from "../DataModel/newTaskData";
import TaskComponent from "./TaskConponent";
import TaskService from "../Service/TaskService";



const AddTaskForm: React.FC = () => {
    const [taskData, setTaskData] = useState<NewTaskData>({
        taskName: "",
        taskDescription: "",
        taskDeadline: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTaskData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Simulating success or error based on condition (you can replace this with actual logic)
        const isSuccess = await TaskService.addTask(taskData);// Random success/failure
        if (isSuccess) {
            // Reload page on success
            alert("form added sucessfully");
            window.location.reload();
        } else {
            // Show error alert on failure
            alert("Failed to add task. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="taskName">Task Name:</label>
                <input
                    type="text"
                    id="taskName"
                    name="taskName"
                    value={taskData.taskName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="taskDescription">Task Description:</label>
                <textarea
                    id="taskDescription"
                    name="taskDescription"
                    value={taskData.taskDescription}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="taskDeadline">Task Deadline:</label>
                <input
                    type="datetime-local" // Use datetime-local input type for date and time
                    id="taskDeadline"
                    name="taskDeadline"
                    value={taskData.taskDeadline}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default AddTaskForm;
