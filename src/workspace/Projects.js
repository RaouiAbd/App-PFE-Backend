import React, {useEffect, useState} from "react";
import axios from "../shared/axios";
import AddIcon from "@material-ui/icons/Add";
import './Projects.css';
import Notification from "../shared/Notification";
import {useSelector} from "react-redux";
import {selectGroup} from "../context/groupSlice";

export const Projects = ({projectsUrl, projectsByGroupUrl,getIdProject}) => {

    const [projects, setProjects] = useState([]);
    const [projectName, setProjectName] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''});
    const selectedGroup = useSelector(selectGroup);

    useEffect(() => {
        async function getProjects(){
            const result = await axios.get(projectsByGroupUrl+selectedGroup.id);
            setProjects(result.data);
        }
        getProjects();
    }, [projectsByGroupUrl+selectedGroup.id, projects]);

    const addProject = async (e) => {
        e.preventDefault();
        try{
            const project = {name:projectName, group:selectedGroup, tasks:null};
            const result = await axios.post(projectsUrl, project);
            setProjectName("");
            setShowForm(!showForm);
            setNotify({
                isOpen: true,
                message: "project added",
                type: 'success'
            });
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
            <p onClick={() => setShowForm(!showForm)}>
                <AddIcon/>
                add a project
            </p>
            <form className={showForm ?"newProject":"newProject hidden"}>
                <input type="text"
                       placeholder="New project"
                       onChange={e=> setProjectName(e.target.value)}
                       value={projectName}
                       name="name"
                />
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
