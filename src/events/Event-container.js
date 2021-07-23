import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItems from "../listItems/ListItems";
import axios from "../shared/axios";



const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    }
}));


const EventsContainer = ({eventUrl}) => {
    const classes = useStyles();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function getEvents() {
            let result = await axios.get(eventUrl);
            let data = result.data._embedded.events;
            setEvents(data);
        }
        getEvents();
    },[eventUrl, events]);

    return (
        <>
            <h2 style={{margin:'20px 0', textAlign:'center'}}>
                Events
            </h2>
            <List className={classes.root}>
                <ListItems type="ListItemText" data={events} />
            </List>
        </>
    );
};

export default EventsContainer;
