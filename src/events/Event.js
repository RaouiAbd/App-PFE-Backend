import React, {useState} from "react";
import {Grid, makeStyles} from "@material-ui/core";
import Controls from "../controles/Controles";
import Notification from "../shared/Notification";
import {Form, useForm} from "../shared/UseForm";
import axios from "../shared/axios";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';


const useStyles = makeStyles(theme => ({


}))
const Event = ({eventUrl,setOpenPopup}) => {
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''});
    const [selectedDate, handleDateChange] = useState(new Date());
    const [title, setTitle] = useState('');
    const classes = useStyles();


    const handleSubmit = (e) => {
        e.preventDefault();
        const start = selectedDate.toJSON();
        const event = {title, start};
            axios.post(eventUrl, event)
                .then(response => {
                    setNotify({
                        isOpen: true,
                        message: "Event added successfuly",
                        type: 'success'
                    });
                })
                .catch(err => {
                    setNotify({
                        isOpen: true,
                        message: "Try Again",
                        type: 'error'
                    });

                })
    }


    return(
        <Form onSubmit={handleSubmit}>
                    <Grid style={{width:'100%'}}>
                        <Controls.Input
                            name="title"
                            label="Titre d'événement"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker
                                value={selectedDate}
                                onChange={handleDateChange}
                                format="yyyy/MM/dd HH:mm"
                            />
                        </MuiPickersUtilsProvider>
                        <Controls.Button
                            type="submit"
                            text="Ajouter"
                            style={{"color":"black"}}
                        />
                    </Grid>

                    <div>
                    </div>
            <Notification notify={notify} setNotify={setNotify}/>
        </Form>
    );
}

export default Event;
