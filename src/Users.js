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
import SignUp from "./SignUp";
import requests from "./Requests";
import Popup from "./Popup";


const useStyles = makeStyles(theme => ({
    pageContent: {
        padding: theme.spacing(1),
        margin:theme.spacing(5)
    },
    newButton:{
        position:'absolute',
        right:'10px'
    },

}))


const headCells = [
    { id: 'username', label: 'Nom utilisateur' },
    { id: 'email', label: 'Email' },
    { id: 'mobile', label: 'Telephone' },
    { id: 'function', label: 'Fonction'},
    { id: 'team', label: 'Team'},
]
function Users({usersUrl}){
    const classes = useStyles();
    const [records, setRecords] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
        async function getUsers() {
            let res = await axios.get(usersUrl);
            let data = res.data;
            setRecords(data);
        }
        getUsers();
    },[usersUrl]);


    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPaging
    } = useTable(records, headCells);


    return(
        <>
            <PageHeader className={classes.pageHeader}
                title="Utilisateurs"
                subTitle="Gérer les utilisateurs de la plateforme"
                icon={<PeopleOutlineIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <Popup openPopup={openPopup}
                       setOpenPopup={setOpenPopup}
                       title={"Ajouter un utilisateur"}
                >
                    <SignUp setOpenPopup={setOpenPopup}
                            registerUrl={requests.registerUrl}
                            setRecords={setRecords}
                    />
                </Popup>
                <Toolbar>
                    <Controls.Button
                        text="Ajouter un compte"
                        variant="outlined"
                        startIcon=<AddIcon/>
                        className={classes.newButton}
                        onClick={()=> setOpenPopup(true)}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPaging().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.username}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.mobile}</TableCell>
                                    <TableCell>{item.function}</TableCell>
                                    <TableCell>{item.team}</TableCell>
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
export default Users;
