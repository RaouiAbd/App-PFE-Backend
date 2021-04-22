import React from "react";
import './Post.css';
import axios from "./axios";
import Avatar from "@material-ui/core/Avatar";
import InputOption from "./InputOption";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ChatIcon from '@material-ui/icons/Chat';
import ShareIcon from '@material-ui/icons/Share';


function Post({name,description,photoUrl, message,files, downloadFileUrl}){

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
                    <p>Description</p>
                </div>
            </div>
            <div className="post__body">
                <p>{message}</p>
                <img src={photoUrl} alt=""/>
                {
                    files.length ? <h4>Pièces Jointes : </h4> : null
                }
                <div className="post__pj">
                    {
                        files.length ?
                            files.map(file => (
                                <div key={file.id}>
                                    <div onClick={() => downloadFile(file)} className="post__file">{file.fileName}</div>
                                </div>
                            ))
                            : null
                    }
                </div>
            </div>
            <div className="post__buttons">
                <InputOption Icon={ChatIcon} title="Commentaires" color="grey"/>
                <InputOption Icon={ShareIcon} title="Partager" color="grey"/>
            </div>
        </div>
    )

}
export default Post;
