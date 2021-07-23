import React, {useEffect, useState} from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from "../shared/axios";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import PageHeader from "../shared/PageHeader";
import {makeStyles} from "@material-ui/core";
import Popup from "../shared/Popup";
import Toolbar from "@material-ui/core/Toolbar";
import Controls from "../controles/Controles";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import requests from "../shared/Requests";
import Event from "../events/Event";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';


const useStyles = makeStyles(theme => ({
    pageContent: {
        padding: theme.spacing(2),
        margin:theme.spacing(5),
        minWidth:'900px'
    },
    newButton:{
        position:'absolute',
        right:'0px'
    },

}))
const Calendar = ({eventUrl}) => {

    const [event, setEvent] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        async function getEvents() {
            let result = await axios.get(eventUrl);
            let data = result.data._embedded.events;
            setEvent(data);
        }
        getEvents();
    },[eventUrl, event]);

    return(
        <>
            <PageHeader className={classes.pageHeader}
                        title="Calendar"
                        subTitle="Manage the calendar of planification"
                        icon={<CalendarTodayIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <Popup openPopup={openPopup}
                       setOpenPopup={setOpenPopup}
                       title={"Add event"}
                >
                    <Event eventUrl={requests.eventUrl}
                           setOpenPopup={setOpenPopup}
                    />
                </Popup>
                <Toolbar>
                    <Controls.Button
                        text="Add event"
                        variant="outlined"
                        startIcon=<AddIcon/>
                    className={classes.newButton}
                    onClick={()=> setOpenPopup(true)}
                    />
                </Toolbar>
                <div>
                    <FullCalendar
                        plugins={[ dayGridPlugin ]}
                        initialView="dayGridMonth"
                        weekends={false}
                        events={event}
                    />
                </div>
            </Paper>
        </>
    );
}

export default Calendar;
