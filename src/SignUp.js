import React, {useEffect, useState} from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "./controles/Controles";
import { useForm, Form } from './UseForm';
import axios from "./axios";
import {login} from "./userSlice";
import {useDispatch} from "react-redux";
import Notification from "./Notification";
import requests from "./Requests";


const initialFValues = {
    username: '',
    email: '',
    password:'',
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
        if ('password' in fieldValues)
            temp.password = fieldValues.password.length > 7? "" : "Minimum est 8 caratères."
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
                    console.log(response);
                    dispatch(login({
                        id : response.data.id,
                        username : response.data.username,
                        email : response.data.email,
                        password : response.data.password,
                        function : response.data.function,
                        mobile : response.data.mobile,
                        roles : response.data.roles,
                    }));
                    setOpenPopup(false);
                    setNotify({
                        isOpen: true,
                        message: "Le nouveau utilisateur a bien été ajouté",
                        type: 'success'
                    });
                })
                .catch(err => {
                    setNotify({
                        isOpen: true,
                        message: "Essayer un nouveau username",
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
                        label="Nom d'utilisateur"
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
                        label="Téléphone"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Fonction"
                        name="function"
                        value={values.function}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="mot de passe"
                        name="password"
                        value={values.password}
                        onChange={handleInputChange}
                        error={errors.password}
                    />
                    <div style={{display:'flex'}}>
                        <Controls.Checkbox
                            label="Admin"
                            name="isAdmin"
                            value={values.isAdmin}
                            onChange={handleInputChange}
                        />
                        <Controls.Checkbox
                            label="Responsable"
                            name="isResp"
                            value={values.isResp}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Ajouter" />
                    </div>
                </Grid>
            </Grid>
            <Notification notify={notify} setNotify={setNotify}/>
        </Form>
    )
}
