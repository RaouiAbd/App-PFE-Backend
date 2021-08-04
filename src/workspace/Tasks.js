import React, {useEffect, useState} from "react";
import axios from "../shared/axios";
import Comment from "../post/Comment";
import requests from "../shared/Requests";
import Popup from "../shared/Popup";
import AddIcon from "@material-ui/icons/Add";
import Notification from "../shared/Notification";
import './Tasks.css';
import {CommentTask} from "./CommentTask";
import {useSelector} from "react-redux";
import {selectGroup} from "../context/groupSlice";
import {selectUser} from "../context/userSlice";
import DropDown from "../controles/DropDown";

export const Tasks = ({tasksByProjectUrl, groupUsersUrl, idProject}) => {
    
    const [tasks, setTasks] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [description, setDescription] = useState("");
    const [currentId, setCurrentId] = useState(null);
    const [currentTask, setCurrentTask] = useState(null);
    const [isOpen, setIsOpen] = useState(true);
    const [users, setUsers] = useState([]);
    const [value, setValue] = useState(null);
    const [dError,setDError] = useState("");
    const [memberError, setMemberError] = useState("")
    const selectedGroup = useSelector(selectGroup);
    const user = useSelector(selectUser);

    useEffect(() => {
        async function getUsers() {
            let res = await axios.get(groupUsersUrl + selectedGroup.id);
            let data = res.data;
            setUsers(data);
        }
        getUsers();
    },[groupUsersUrl, users]);
    
    useEffect(() => {
        async function getTasksByProject() {
            let res = await axios.get(tasksByProjectUrl + idProject);
            let data = res.data;
            setTasks(data);
        }
        getTasksByProject();
    }, [tasksByProjectUrl + idProject, tasks]);

    function isValidate() {
        let errorDescription="";
        let errorMember="";
        if(!description){
            errorDescription = "This field shouldn't be blank";
        }
        if(value === null){
            errorMember = "Choose a member";
        }
        if(errorMember || errorDescription){
            setMemberError(errorMember);
            setDError(errorDescription);
            return false;
        }
        return true;
    }
    const addTask = async (e) => {
        e.preventDefault();
        try{
            const isValid = isValidate();
            if(isValid){
                const obj = {description:description, isOpen: isOpen, user : value, project : null,comments:null};
                const result = await axios.post(tasksByProjectUrl + idProject, obj);
                console.log(result);
                setDescription("");
                setValue(null);
                setShowForm(!showForm);
                setDError("");
                setMemberError("");
            }
        }catch (e) {
            console.log(e);
        }
    };
    const updateTaskState = async (id) =>{
        await axios.put(tasksByProjectUrl+idProject+'/'+id, {isOpen : !isOpen});
    }

    const viewTask = (t, d) => {
        setCurrentTask(t);
        setCurrentId(t.id);
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
                            <p onClick={()=>viewTask(t,t.description)}>
                                {t.description}
                            </p>
                            {
                                selectedGroup.responsible &&
                                    (selectedGroup.responsible.username === user.username ?
                                            <button
                                                className={t.isOpen ? "open" : "closed"}
                                                onClick={()=>updateTaskState(t.id)}
                                            >
                                                {t.isOpen ? "Open" : "Closed"}
                                            </button> :
                                            <button
                                                className={t.isOpen ? "open" : "closed"}
                                                onClick={()=>updateTaskState(t.id)}
                                                disabled
                                            >
                                                {t.isOpen ? "Open" : "Closed"}
                                            </button>
                                    )
                            }
                            {
                                selectedGroup.responsible.username === user.username ||
                                (currentTask && currentTask.user.username === user.username) ?
                                    <Popup openPopup={openPopup}
                                           setOpenPopup={setOpenPopup}
                                           title={description}
                                    >
                                        <CommentTask getComments={requests.commentsByTaskIdUrl}
                                                     addComment={requests.addCommentToTask}
                                                     addCommentWithFile={requests.addCommentWithFileToTask}
                                                     idTask={currentId}
                                        />
                                    </Popup> : null
                            }
                        </div>
                    )) :
                    <div></div>

            }
            {
                selectedGroup.responsible &&
                selectedGroup.responsible.username === user.username ?
                    <div className="newTask">
                        <p onClick={() => setShowForm(!showForm)}>
                            <AddIcon/>
                            add a Task
                        </p>
                        <form className={showForm ?"formTask":"formTask hidden"}>
                            <input type="text"
                                   placeholder="New task"
                                   onChange={e=> setDescription(e.target.value)}
                                   value={description}
                                   name="description"
                            />
                            <div className="form__error">
                                {dError}
                            </div>
                            <DropDown data={users}
                                      onChange={(val) => setValue(val)}
                                      prompt="Select a member..."
                                      id="id"
                                      label="username"
                            />
                            <div className="form__error">
                                {memberError}
                            </div>
                            <button type="submit"
                                    onClick={addTask}
                            >
                                add
                            </button>
                        </form>
                    </div>
                    : null
            }

        </div>
    );
}
