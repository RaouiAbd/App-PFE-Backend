import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root:{
        top:theme.spacing(9)
    }
}))

const Notification = (props) => {

    const {notify, setNotify} = props;
    const classes = useStyles();

    const handleClose = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setNotify({
            ...notify,
            isOpen:false
        });
    }

    return(
        <Snackbar open={notify.isOpen}
                  autoHideDuration={3000}
                  anchorOrigin={{vertical:"top", horizontal:"center"}}
                  onClose={handleClose}
                  className={classes.root}
        >
            <Alert severity={notify.type}
                   onClose={handleClose}>
                {notify.message}
            </Alert>
        </Snackbar>
    );
}
export default Notification;
