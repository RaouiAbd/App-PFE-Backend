import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItems from "../listItems/ListItems";
import axios from "../axios";



const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    }
}));

const MsgList = [
    {
        id: 1,
        title: "Play football",
        subTitle: "July 20, 2020, 1:03:13 pm"
    },
    {
        id: 2,
        title: "Learn new trends",
        subTitle: "July 16, 2020, 12:57:11 am"
    },
    {
        id: 3,
        title: "Create tools for people",
        subTitle: "July 20, 2020, 1:03:13 pm"
    }
];

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
                Evénements
            </h2>
            <List className={classes.root}>
                <ListItems type="ListItemText" data={events} />
            </List>
        </>
    );
};

export default EventsContainer;
