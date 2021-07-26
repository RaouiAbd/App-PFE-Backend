import React, {useEffect, useState} from "react";
import {Projects} from "./Projects";
import {Tasks} from "./Tasks";
import requests from "../shared/Requests";
import {ComponentWhenNothingSelected} from "./ComponentWhenNothingSelected";
import './Workspace.css';

export const Workspace = () => {

    const [idProject, setIdProject] = useState(-1);


    return(
        <div className="workspace">
            <div className="workspace_projects">
                <Projects projectsUrl={requests.projectsUrl}
                          projectsByGroupUrl={requests.projectsByGroupUrl}
                          getIdProject={idProject => setIdProject(idProject)}
                />
            </div>
            <div className="workspace_tasks">
                {idProject === -1 ? <ComponentWhenNothingSelected name={"Project"}/>
                    : <Tasks tasksByProjectUrl={requests.tasksByProjectUrl}
                             idProject={idProject}
                    />
                }
            </div>
        </div>

    );
}
