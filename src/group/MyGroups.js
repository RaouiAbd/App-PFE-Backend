import React, {useEffect, useState} from "react";
import axios from "../shared/axios";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../context/userSlice";
import {theGroup} from "../context/groupSlice";
import './MyGroups.css';


export const MyGroups = ({allGroupsUrl}) => {

    const [groups, setGroups] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        async function getGroups() {
            let res = await axios.get(allGroupsUrl);
            let data = res.data;
            console.log(data);
            for(let i = 0 ; i < data.length; i++){
                for(let j = 0 ; j < data[i].users.length; j++){
                    if(data[i].users[j].username === user.username){
                        setGroups(group => [... group, data[i]]);
                    }
                }
            }

        }
        getGroups();
    },[allGroupsUrl]);

    return (
        <div className="groups">
            {
                groups.length ?
                    groups.map(g => (
                        <div
                            className="groups__item"
                             onClick={() => dispatch(theGroup({
                                 id: g.id,
                                 username: g.username,
                                 responsible: g.responsible,
                                 posts:g.posts,
                                 users:g.users,
                             }))}
                        >
                            {g.username}
                        </div>
                    )) :
                    <div className="groups__empty">
                        No Groups
                    </div>
            }
        </div>
    );
};

