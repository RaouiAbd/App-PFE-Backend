import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import './Login.css';
import axios from '../shared/axios';
import {useDispatch, useSelector} from "react-redux";
import {login} from "../context/userSlice";


const Login = ({loginUrl, userUrl}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const onLogin = (e) => {
        e.preventDefault();
        axios.post(loginUrl, {username, password})
            .then(response => {
                const jwtToken = response.headers.authorization;
                localStorage.clear();
                localStorage.setItem("token", jwtToken);
                if (jwtToken != undefined) {
                    getUser(username)
                    history.push('/feed');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    const getUser = async (username) => {
            const result = await axios.get(userUrl + username);
            console.log(result);
            dispatch(login({
                id : result.data.id,
                username : result.data.username,
                email : result.data.email,
                password : result.data.password,
                roles : result.data.roles,
            }));
    };

    return(
        <div className="login_center">
            <div className="form">
                <p>Mediafinance</p>
                <form>
                    <input type="text" name="username" placeholder="username" value={username}
                           onChange={e=>setUsername(e.target.value)}/>
                    <input type="password" name="password" placeholder="password" value={password}
                           onChange={e=>setPassword(e.target.value)}/>
                    <button type="submit" onClick={onLogin}>Log in</button>
                </form>
            </div>
        </div>
    );
}
export default Login;
