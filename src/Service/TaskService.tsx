import axios from "axios";
import { NewTaskData } from "../DataModel/newTaskData";
import { TaskData } from "../DataModel/taskModel";

const BASE_URL = "http://localhost:5000"; // Update with your backend URL

const TaskService = {
    taskComplete: async (taskId: number) => {
        alert(taskId);
        try {
            const token = localStorage.getItem("token"); // Retrieve token from local storage
            const response = await axios.put(
                `${BASE_URL}/tasks/${taskId}`,
                {},
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}` // Include bearer token in headers
                    }
                }
            );
            if (response.status === 200) {
                alert("Task marked as complete successfully");
                window.location.reload();
            } else {
                throw new Error(
                    "Failed to mark task as complete. Please try again."
                );
            }
        } catch (error) {
            console.log(error);
        }
    },

    deleteTask: async (taskId: number) => {
        try {
            const token = localStorage.getItem("token"); 
            const response = await axios.delete(
                `${BASE_URL}/tasks/${taskId}`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                }
            );
            if (response.status === 200) {
                alert("Task deleted successfully");
                window.location.reload();
            } else {
                throw new Error("Failed to delete task. Please try again.");
            }
        } catch (error) {
            console.log(error);
        }
    },

    fetchTasks: async () => {
        try {
            const token = localStorage.getItem("token"); 
            const response = await axios.get<TaskData[]>(
                `${BASE_URL}/tasks`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            handleServiceError(error);
            throw new Error("Failed to fetch tasks");
        }
    },

    fetchTaskById: async (taskId: number) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get<TaskData>(
                `${BASE_URL}/tasks/${taskId}`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                }
            );
            return response.data;
        } catch (error) {
            handleServiceError(error);
            throw new Error(`Failed to fetch task with ID ${taskId}`);
        }
    },
    addTask: async (taskData: NewTaskData) => {
        try {
            console.log(taskData + "sendto server");
            const token = localStorage.getItem("token");
            const response = await axios.post<TaskData>(
                `${BASE_URL}/addTask`,
                taskData,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}` // Include bearer token in headers
                    }
                }
            );
            return response.data;
        } catch (error) {
            handleServiceError(error);
            
        }
    }
};

function handleServiceError(error: any) {
    console.error("Service error:", error);
    alert("An error occurred. Please try again later.");
}

export default TaskService;
