import React, {useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import Controls from "./controles/Controles";
import Notification from "./Notification";
import axios from "./axios";
import requests from "./Requests";

export default function ({groupsUrl,setOpenPopup, setGroups}) {
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''});
    const [groupName, setGroupName] = useState('');
    const [allGroups, setAllGroups] = useState([]);

    useEffect(() => {
        async function getGroups() {
            let res = await axios.get(groupsUrl);
            let data = res.data._embedded.groups;
            setAllGroups(data);
            setGroups(data);
        }
        getGroups();
    },[requests.groupsUrl, allGroups]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = groupName;
        axios.post(groupsUrl, {id:null,username:name, posts:null, users:null})
            .then(response => {
                setOpenPopup(false);
                setNotify({
                    isOpen: true,
                    message: "Le groupe a bien été enregistré",
                    type: 'success'
                });
            })
            .catch(err => {
                setNotify({
                    isOpen: true,
                    message: "Essayer une autre fois",
                    type: 'error'
                });

            })
    }
    return(
        <Grid>
            <form>
                <Controls.Input
                    name="group"
                    label="Nom du groupe"
                    value={groupName}
                    onChange={e=> setGroupName(e.target.value)}
                />
                <div>
                    <Controls.Button
                        type="submit"
                        text="Ajouter"
                        onClick={handleSubmit}
                    />
                </div>
            </form>
            <Notification notify={notify} setNotify={setNotify}/>
        </Grid>
    );
}
