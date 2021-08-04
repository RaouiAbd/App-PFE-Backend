import React, {useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import Controls from "../controles/Controles";
import Notification from "../shared/Notification";
import axios from "../shared/axios";
import Avatar from "@material-ui/core/Avatar";

const GroupUsers=({groupUsersUrl, id}) =>{
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''});
    const [users, setUsers] = useState([]);
    const [group, setGroup] = useState(null);

    useEffect(() => {
        async function getGroup() {
            let res = await axios.get('/group/' + id);
            let data = res.data;
            setGroup(data);
        }
        getGroup();
    },['/group/' + id, group]);

    useEffect(() => {
        async function getUsers() {
            let res = await axios.get(groupUsersUrl + id);
            let data = res.data;
            setUsers(data);

        }
        getUsers();
    },[groupUsersUrl, users]);



    return(
        <Grid style={{width:'500px', height:'300px'}}>
            {
                users.map(u=>(
                    <div key={u.id}
                         style={{
                             borderBottom:'1px solid lightgray',
                             padding:'10px',
                             display:'flex'
                         }}
                    >
                        <Avatar>{u.username[0].toUpperCase()}</Avatar>
                        <h4 style={{
                            alignSelf:'center',
                            marginLeft:'10px',
                            flex:'1'
                            }}
                        >
                            {u.username}
                        </h4>
                        {
                            group &&
                            (
                                group.responsible &&
                                    group.responsible.username === u.username ?
                                        <span style={{alignSelf:'center'}}>
                                        Responsible
                                    </span> :
                                        <span style={{alignSelf:'center'}}>
                                        Member
                                    </span>
                            )
                        }
                    </div>
                ))
            }
            <Notification notify={notify} setNotify={setNotify}/>
        </Grid>
    );
}
export default GroupUsers;
