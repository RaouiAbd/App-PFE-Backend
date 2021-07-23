import React, {useEffect, useState} from "react";
import axios from "../shared/axios";
import Notification from "../shared/Notification";
import Controls from "../controles/Controles";
import {makeStyles} from "@material-ui/core";



const useStyles = makeStyles(theme => ({
    select: {

    },


}))
function AddUserToGroup({usersUrl, groupUserUrl,setOpenPopup,id}){

    const classes = useStyles();
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''});
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(()=> {
        async function getUsers() {
            let result = await axios.get(usersUrl);
            let data = result.data;
            setUsers(data);
        }
        getUsers();
    },[usersUrl]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
           let r = await axios.post(groupUserUrl+'/'+id+'/'+selectedUser.username);
            setNotify({
                isOpen: true,
                message: "Member added successfuly",
                type: 'success'
            });

        } catch (e) {
            setNotify({
                isOpen: true,
                message: "This member already exist",
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
                        type="submit"
                        text="Ajouter"
                        onClick={handleSubmit}
                        style={{"backgroundColor":"black"}}
                    />
                </div>
            </form>
            <Notification notify={notify} setNotify={setNotify}/>
        </div>
    );
}

export default AddUserToGroup;
