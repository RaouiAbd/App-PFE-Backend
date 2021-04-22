import React, {useState} from "react";
import './Register.css';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import axios from "./axios";
import {login} from "./userSlice";
import Grid from "@material-ui/core/Grid";
import Controls from './controles/Controles';

const Register = ({registerUrl,setOpenPopup}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const register = (e) => {
        e.preventDefault();
        const user = {username, email, password, repassword};
        axios.post(registerUrl, user)
            .then(response => {
                dispatch(login({
                    id : response.data.id,
                    username : response.data.username,
                    email : response.data.email,
                    password : response.data.password,
                    roles : response.data.roles,
                }));
                setOpenPopup(false);
            })
            .catch(err => {
                alert("peut etre ce compte existe déjà");
                setOpenPopup(false);

            })
    }

    return(
       <div className="form">
            <form>
                <input type="text" name="username" placeholder="username" value={username}
                       onChange={e=>setUsername(e.target.value)}/>
                <input type="email" name="username" placeholder="email" value={email}
                       onChange={e=>setEmail(e.target.value)}/>
                <input type="password" name="password" placeholder="password" value={password}
                       onChange={e=>setPassword(e.target.value)}/>
                <input type="password" name="repassword" placeholder="repassword" value={repassword}
                       onChange={e=>setRepassword(e.target.value)}/>
                <button type="submit" onClick={register}>S'enregistrer</button>
            </form>
        </div>
    );
}
export default Register;
