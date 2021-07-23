import React, {useEffect, useState} from "react";
import axios from "../shared/axios";
import Notification from "../shared/Notification";
import Controls from "../controles/Controles";
import {makeStyles} from "@material-ui/core";



const useStyles = makeStyles(theme => ({
    select: {

    },


}))
function DeleteUserFromGroup({groupUsersUrl, groupUserUrl,setOpenPopup,id}){

    const classes = useStyles();
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''});
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getUsers() {
            let res = await axios.get(groupUsersUrl + id);
            let data = res.data;
            setUsers(data);

        }
        getUsers();
    },[groupUsersUrl]);

    const deleteMember = async (e) => {
        e.preventDefault();
        try{
            axios.delete(groupUserUrl+'/'+id+'/'+selectedUser.username);
            setNotify({
                isOpen: true,
                message: "Member deleted successfuly",
                type: 'success'
            });
        }catch (e) {
            setNotify({
                isOpen: true,
                message: "Not deleted",
                type: 'error'
            });
        }

    }

    return(
        <div style={{width:'500px'}}>
            <form>
                <Controls.Select
                    name="username"
                    label="Users"
                    value={selectedUser}
                    onChange={e=>setSelectedUser(e.target.value)}
                    options={users}
                />
                <div>
                    <Controls.Button
                        text="Delete"
                        onClick={deleteMember}
                        style={{"backgroundColor":"black"}}
                    />
                </div>
            </form>
            <Notification notify={notify} setNotify={setNotify}/>
        </div>
    );
}

export default DeleteUserFromGroup;
