import Link from "react-router-dom/Link";
import ReorderIcon from "@material-ui/icons/Reorder";
import React, {useState} from "react";
import './Navbar.css';
import {useDispatch, useSelector} from "react-redux";
import {logout, selectUser} from "./userSlice";
import logo from "./images/mf.png";

function Nav() {

    const [className, setClassName] = useState("");
    const [links, setLinks] = useState(false);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

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
    const logoutUser = () => {
        dispatch(logout());
        setLinks(!links);
    }
    return(
        <nav className={className}>
            <label className="logo">Mediafinance</label>
            <ul>
                <div className="links" id={links ? "hl" : ""}>
                    <li><Link to="/feed" className="aClass" onClick={showLinks}>Acceuil</Link></li>
                    {isAdmin() ?
                        <li><Link to="/dashboard" className="aClass" onClick={showLinks}>Dashboard</Link></li> :
                        null
                    }
                    <li><Link to="/new-Post" className="aClass" onClick={showLinks}>Publication</Link></li>
                    <li><Link to="/" className="aClass" onClick={showLinks}>Notifications</Link></li>
                    {!user?
                        <li><Link to="/login" className="aClass" onClick={showLinks}>S'authentifier</Link></li> :
                        <li><Link to="/" className="aClass" onClick={logoutUser}>Se déconnecter</Link></li>}

                </div>
                <button onClick={showLinks} className="hidden">
                    Menu<ReorderIcon className="reorder"/>
                </button>
            </ul>
        </nav>
    );

}
export default Nav;
