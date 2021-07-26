import React, {useEffect, useState} from "react";
import './Comment.css';
import axios from "../shared/axios";
import {useSelector} from "react-redux";
import {selectUser} from "../context/userSlice";
import CreateIcon from '@material-ui/icons/Create';


function Comment({id, getCommentsUrl, addCommentUrl}){
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const user = useSelector(selectUser);

    useEffect(() => {
        async function getComments() {
            let res = await axios.get(getCommentsUrl + id);
            let data = res.data;
            setComments(data);
        }
        getComments();
    },[getCommentsUrl + id, comments]);

    const sendComment = (e) =>{
        e.preventDefault();
        const message = comment;
        axios.post(addCommentUrl + user.username + "/" + id, {message})
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
                        )) : <div>No comment</div>
                }
            </div>
            <div className="comment_input">
                <CreateIcon/>
                <form>
                    <input type="text" value={comment} onChange={e=>setComment(e.target.value)}/>
                    <button onClick={sendComment}>Send</button>
                </form>
            </div>
        </div>
    );

}
export default Comment;
