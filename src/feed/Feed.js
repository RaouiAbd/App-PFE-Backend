import React, {useEffect, useState} from "react";
import axios from "../shared/axios";
import './Feed.css';
import Post from "../post/Post";
import Parser from 'html-react-parser';
import requests from "../shared/Requests";
import {useSelector} from "react-redux";
import {selectUser} from "../context/userSlice";
import {selectGroup} from "../context/groupSlice";


const Feed = ({postsByGroup}) => {

    const [posts, setPosts] = useState([]);
    const selectedGroup = useSelector(selectGroup);


    useEffect(() => {
        const getPostsByGroup = async () => {
            let res = await axios.get(postsByGroup + selectedGroup.id);
            let data = res.data;
            setPosts(data);
        }
        getPostsByGroup();
    },[postsByGroup + selectedGroup.id, posts]);

    const sorted = posts.sort((a, b) => {
        return -1 *(a.id - b.id);
    })



    return (
        <div className="feed">
            <h3>{selectedGroup.username}</h3>
            {
                sorted.length !== 0 ?
                    sorted.map(p =>
                        (<div key={p.id}>
                            <Post name={p.creator.username}
                                  message={Parser(p.content)}
                                  date={p.dateOfPost}
                                  files={p.files}
                                  downloadFileUrl={requests.downloadFileUrl}
                                  idPost={p.id}
                            >
                            </Post>
                        </div>))
                    : null
            }
        </div>
    );
};

export default Feed;
