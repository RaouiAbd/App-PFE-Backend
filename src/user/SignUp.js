import React, {useEffect, useState} from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../controles/Controles";
import { useForm, Form } from '../shared/UseForm';
import axios from "../shared/axios";
import {login} from "../context/userSlice";
import {useDispatch} from "react-redux";
import Notification from "../shared/Notification";
import requests from "../shared/Requests";


const initialFValues = {
    username: '',
    email: '',
    function: '',
    mobile: '',
    isAdmin:false,
    isResp:false,
};

export default function SignUp({registerUrl,setOpenPopup,setRecords}) {

    const dispatch = useDispatch();
    const [users,setUsers] = useState([]);
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''});

    useEffect(() => {
        async function getUsers() {
            let res = await axios.get(requests.usersUrl);
            let data = res.data;
            setUsers(data);
            setRecords(data);
        }
        getUsers();
    },[requests.usersUrl,users]);


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" : "Ce champ est obligatoire."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "cette addresse email n'est pas valide."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 7 ? "" : "Minimum est 7 nombres."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(initialFValues, true, validate);

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            console.log(values);
            axios.post(registerUrl, values)
                .then(response => {
                    dispatch(login({
                        id : response.data.id,
                        username : response.data.username,
                        email : response.data.email,
                        password : response.data.password,
                        function : response.data.function,
                        mobile : response.data.mobile,
                        roles : response.data.roles,
                    }));
                    setNotify({
                        isOpen: true,
                        message: "Added successfully",
                        type: 'success'
                    });
                    setOpenPopup(false);
                })
                .catch(err => {
                    setNotify({
                        isOpen: true,
                        message: "Something go wrong! please try again",
                        type: 'error'
                    });

                })
        }
    }



    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="username"
                        label="username"
                        value={values.username}
                        onChange={handleInputChange}
                        error={errors.username}
                    />
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        label="mobile"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Function"
                        name="function"
                        value={values.function}
                        onChange={handleInputChange}
                    />
                    <div style={{display:'flex'}}>
                        <Controls.Checkbox
                            label="Admin"
                            name="isAdmin"
                            value={values.isAdmin}
                            onChange={handleInputChange}
                        />
                        <Controls.Checkbox
                            label="Responsible"
                            name="isResp"
                            value={values.isResp}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Add"
                            style={{"backgroundColor" : "black"}}
                        />
                    </div>
                </Grid>
            </Grid>
            <Notification notify={notify} setNotify={setNotify}/>
        </Form>
    )
}
