import React, {useEffect, useState} from "react";
import axios from "../shared/axios";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../context/userSlice";
import {theGroup} from "../context/groupSlice";


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
        <div style={{backgroundColor:'white'}}>
            {
                groups.length ?
                    groups.map(g => (
                        <div style={{padding:'10px 5px'}}
                             onClick={() => dispatch(theGroup({
                                 id: g.id,
                                 username: g.username,
                                 posts:g.posts,
                                 users:g.users,
                             }))}
                        >
                            {g.username}
                        </div>
                    )) :
                    <div style={{padding:'5px'}}>
                        Empty List
                    </div>
            }
        </div>
    );
};

