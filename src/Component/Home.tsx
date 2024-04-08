import React, { useEffect, useState } from 'react';
import { TaskData } from '../DataModel/taskModel';
import TaskService from '../Service/TaskService';
import AddTaskForm from './AddTaskFormComponent';
import MyButton from './Button';
import TaskComponent from './TaskConponent';


const Home: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [tasks, setTasks] = useState<TaskData[]>([]); 
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

        fetchTasks(); // Call fetchTasks function
    }, []);


    
    const toggleModal = () => {
      setIsModalOpen(prevState => !prevState);
  };

    return (
        <div>
            
            <MyButton text='Button' onClick={() => alert("Okay")} />
        <TaskComponent taskId={1} taskName="My First Task"
          taskDescription='Nothing' taskDeadline='now' taskCreatedTime='prev' taskStatus='Pending' />
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
        </div>
    );
};

export default Home;
