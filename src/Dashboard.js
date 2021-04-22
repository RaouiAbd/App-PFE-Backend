import React, {useState} from "react";
import './Dashboard.css';
import Register from "./Register";
import Users from "./Users";
import requests from "./Requests";
import Popup from "./Popup";
import SignUp from "./SignUp";


function Dashboard(){

    const [component, setComponent] = useState('');

    const item = (topic, renderComponent) => {
        return(
            <div className="sidebar_item" onClick={() => {
                setComponent(renderComponent);
            }}>
                <span className="sidebar_hash">-</span>
                <p>{topic}</p>
            </div>
        );
    };

    return(
        <div className="db">
            <div className="db_sidebar">
                <p>Dashboard</p>
                {item("Utilisateurs", "Users")}
            </div>
            <div className="db_main">
                {component === "Users" && <Users usersUrl={requests.usersUrl}/>}
            </div>

        </div>
    );
}
export default Dashboard;
