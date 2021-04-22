import React, {useEffect, useState} from "react";
import axios from "./axios";
import './Feed.css';
import Post from "./Post";
import Parser from 'html-react-parser';
import FileViewer from "react-file-viewer";
import requests from "./Requests";


const Feed = ({postUrl}) => {

    const [posts, setPosts] = useState([]);
    const url = "http://localhost:8080/photoPost/";

    useEffect(() => {
        async function getPosts() {
            let res = await axios.get(postUrl);
            let data = res.data;
            setPosts(data);
        }
        getPosts();
    },[postUrl, posts]);


    const onError = e => {
        console.log(e, "error in file-viewer");
    };


    return (
        <div className="feed">
            <div className="feed_body">
                {posts.length !== 0 ?
                    posts.map((p, i) =>
                        (<div key={i}>
                            <Post name={p.creator.username}
                                  message={Parser(p.content)}
                                  photoUrl={url + p.id}
                                  files={p.files}
                                  downloadFileUrl={requests.downloadFileUrl}>
                            </Post>
                        </div>))
                    : <h3 className="feed_loading">Loading...</h3>}
            </div>
        </div>
    );
};

export default Feed;
