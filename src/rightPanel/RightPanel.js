import React, {useState} from "react";
import { Drawer, makeStyles } from "@material-ui/core";
import EventsContainer from "../events/Event-container";
import requests from "../shared/Requests";

const useStyles = makeStyles(theme => ({
    drawer: {
        width: 330,
        flexShrink: 0
    },
    drawerPaper: {
        width: 330,
        [theme.breakpoints.down("sm")]: {
            width: 320
        }
    }
}));

const RightPanel = ({open, setOpen}) => {
    const classes = useStyles();



    return (
        <Drawer
            className={classes.drawer}
            variant="temporary"
            anchor="right"
            open={open}
            onClose={()=>setOpen(false)}
            classes={{
                paper: classes.drawerPaper
            }}
        >
            <EventsContainer eventUrl={requests.eventUrl}/>
        </Drawer>
    );
};

export default RightPanel;
