import React, { useEffect, useState } from 'react'
import { Button, Label, Input } from 'reactstrap';
import { getAllPosts, addPost, deletePost } from '../Utilities';

export default function NewsFeedPage() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [userID, setUserID] = useState();
    const [posts, setPosts] = useState([]);
    const [postContent, setPostContent] = useState();

    async function getUserInfo() {
        const item = localStorage.getItem("userInfo");
        const userInfo = JSON.parse(item);
        setIsAdmin(userInfo.isAdmin);
        setUserID(userInfo.userID);
    }
    
    async function getPosts() {
        let results = await getAllPosts();
        setPosts(results.posts);
    }

    async function add(userID, postContent) {
        let result = await addPost(userID, postContent);
        window.location.reload();
    }

    async function remove(postID) {
        let result = await deletePost(postID);
        window.location.reload();
    }

    useEffect(() => {
        getPosts();
        getUserInfo();
    }, [])

    if (isAdmin) {
        return (
            <div>
                <h1>News Feed</h1>
                <Label for='post'>
                    Post:
                </Label>
                <Input type='text'
                  id='post'
                  style={{width: '50%', margin: 'auto'}}
                  placeholder="Add a post"
                  onChange={(e) => setPostContent(e.target.value)}
                  value={postContent}>
                </Input>
                <Button onClick={() => {
                    add(userID, postContent)
                }}>Add post</Button>
                {posts.length !== 0 &&
                    <div>
                        {posts.map((post, i) => {
                            return (
                                <div key={i}>
                                    <br></br>
                                    <p>{post[3]} - <b>{post[2]}</b></p>
                                    <Button onClick={() => {
                                        remove(post[0])
                                    }}>Delete post</Button>  
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        )
    } else {
        return (
            <div>
                <h1>You do not have admin privileges!</h1>
            </div>
        )
    }
}
