import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import Icon from "@material-ui/core/Icon";
import axios from "./axios";
import {useSelector} from "react-redux";
import {selectUser} from "./userSlice";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InputLabel from "@material-ui/core/InputLabel";
import Notification from "./Notification";
import _ from 'lodash';


function CreatePoste({postWithFileUrl, postWithoutFileUrl}){

    const user = useSelector(selectUser);
    const [uploadFiles, setUploadFiles] = useState([]);
    const [text, setText] = useState('');
    const [success, setSuccess] = useState(false);
    const [fileName, setFileName] = useState([]);
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''});

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
        const dateOfPost = new Date().toJSON().slice(0,10);
        const content = text;
        const photoName = "";
        const creator = user;
        const post = {dateOfPost, photoName, content, creator}
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
                    message: "Votre publication a bien été envoyée",
                    type: 'success'
                });
            } catch (e) {
                console.log(e);
                setNotify({
                    isOpen: true,
                    message: "S'il vous plait essayer une autre fois",
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
                    message: "Votre publication a bien été envoyée",
                    type: 'success'
                });
            } catch (e) {
                console.log(e);
                setNotify({
                    isOpen: true,
                    message: "S'il vous plait essayer une autre fois",
                    type: 'error'
                });
            }
        }
    }

    return(
        <div style={{ marginTop:'100px',maxWidth: '800px', margin: '2rem auto', paddingLeft:'2%', paddingRight:'2%' }}>
            <div style={{ textAlign: 'center' }}>
                <h2 style={{marginTop:'80px', marginBottom:'20px', fontWeight:'lighter'}}>
                    Ajouter une publication
                </h2>
            </div>
            <form>
                <div>
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
                        Publier
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
