import Link from "react-router-dom/Link";
import ReorderIcon from "@material-ui/icons/Reorder";
import React, {useEffect, useState} from "react";
import './Navbar.css';
import {useDispatch, useSelector} from "react-redux";
import {logout, selectUser} from "./userSlice";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import axios from "./axios";
import requests from "./Requests";
import RightPanel from "./rightPanel/RightPanel";
import TelegramIcon from '@material-ui/icons/Telegram';
import ChatIcon from '@material-ui/icons/Chat';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EventIcon from '@material-ui/icons/Event';
import HeaderOption from "./HeaderOption";

function Nav() {

    const [className, setClassName] = useState("");
    const [links, setLinks] = useState(false);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function getEvents() {
            let result = await axios.get(requests.eventUrl);
            let data = result.data._embedded.events;
            setEvents(data);
        }
        getEvents();
    },[requests.eventUrl, events]);

    function isAdmin() {
        if(user){
            for(let i = 0; i < user.roles.length; i++){
                if("ADMIN" === user.roles[i].roleName){
                    return true;
                }
            }
            return false;
        }
    }



    const showLinks = () => {
        setLinks(!links);
    }
    const showPanel = (e) => {
        e.preventDefault();
        setOpen(true);
        setLinks(!links);
    }
    const logoutUser = () => {
        dispatch(logout());
        setLinks(!links);
    }
    return(
        <nav className={className}>
            <RightPanel open={open} setOpen={setOpen}/>
            <label className="logo">Mediafinance</label>
            <ul>
                <div className="links" id={links ? "hl" : ""}>
                    <li><Link to="/" onClick={showLinks}>
                        <HeaderOption Icon={HomeIcon} title="Home"/>
                    </Link></li>
                    {isAdmin() ?
                        <li><Link to="/dashboard" onClick={showLinks}>
                            <HeaderOption Icon={DashboardIcon} title="Dashboard"/>
                        </Link></li> : null
                    }
                    <li><Link to="/new-Post" onClick={showLinks}>
                        <HeaderOption Icon={TelegramIcon} title="New Post"/>
                    </Link></li>
                    <li><Link to="/chat" onClick={showLinks}>
                        <HeaderOption Icon={ChatIcon} title="Chat"/>
                    </Link></li>
                    <li onClick={showPanel}>
                        <HeaderOption Icon={EventIcon} title="Events"/>
                    </li>
                    <li onClick={showPanel}>
                        <HeaderOption Icon={NotificationsIcon} title="Notifications"/>
                    </li>
                    <li><Link to="/" className="aClass" onClick={logoutUser}>
                        Logout
                    </Link></li>

                </div>
                <button onClick={showLinks} className="hidden">
                    Menu<ReorderIcon className="reorder"/>
                </button>
            </ul>
        </nav>
    );

}
export default Nav;
