import React, {useEffect, useState} from "react";
import axios from "../shared/axios";
import AddIcon from "@material-ui/icons/Add";
import './Projects.css';
import Notification from "../shared/Notification";
import {useSelector} from "react-redux";
import {selectGroup} from "../context/groupSlice";
import {selectUser} from "../context/userSlice";

export const Projects = ({projectsUrl, projectsByGroupUrl,getIdProject}) => {

    const [projects, setProjects] = useState([]);
    const [projectName, setProjectName] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [projectNameError, setProjectNameError] = useState("");
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''});
    const selectedGroup = useSelector(selectGroup);
    const user = useSelector(selectUser);

    useEffect(() => {
        async function getProjects(){
            const result = await axios.get(projectsByGroupUrl+selectedGroup.id);
            setProjects(result.data);
        }
        getProjects();
    }, [projectsByGroupUrl+selectedGroup.id, projects]);

    function isValidate() {
        let error="";
        if(!projectName){
            error = "This field shouldn't be blank";
        }
        if(error){
            setProjectNameError(error);
            return false;
        }
        return true;
    }

    const addProject = async (e) => {
        e.preventDefault();
        try{
            const isValid = isValidate();
            if(isValid){
                const project = {name:projectName, group:selectedGroup, tasks:null};
                const result = await axios.post(projectsUrl, project);
                setProjectName("");
                setShowForm(!showForm);
                setProjectNameError("");
            }
        }catch (e) {
            setNotify({
                isOpen: true,
                message: "Somthing go wrong! Please try again",
                type: 'error'
            });
        }

    };
    return(
        <div className="projects">
            <h3>
                Projects
            </h3>
            {
                projects.length ?
                    projects.map(p => (
                        <div className="projects-item"
                            onClick={() => {
                            getIdProject(p.id);
                        }}
                        >
                            {p.name}
                        </div>
                    )) :
                    <div></div>
            }
            {
                selectedGroup.responsible &&
                    selectedGroup.responsible.username === user.username ?
                    <p onClick={() => setShowForm(!showForm)}>
                        <AddIcon/>
                        add a project
                    </p> : null
            }
            <form className={showForm ?"newProject":"newProject hidden"}>
                <input type="text"
                       placeholder="New project"
                       onChange={e=> setProjectName(e.target.value)}
                       value={projectName}
                       name="name"
                />
                <div className="form__error">
                    {projectNameError}
                </div>
                <button type="submit"
                        onClick={addProject}
                >
                    add
                </button>
            </form>
            <Notification notify={notify} setNotify={setNotify}/>
        </div>
    );
}
