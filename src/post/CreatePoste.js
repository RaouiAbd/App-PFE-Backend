import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import Icon from "@material-ui/core/Icon";
import axios from "../shared/axios";
import {useSelector} from "react-redux";
import {selectUser} from "../context/userSlice";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InputLabel from "@material-ui/core/InputLabel";
import Notification from "../shared/Notification";
import _ from 'lodash';
import Controls from "../controles/Controles";
import {makeStyles} from "@material-ui/core";
import { useHistory } from "react-router-dom";



const useStyles = makeStyles(theme => ({
    select: {

    },


}))
function CreatePoste({postWithFileUrl, postWithoutFileUrl, allGroupsUrl}){

    const classes = useStyles();
    const user = useSelector(selectUser);
    const [uploadFiles, setUploadFiles] = useState([]);
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [text, setText] = useState('');
    const [success, setSuccess] = useState(false);
    const [fileName, setFileName] = useState([]);
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''});
    let history = useHistory();

    useEffect(() => {
        async function getGroups() {
            let res = await axios.get(allGroupsUrl);
            let data = res.data;
            console.log(data);
            for(let i = 0 ; i < data.length; i++){
                for(let j = 0 ; j < data[i].users.length; j++){
                    if(data[i].users[j].username == user.username){
                        setGroups(group => [... group, data[i]]);
                    }
                }
            }

        }
        getGroups();
    },[allGroupsUrl]);

    const handleChange = (value) => {
        setText(value);
    }
    const modules = {
        toolbar: [
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{ 'align': [] }],
            [{ 'color': [] }, { 'background': [] }],
            ['clean']
        ]
    };

    const formats = [
        'font',
        'size',
        'bold', 'italic', 'underline',
        'list', 'bullet',
        'align',
        'color', 'background'
    ];
    const onChange = (e) => {
        setUploadFiles(e.target.files);
        _.forEach(e.target.files, file => {
            setFileName(fileName => [...fileName, e.target.files[0].name])
        })
    }

    const sendPost = async (e) => {
        e.preventDefault();
        const dateOfPost = new Date().toJSON();
        const content = text;
        const group=selectedGroup;
        const creator = user;
        const post = {dateOfPost, content, group,creator}
        if(uploadFiles.length !== 0){
            const formData = new FormData();
            _.forEach(uploadFiles, file => {
                formData.append("files", file);
            })
            formData.append("properties",
                new Blob([JSON.stringify(post)]
                    , {
                        type: "application/json"
                    }));
            try {
                let r = await axios.post(postWithFileUrl, formData);
                setText('')
                setFileName([]);
                setSuccess(true);
                setNotify({
                    isOpen: true,
                    message: "Post added successfuly",
                    type: 'success'
                });
            } catch (e) {
                console.log(e);
                setNotify({
                    isOpen: true,
                    message: "Somthing go wrong! Please try again",
                    type: 'error'
                });
            }

        } else {
            try {
                const r = axios.post(postWithoutFileUrl, post);
                setText('');
                setSuccess(true);
                setNotify({
                    isOpen: true,
                    message: "Post added successfuly",
                    type: 'success'
                });
            } catch (e) {
                setNotify({
                    isOpen: true,
                    message: "Somthing go wrong! Please try again",
                    type: 'error'
                });
            }
        }
    }

    return(
        <div style={{ marginTop:'80px',maxWidth: '800px', margin: '2rem auto', padding:'30px 2%',backgroundColor:'white' }}>
            <div style={{ textAlign: 'center' }}>
                <h2 style={{marginTop:'80px', marginBottom:'20px', fontWeight:'lighter'}}>
                    Create New Post
                </h2>
            </div>
            <form>
                <Controls.Select
                    name="group"
                    label="Group"
                    value={selectedGroup}
                    onChange={e=>setSelectedGroup(e.target.value)}
                    options={groups}
                />
                <div style={{marginTop:'10px'}}>
                    <ReactQuill value={text}
                                theme="snow"
                                onChange={handleChange}
                                modules={modules}
                                formats={formats}
                    />
                </div>
                {
                    fileName.length ? fileName.map(f => (
                    <div style={{marginTop: '2rem'}} key={f}>
                        <h4 style={{backgroundColor:'whiteSmoke'}}>{f}</h4>
                    </div>
                )) : null
                }
                <div style={{ textAlign: 'center',marginTop:'4rem', display:'flex',}}>
                    <Button
                        variant="contained"
                        style={{color:'black'}}
                        endIcon={<Icon>send</Icon>}
                        onClick={sendPost}
                    >
                        Send
                    </Button>
                    <InputLabel style={{marginLeft:'20px'}}>
                        <input style={{display:'none'}}
                               name="file"
                               multiple
                               onChange={onChange}
                               type="file" />
                        <div className="inputOption_import">
                            <AttachFileIcon/>
                        </div>
                    </InputLabel>
                </div>
            </form>
            <Notification notify={notify} setNotify={setNotify}/>
        </div>
    );
}

export default CreatePoste;
