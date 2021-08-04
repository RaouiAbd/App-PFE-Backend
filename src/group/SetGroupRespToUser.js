import React, {useEffect, useState} from "react";
import Controls from "../controles/Controles";
import Notification from "../shared/Notification";
import axios from "../shared/axios";

export const SetGroupRespToUser = ({usersUrl,groupUserUrl,id}) => {

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
            let r = await axios.put(groupUserUrl+'/'+id+'/'+selectedUser.username);
            setNotify({
                isOpen: true,
                message: "Responsible added successfully",
                type: 'success'
            });

        } catch (e) {
            setNotify({
                isOpen: true,
                message: "This group have already a Responsible",
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
                        text="Add"
                        onClick={handleSubmit}
                        style={{backgroundColor:"black"}}
                    />
                </div>
            </form>
            <Notification notify={notify} setNotify={setNotify}/>
        </div>
    );
}
