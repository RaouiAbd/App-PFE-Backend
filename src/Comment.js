import React, {useEffect, useState} from "react";
import './Comment.css';
import axios from "./axios";
import Avatar from "@material-ui/core/Avatar";
import {useSelector} from "react-redux";
import {selectUser} from "./userSlice";
import CreateIcon from '@material-ui/icons/Create';


function Comment({idPost, commentsByPostIdUrl, addCommentUrl}){
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const user = useSelector(selectUser);

    useEffect(() => {
        async function getComments() {
            let res = await axios.get(commentsByPostIdUrl + idPost);
            let data = res.data;
            setComments(data);
        }
        getComments();
    },[commentsByPostIdUrl+ idPost, comments]);

    const sendComment = (e) =>{
        e.preventDefault();
        const message = comment;
        console.log(idPost);
        axios.post(addCommentUrl + user.username + "/" + idPost, {message})
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
        setComment('');
    }

    return(
        <div className="comment_post">
            <div className="comment_list">
                {
                    comments.length !== 0 ?
                        comments.map(c =>(
                                <div>
                                    <p
                                        className={c.user.username === user.username ?
                                            "comment_message comment_receiver" : "comment_message"}
                                    >
                                        <span className="comment_name">{c.user.username}</span>
                                        {c.message}
                                        <span className="comment_timestamp">3:52</span>
                                    </p>
                                </div>
                        )) : <div>Pas de commentaires</div>
                }
            </div>
            <div className="comment_input">
                <CreateIcon/>
                <form>
                    <input type="text" value={comment} onChange={e=>setComment(e.target.value)}/>
                    <button onClick={sendComment}>Envoyer</button>
                </form>
            </div>
        </div>
    );

}
export default Comment;
