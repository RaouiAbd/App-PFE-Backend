import React, {useEffect, useState} from "react";
import CreateIcon from "@material-ui/icons/Create";
import {useSelector} from "react-redux";
import {selectUser} from "../context/userSlice";
import axios from "../shared/axios";
import requests from "../shared/Requests";
import _ from "lodash";
import Avatar from "@material-ui/core/Avatar";
import InputLabel from "@material-ui/core/InputLabel";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import GetAppIcon from '@material-ui/icons/GetApp';

export const CommentTask = ({getComments, idTask, addComment, addCommentWithFile}) => {
    const user = useSelector(selectUser);
    const [message, setMessage] = useState("");
    const [comments, setComments] = useState([]);
    const [uploadFiles, setUploadFiles] = useState([]);
    const [fileName, setFileName] = useState([]);
    useEffect(() => {
        const getMessagesOfTask = async () => {
            let result = await axios.get(getComments + idTask);
            let data = result.data;
            setComments(data);
        }
        getMessagesOfTask();
    },[getComments+idTask, comments]);

    const onChange = (e) => {
        setUploadFiles(e.target.files);
        _.forEach(e.target.files, file => {
            setFileName(fileName => [...fileName, e.target.files[0].name])
        })
    }
    const downloadFile = (file) => {
        axios.get(requests.downloadFileUrl + file.id,
            {
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/pdf'
                }
            })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', file.fileName); //or any other extension
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => console.log(error));
    }

    const sendMessage = async (e) => {
        e.preventDefault();
        const dateOfMessage = new Date().toJSON();
        const sender = user;
        const commentTask = {dateOfMessage : dateOfMessage, message : message, user: sender};
        if(uploadFiles.length !== 0){
            const formData = new FormData();
            _.forEach(uploadFiles, file => {
                formData.append("files", file);
            })
            formData.append("properties",
                new Blob([JSON.stringify(commentTask)]
                    , {
                        type: "application/json"
                    }));
            try {
                let r = await axios.post(addCommentWithFile+idTask, formData);
                setFileName([]);
                setUploadFiles([]);
            } catch (e) {
                console.log(e);
            }

        } else {
            try {
                const r = axios.post(addComment+idTask, commentTask);
            } catch (e) {
                console.log(e);
            }
        }
        setMessage("");
    }

    const sorted = comments.sort((a, b) => {
        return a.id - b.id;
    })




    return (
        <div style={{width:"500px"}}>
                <div style={{paddingTop:"20px", flex: "1"}}>
                    {
                        sorted.length !== 0 ?
                            sorted.map(m => (
                                <div className={m.user.username === user.username ?
                                    "chatBody_message chatBody_receiver" : "chatBody_message"}>
                                    <h2 className="message_info">{m.user.username}</h2>
                                    <p className="message_text">{m.message}</p>
                                    {
                                        m.files.length ? (
                                            <div className="message_pj">
                                                {
                                                    m.files.length ?
                                                        m.files.map(file => (
                                                            <div key={file.id}>
                                                                <div onClick={() => downloadFile(file)}
                                                                     className="message_file"
                                                                >
                                                                    <GetAppIcon/>
                                                                    <p>{file.fileName}</p>
                                                                </div>
                                                            </div>
                                                        ))
                                                        : null
                                                }
                                            </div>
                                        ) : null
                                    }
                                    <p className="message_timestamp">
                                        le : {m.dateOfMessage.slice(0, 10)} à {m.dateOfMessage.slice(11, 16)}
                                    </p>
                                    <p></p>
                                </div>
                            )): <div style={{marginBottom:"50px"}}>No message</div>
                    }

                </div>
                <div className="chatBody_footer">
                    <form>
                        <input type="text"
                               value={message}
                               onChange={e=>setMessage(e.target.value)}
                        />
                        <InputLabel
                            style={{
                                marginLeft:'5px',
                                alignSelf:'center'
                            }}
                        >
                            <input
                                style={{
                                    display:'none'
                                }}
                                name="file"
                                multiple
                                onChange={onChange}
                                type="file"
                            />
                            <div>
                                <AttachFileIcon/>
                            </div>
                        </InputLabel>
                        <button
                            onClick={sendMessage}
                            style={{
                                color:'white',
                                fontSize:'16px',
                                alignSelf:'center',
                                marginRight:'50px',
                                backgroundColor:'black',
                                border:'none',
                                padding:'10px'
                            }}
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
    );
}
