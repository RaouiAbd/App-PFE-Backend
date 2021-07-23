import React, {useEffect, useState} from "react";
import axios from "../shared/axios";
import './Feed.css';
import Post from "../post/Post";
import Parser from 'html-react-parser';
import requests from "../shared/Requests";
import {useSelector} from "react-redux";
import {selectUser} from "../context/userSlice";


const Feed = ({allGroupsUrl, postsByGroup}) => {

    const [posts, setPosts] = useState([]);
    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState(null);
    const user = useSelector(selectUser);

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

    useEffect(() => {
        async function getPosts() {
            let res = await axios.get(postsByGroup + "1");
            let data = res.data;
            setPosts(data);
        }
        getPosts();
    },[postsByGroup + "1"]);


    const getPostsByGroup = async (g) => {
        setGroup(g);
        let res = await axios.get(postsByGroup + g.id);
        let data = res.data;
        setPosts(data);
    }
    const sorted = posts.sort((a, b) => {
        return -1 *(a.id - b.id);
    })



    return (
        <div className="feed">
            <div className="feed_group">
                <h3>My Groupes</h3>
                {
                    groups.length !== 0 ?
                        groups.map((g, i) => (
                            <p key={i}
                               onClick={()=>getPostsByGroup(g)}
                               className="feed_group-item"
                            >
                                ⚫ {g.username}
                            </p>
                        ))
                        : <p>Any groupe</p>
                }
            </div>
            <div className="feed_body">
                <h3>{group ? group.username : "General"}</h3>
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
                    : <h3 className="feed_loading">Loading...</h3>
                }
            </div>
        </div>
    );
};

export default Feed;
