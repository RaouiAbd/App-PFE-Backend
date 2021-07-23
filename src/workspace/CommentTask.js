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
import SendIcon from "@material-ui/icons/Send";

export const CommentTask = () => {
    const user = useSelector(selectUser);
    const [message, setMessage] = useState("");
    const [comments, setComments] = useState([]);
    const [uploadFiles, setUploadFiles] = useState([]);
    const [fileName, setFileName] = useState([]);
    useEffect(() => {
        async function getComments() {
            let result = await axios.get();
            let data = result.data;
            setComments(data);
        }
        getComments();
    },[, comments]);

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
                let r = await axios.post("/discussionWithFile", formData);
                setFileName([]);
                setUploadFiles([]);
            } catch (e) {
                console.log(e);
            }

        } else {
            try {
                const r = axios.post("/discussionWithoutFile", discussion);
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
        <div className="chat">
            <div className="chatSidebar">
                <h3></h3>
                {
                    users.length !== 0 ?
                        users.map(u => (
                            <div className="chatSidebar_info"
                                 onClick={() => {
                                     setUserReceiver(u);
                                 }}
                            >
                                <Avatar>
                                    {u.username[0].toUpperCase()}
                                </Avatar>
                                <div>
                                    <h4 key={u.id}>
                                        {u.username}
                                    </h4>
                                    <p>{u.function}</p>
                                </div>
                            </div>
                        )) : <div> Pas d'utilisateurs</div>
                }
            </div>
            <div className="chatBody">
                {
                    userReceiver !== null ? (
                        <div className="chatBody_header">
                            <h4 key={userReceiver.id}>
                                {userReceiver.username}
                            </h4>
                        </div>
                    ) : ""
                }
                <div className="chatBody_body">
                    {
                        sorted.length !== 0 ?
                            sorted.map(m => (
                                <div className={m.sender.username === user.username ?
                                    "chatBody_message chatBody_receiver" : "chatBody_message"}>
                                    <h2 className="message_info">{m.sender.username}</h2>
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
                                                                    {file.fileName}
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
                                </div>
                            )): null
                    }

                </div>
                <div className="chatBody_footer">
                    <form>
                        <input type="text"
                               value={message}
                               onChange={e=>setMessage(e.target.value)}
                        />
                        <InputLabel style={{marginLeft:'5px'}}>
                            <input style={{display:'none'}}
                                   name="file"
                                   multiple
                                   onChange={onChange}
                                   type="file" />
                            <div className="inputOption_import">
                                <AttachFileIcon/>
                            </div>
                        </InputLabel>
                        <SendIcon onClick={sendMessage}
                                  style={{color:'gray',
                                      alignSelf:'center',
                                      marginRight:'50px'}}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
