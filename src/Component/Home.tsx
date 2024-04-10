import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskData } from '../DataModel/taskModel';
import TaskService from '../Service/TaskService';
import AddTaskForm from './AddTaskFormComponent';
import MyButton from './Button';
import TaskComponent from './TaskConponent';

import { UserData } from '../DataModel/userModel';
import UserService from '../Service/UserService';
const Home: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [tasks, setTasks] = useState<TaskData[]>([]); 
    const [allUser, setAllUser] = useState<UserData[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch tasks from server when component mounts
        const fetchTasks = async () => {
            try {
                const fetchedTasks = await TaskService.fetchTasks();
                setTasks(fetchedTasks);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        };
      //   const fetchUsers = async () => {
      //     try {
      //         const fetchedUsers = await UserService.fetchAllUsers();
      //         setAllUser(fetchedUsers);
      //     } catch (error) {
      //         console.error('Failed to fetch tasks:', error);
      //     }
      // };

        fetchTasks(); // Call fetchTasks function
    }, []);
    


    
    const toggleModal = () => {
      setIsModalOpen(prevState => !prevState);
  };

  async function handelLogOut() {
    const result = await UserService.Logout();
    if(result){
      navigate("/");
    }
    else{
      alert("Logout Failed");
    }
  }

    return (
        <div>
          <button onClick={handelLogOut}>Logout</button>
            
            <MyButton text='Button' onClick={() => alert("Okay")} />
        
        <h1>Task Management App</h1>
        {tasks.map(task => (
                <TaskComponent
                    key={task.taskId}
                    taskId={task.taskId}
                    taskName={task.taskName}
                    taskDescription={task.taskDescription}
                    taskDeadline={task.taskDeadline}
                    taskCreatedTime={task.taskCreatedTime}
                    taskStatus={task.taskStatus}
                />
            ))}
        <button onClick={toggleModal}>Add Task</button>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <span className="close" onClick={toggleModal}>&times;</span>
              <div className="modal-content">
                <AddTaskForm />
              </div>
            </div>
          </div>
        )}
        <h3> All Users </h3>
      
        
        </div>
    );
};

export default Home;
function Logout() {
  throw new Error('Function not implemented.');
}

