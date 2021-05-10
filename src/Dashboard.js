import React, {useState} from "react";
import './Dashboard.css';
import Register from "./Register";
import Users from "./Users";
import requests from "./Requests";
import Popup from "./Popup";
import SignUp from "./SignUp";
import Calendar from "./Calendar";
import Groups from "./Groups";
import LabelImportantIcon from '@material-ui/icons/LabelImportant';


function Dashboard(){

    const [component, setComponent] = useState('');

    const item = (topic, renderComponent) => {
        return(
            <div className="sidebar_item" onClick={() => {
                setComponent(renderComponent);
            }}>
                <span className="sidebar_hash"><LabelImportantIcon/></span>
                <p>{topic}</p>
            </div>
        );
    };

    return(
        <div className="db">
            <div className="db_sidebar">
                <p>Dashboard</p>
                {item("Utilisateurs", "Users")}
                {item("Groupes", "Groups")}
                {item("Calendrier", "Calendar")}
            </div>
            <div className="db_main">
                {component === "Users" && <Users usersUrl={requests.usersUrl}/>}
                {component === "Calendar" && <Calendar eventUrl={requests.eventUrl}/>}
                {component === "Groups" && <Groups allGroupsUrl={requests.allGroupsUrl}/>}
            </div>

        </div>
    );
}
export default Dashboard;
