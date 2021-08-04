import Link from "react-router-dom/Link";
import ReorderIcon from "@material-ui/icons/Reorder";
import React, {useEffect, useState} from "react";
import './Navbar.css';
import {useDispatch, useSelector} from "react-redux";
import {logout, selectUser} from "../context/userSlice";
import axios from "../shared/axios";
import requests from "./Requests";
import RightPanel from "../rightPanel/RightPanel";
import TelegramIcon from '@material-ui/icons/Telegram';
import ChatIcon from '@material-ui/icons/Chat';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EventIcon from '@material-ui/icons/Event';
import HeaderOption from "../shared/HeaderOption";
import {MyGroups} from "../group/MyGroups";
import GroupIcon from '@material-ui/icons/Group';
import WorkIcon from '@material-ui/icons/Work';
import {deleteGroup} from "../context/groupSlice";

function Nav() {

    const [className, setClassName] = useState("");
    const [links, setLinks] = useState(false);
    const [showGroups, setShowGroups] = useState(false)
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
        dispatch(deleteGroup());
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
                    <li><Link to="/workspace" onClick={showLinks}>
                        <HeaderOption Icon={WorkIcon} title="Projects"/>
                    </Link></li>
                    <li style={{position:'relative'}} onClick={e => {
                            setShowGroups(!showGroups);
                        }}
                    >
                        {showGroups ?
                            <>
                                <HeaderOption Icon={GroupIcon} title="MyGroups"/>
                                <div className="myGroups">
                                    <MyGroups allGroupsUrl={requests.allGroupsUrl}/>
                                </div>
                            </>
                            : <HeaderOption Icon={GroupIcon} title="MyGroups"/>
                        }
                    </li>
                    <li onClick={showPanel}>
                        <HeaderOption Icon={EventIcon} title="Events"/>
                    </li>
                    <li><Link to="/" className="aClass" onClick={logoutUser}>
                        Logout
                    </Link></li>

                </div>
                <button onClick={showLinks} className="hiddenReorderIcon">
                    Menu<ReorderIcon className="reorder"/>
                </button>
            </ul>
        </nav>
    );

}
export default Nav;
