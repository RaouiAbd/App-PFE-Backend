import React, {useEffect, useState} from "react";
import axios from "../shared/axios";
import Comment from "../post/Comment";
import requests from "../shared/Requests";
import Popup from "../shared/Popup";
import AddIcon from "@material-ui/icons/Add";
import Notification from "../shared/Notification";
import './Tasks.css';
import {CommentTask} from "./CommentTask";

export const Tasks = ({tasksByProjectUrl, idProject}) => {
    
    const [tasks, setTasks] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [description, setDescription] = useState("");
    const [currentId, setCurrentId] = useState(null)
    const [isOpen, setIsOpen] = useState(true);
    
    useEffect(() => {
        async function getTasksByProject() {
            let res = await axios.get(tasksByProjectUrl + idProject);
            let data = res.data;
            setTasks(data);
        }
        getTasksByProject();
    }, [tasksByProjectUrl + idProject, tasks]);

    const addTask = async (e) => {
        e.preventDefault();
        try{
            const obj = {description:description, isOpen: isOpen, project : null,comments:null};
            const result = await axios.post(tasksByProjectUrl + idProject, obj);
            console.log(result);
            setDescription("");
            setShowForm(!showForm);
        }catch (e) {
            console.log(e);
        }
    };
    const updateTaskState = async (id) =>{
        await axios.put(tasksByProjectUrl+idProject+'/'+id, {isOpen : !isOpen});
    }

    const viewTask = (id, d) => {
        setCurrentId(id);
        setDescription(d);
        setOpenPopup(!openPopup);
    }

    return(
        <div className="tasks">
            <h3>
                Tasks
            </h3>
            {
                tasks.length ?
                    tasks.map(t => (
                        <div key={t.id} className="tasksItem"
                        >
                            <p onClick={()=>viewTask(t.id,t.description)}>{t.description}</p>
                            <button
                                className={t.isOpen ? "open" : "closed"}
                                onClick={()=>updateTaskState(t.id)}
                            >
                                {t.isOpen ? "Open" : "Closed"}
                            </button>
                            <Popup openPopup={openPopup}
                                   setOpenPopup={setOpenPopup}
                                   title={description}
                            >
                                <CommentTask getComments={requests.commentsByTaskIdUrl}
                                             addComment={requests.addCommentToTask}
                                             addCommentWithFile={requests.addCommentWithFileToTask}
                                             idTask={currentId}
                                />
                            </Popup>
                        </div>
                    )) :
                    <div></div>

            }
            <p onClick={() => setShowForm(!showForm)}>
                <AddIcon/>
                add a Task
            </p>
            <form className={showForm ?"newTask":"newTask hidden"}>
                <input type="text"
                       placeholder="New task"
                       onChange={e=> setDescription(e.target.value)}
                       value={description}
                       name="description"
                />
                <button type="submit"
                        onClick={addTask}
                >
                    add
                </button>
            </form>
        </div>
    );
}
