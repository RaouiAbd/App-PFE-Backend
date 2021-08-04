import React, {useEffect, useState} from "react";
import axios from "../shared/axios";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";
import useTable from "../shared/useTable";
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PageHeader from "../shared/PageHeader";
import Controls from "../controles/Controles";
import AddIcon from "@material-ui/icons/Add";
import requests from "../shared/Requests";
import Popup from "../shared/Popup";
import Group from "./Group";
import GroupUsers from "./GroupUsers";
import AddUserToGroup from "./AddUserToGroup";
import DeleteUserFromGroup from "./DeleteUserFromGroup";
import {SetGroupRespToUser} from "./SetGroupRespToUser";


const useStyles = makeStyles(theme => ({
    pageContent: {
        padding: theme.spacing(1),
        margin:theme.spacing(5)
    },
    createButton:{
        position:'absolute',
        right:'10px'
    },
    inviteButton:{

    },

}))


const headCells = [
    { id: 'name', label: 'Name of the group' },
    { id: 'invite', label: '' },
]
function Groups({allGroupsUrl, groupUrl, groupsUrl}){
    const classes = useStyles();
    const [groups, setGroups] = useState([]);
    const [id, setId] = useState('');
    const [openPopupGroup, setOpenPopupGroup] = useState(false);
    const [openPopupMembres, setOpenPopupMembres] = useState(false);
    const [openPopupAddMembre, setOpenPopupAddMembre] = useState(false);
    const [openPopupDeleteMembre, setOpenPopupDeleteMembre] = useState(false);
    const [openPopupSetResp, setOpenPopupSetResp] = useState(false);

    useEffect(() => {
        async function getGroups() {
            let res = await axios.get(allGroupsUrl);
            let data = res.data;
            setGroups(data);
        }
        getGroups();
    },[allGroupsUrl]);

    const deleteGroup = async (id) => {
        await axios.delete(groupUrl + id);
        setGroups(groups.filter(g => g.id !== id));
    }
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPaging
    } = useTable(groups, headCells);


    return(
        <>
            <PageHeader className={classes.pageHeader}
                        title="Groups"
                        subTitle="Manage groups"
                        icon={<PeopleOutlineIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <Popup openPopup={openPopupGroup}
                       setOpenPopup={setOpenPopupGroup}
                       title={"add a groupe"}
                >
                    <Group setOpenPopup={setOpenPopupGroup}
                            groupsUrl={requests.groupsUrl}
                           setGroups={setGroups}
                    />
                </Popup>
                <Popup openPopup={openPopupMembres}
                       setOpenPopup={setOpenPopupMembres}
                       title={"Membres"}
                >
                    <GroupUsers groupUsersUrl={requests.groupUsersUrl}
                                groupUserUrl={requests.groupUserUrl}
                                id={id}
                    />
                </Popup>
                <Popup openPopup={openPopupAddMembre}
                       setOpenPopup={setOpenPopupAddMembre}
                       title={"Add a membre"}
                >
                    <AddUserToGroup usersUrl={requests.usersUrl}
                                    groupUserUrl={requests.groupUserUrl}
                                    id={id}
                                    setOpenPopup={setOpenPopupAddMembre}
                    />
                </Popup>
                <Popup openPopup={openPopupSetResp}
                       setOpenPopup={setOpenPopupSetResp}
                       title={"Add Responsible"}
                >
                    <SetGroupRespToUser groupUserUrl={requests.groupUserUrl}
                                        usersUrl={requests.usersUrl}
                                        id={id}
                                        setOpenPopup={setOpenPopupSetResp}
                    />
                </Popup>
                <Popup openPopup={openPopupDeleteMembre}
                       setOpenPopup={setOpenPopupDeleteMembre}
                       title={"Delete a membre"}
                >
                    <DeleteUserFromGroup usersUrl={requests.usersUrl}
                                         groupUserUrl={requests.groupUserUrl}
                                    groupUsersUrl={requests.groupUsersUrl}
                                    id={id}
                                    setOpenPopup={setOpenPopupAddMembre}
                    />
                </Popup>
                <Toolbar>
                    <Controls.Button
                        text="Create a groupe"
                        variant="outlined"
                        startIcon=<AddIcon/>
                        className={classes.createButton}
                        onClick={()=> setOpenPopupGroup(true)}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPaging().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.username}</TableCell>
                                    <TableCell>
                                        <Controls.Button
                                            text="Membres"
                                            variant="outlined"
                                            onClick={()=> {
                                                setId(item.id);
                                                setOpenPopupMembres(true);
                                            }}
                                        />
                                        <Controls.Button
                                            text="Add Membre"
                                            variant="outlined"
                                            onClick={()=> {
                                                setId(item.id);
                                                setOpenPopupAddMembre(true);
                                            }}
                                        />
                                        <Controls.Button
                                            text="Add Responsible"
                                            variant="outlined"
                                            onClick={()=> {
                                                setId(item.id);
                                                setOpenPopupSetResp(true);
                                            }}
                                        />
                                        <Controls.Button
                                            text="Delete Membre"
                                            variant="outlined"
                                            onClick={()=> {
                                                setId(item.id);
                                                setOpenPopupDeleteMembre(true);
                                            }}
                                        />
                                        <Controls.Button
                                            text="Delete Group"
                                            variant="outlined"
                                            onClick={()=> deleteGroup(item.id)}
                                        />
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
        </>
    );
}
export default Groups;
