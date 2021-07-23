import React, {useEffect, useState} from "react";
import axios from "../shared/axios";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";
import useTable from "../shared/useTable";
import PageHeader from "../shared/PageHeader";
import Controls from "../controles/Controles";
import AddIcon from "@material-ui/icons/Add";
import SignUp from "./SignUp";
import requests from "../shared/Requests";
import Popup from "../shared/Popup";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import Controles from "../controles/Controles";
import Notification from "../shared/Notification";


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
    { id: 'username', label: 'Username' },
    { id: 'email', label: 'Email' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'function', label: 'Job Name'},
]
function Users({usersUrl}){
    const classes = useStyles();
    const [records, setRecords] = useState([]);
    const [record, setRecord] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''});

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
                title="Users"
                subTitle="Manage users"
                icon={<PersonOutlineIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <Popup openPopup={openPopup}
                       setOpenPopup={setOpenPopup}
                       title={"New user"}
                >
                    <SignUp setOpenPopup={setOpenPopup}
                            registerUrl={requests.registerUrl}
                            setRecords={setRecords}
                            allGroupsUrl={requests.allGroupsUrl}
                    />
                </Popup>
                <Toolbar>
                    <Controls.Button
                        text="Add a user"
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
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Notification notify={notify} setNotify={setNotify}/>
        </>
    );
}
export default Users;
