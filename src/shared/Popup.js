import React from "react";
import {makeStyles} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import Controles from '../controles/Controles';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    popupWrapper:{
        padding:theme.spacing(2),
        position:"absolute",
        top:theme.spacing(5)
    },
    dialogTitle:{
        padding:theme.spacing(0)
    }
}))

const Popup = (props) => {

    const classes = useStyles();
    const {title, children, openPopup, setOpenPopup} = props;

    return(
        <Dialog open={openPopup}
                maxWidth="md"
                classes={{paper:classes.popupWrapper}}
        >
            <DialogTitle className={classes.dialogTitle}>
                <div style={{display:'flex'}}>
                    <Typography variant="h6" component="div" style={{flexGrow:'1'}}>
                        {title}
                    </Typography>
                    <Controles.ActionButton
                        onClick={()=> setOpenPopup(false)}
                    >
                        <CloseIcon/>
                    </Controles.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    );
}
export default Popup;
