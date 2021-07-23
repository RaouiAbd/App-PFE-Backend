import React, {useState} from "react";
import './Post.css';
import axios from "../shared/axios";
import Avatar from "@material-ui/core/Avatar";
import ChatIcon from '@material-ui/icons/Chat';
import requests from "../shared/Requests";
import Popup from "../shared/Popup";
import Comment from "./Comment";


function Post({idPost,name,date,message,files, downloadFileUrl}){

    const [openPopup, setOpenPopup] = useState(false);

    const downloadFile = (file) => {
        axios.get(downloadFileUrl + file.id,
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
    return(
        <div className="post">
            <div className="post__header">
                <Avatar>{name[0].toUpperCase()}</Avatar>
                <div className="post__info">
                    <h2>{name}</h2>
                    <p>{date.slice(0, 10)} At {date.slice(11, 16)}</p>
                </div>
            </div>
            <div className="post__body">
                <p>{message}</p>
                {
                    files.length ? <h4>Attachments : </h4> : null
                }
                <div className="post__pj">
                    {
                        files.length ?
                            files.map(file => (
                                <div key={file.id}>
                                    <div onClick={() => downloadFile(file)} className="post__file">
                                        {file.fileName}
                                    </div>
                                </div>
                            ))
                            : null
                    }
                </div>
            </div>
            <div className="post__buttons">
                <div className="post__inputOption"
                     onClick={()=>setOpenPopup(!openPopup)}>
                    <ChatIcon style={{color:'gray'}}/>
                    <h4>Comments</h4>
                </div>
            </div>
            <Popup openPopup={openPopup}
                   setOpenPopup={setOpenPopup}
                   title={"Comments"}
            >
                <Comment id={idPost}
                         addCommentUrl={requests.addCommentUrl}
                         getCommentsUrl={requests.commentsByPostIdUrl}
                />
            </Popup>
        </div>
    )

}
export default Post;
