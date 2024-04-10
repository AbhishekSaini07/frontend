import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import logoPath from '../Assets/Logo/actiDo.png';
import { TaskData } from '../DataModel/taskModel';
import { UserData } from '../DataModel/userModel';
import TaskService from '../Service/TaskService';
import UserService from '../Service/UserService';
import style from '../Styles/home.module.css';
import TaskComponent from './TaskConponent';
import AddTaskForm from './AddTaskFormComponent';
import daylogo from "../Assets/Icons/dayicon.png";
import addlogo from "../Assets/Icons/addicon.jpg";
import settinglogo from "../Assets/Icons/settingicon.jpeg"
import donelogo from "../Assets/Icons/doneicon.jpeg";



const HomeScreen: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [tasks, setTasks] = useState<TaskData[]>([]); 
    const [user, setUser] = useState<UserData>();
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
        
        const fetchUser = async () => {
          try {
              const fetchedUser = await UserService.fetchUser();
              setUser(fetchedUser);
          } catch (error) {
              console.error('Failed to fetch tasks:', error);
          }
      };
      fetchUser();

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
      <div className={style.main}>
            <div className={style.sideMenu}><div className={style.sideMenuBox}>
              <img className={style.imglogo} src={logoPath}  />
              <div className={style.list}>
                <div className={style.userDet}>Login as:<br/>{user?.email}</div>
               
                <ul>
               
                  <li >
                   <span><img src={daylogo}></img></span><p>My Day</p> 
                  </li>
                  <li>
                  <span><img src={donelogo}></img></span><p>Task Done</p>
                  </li>
                  <li>
                  <span><img src={addlogo}></img></span><p>Add Task</p>
                  </li>
                  <li>
                  <span><img src={settinglogo}></img></span><p> Setting</p>
                  </li>
                </ul>
                
              </div>
              <p>Name: {user?.name}<br/>UserName: {user?.userName}<br/>User Description: {user?.userDescription}</p>
              <button onClick={handelLogOut}>Logout</button>

              </div></div>
            <div className={style.mainMenu}>
              <div className={style.headerBox}>
                <div className={style.myday}>My Day</div>
                <div className={style.hdb1}><span>WednesDay April 10 </span><button onClick={toggleModal}>Add Task</button> </div>
              
                </div>
              <div className={style.contentBox}>
                
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
                
            ))}</div>
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
            

      </div>
    );
};

export default HomeScreen;


