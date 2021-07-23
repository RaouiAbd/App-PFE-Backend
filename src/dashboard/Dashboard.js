import React, {useState} from "react";
import './Dashboard.css';
import Users from "../user/Users";
import requests from "../shared/Requests";
import Calendar from "../calendar/Calendar";
import Groups from "../group/Groups";
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import { useHistory } from "react-router-dom";


function Dashboard(){

    const [component, setComponent] = useState('');
    let history = useHistory();

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
                <div>
                    {item("Home", "Home")}
                    {item("Users", "Users")}
                    {item("Groups", "Groups")}
                    {item("Calendar", "Calendar")}
                </div>
            </div>
            <div className="db_main">
                {component === "Home" && history.push('/')}
                {component === "Users" && <Users usersUrl={requests.usersUrl}/>}
                {component === "Calendar" && <Calendar eventUrl={requests.eventUrl}/>}
                {component === "Groups" && <Groups allGroupsUrl={requests.allGroupsUrl}
                    groupUrl = {requests.groupUrl} groupsUrl = {requests.groupsUrl}/>}
            </div>

        </div>
    );
}
export default Dashboard;
