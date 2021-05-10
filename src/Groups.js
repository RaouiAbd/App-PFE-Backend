import React, {useEffect, useState} from "react";
import axios from "./axios";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";
import useTable from "./useTable";
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PageHeader from "./PageHeader";
import Controls from "./controles/Controles";
import AddIcon from "@material-ui/icons/Add";
import requests from "./Requests";
import Popup from "./Popup";
import Group from "./Group";
import GroupUsers from "./GroupUsers";
import AddUserToGroup from "./AddUserToGroup";


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
    { id: 'name', label: 'Nom du groupe' },
    { id: 'invite', label: '' },
]
function Groups({allGroupsUrl}){
    const classes = useStyles();
    const [groups, setGroups] = useState([]);
    const [id, setId] = useState('');
    const [openPopupGroup, setOpenPopupGroup] = useState(false);
    const [openPopupMembres, setOpenPopupMembres] = useState(false);
    const [openPopupAddMembre, setOpenPopupAddMembre] = useState(false);

    useEffect(() => {
        async function getGroups() {
            let res = await axios.get(allGroupsUrl);
            let data = res.data;
            setGroups(data);
        }
        getGroups();
    },[allGroupsUrl]);


    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPaging
    } = useTable(groups, headCells);


    return(
        <>
            <PageHeader className={classes.pageHeader}
                        title="Groupes"
                        subTitle="Gérer les groupes de la plateforme"
                        icon={<PeopleOutlineIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <Popup openPopup={openPopupGroup}
                       setOpenPopup={setOpenPopupGroup}
                       title={"Créer un groupe"}
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
                       title={"Ajouter un membre"}
                >
                    <AddUserToGroup usersUrl={requests.usersUrl}
                                    groupUserUrl={requests.groupUserUrl}
                                    id={id}
                                    setOpenPopup={setOpenPopupAddMembre}
                    />
                </Popup>
                <Toolbar>
                    <Controls.Button
                        text="Créer un groupe"
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
                                            text="Voir les membres"
                                            variant="outlined"
                                            onClick={()=> {
                                                setId(item.id);
                                                setOpenPopupMembres(true);
                                            }}
                                        />
                                        <Controls.Button
                                            text="Ajouter un membre"
                                            variant="outlined"
                                            startIcon=<AddIcon/>
                                            onClick={()=> {
                                                setId(item.id);
                                                setOpenPopupAddMembre(true);
                                            }}
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
