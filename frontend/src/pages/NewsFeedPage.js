import React, { useEffect, useState } from 'react'
import { Button, Label, Input } from 'reactstrap';
import { getAllPosts, addPost, deletePost } from '../Utilities';

/**
 * displays posts, allows admins to add and delete posts
 * written by Jash Choksi
 */
export default function NewsFeedPage() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [userID, setUserID] = useState();
    const [posts, setPosts] = useState([]);
    const [postContent, setPostContent] = useState();

    /**
     * function gets user information from local storage
     * the user id and whether or not they are an admin are set to their respective state variables
     * written by Jash Choksi
     */
    async function getUserInfo() {
        const item = localStorage.getItem("userInfo");
        const userInfo = JSON.parse(item);
        setIsAdmin(userInfo.isAdmin);
        setUserID(userInfo.userID);
    }
    
    /**
     * gets all the posts in the database and sets them to the "posts" state variable
     * written by Jash Choksi
     */
    async function getPosts() {
        let results = await getAllPosts();
        setPosts(results.posts);
    }

    /**
     * function adds a post using the userID and postContent
     * @param {*} userID the id of the user that is adding the post
     * @param {*} postContent the text input retrieved from the input box
     */
    async function add(userID, postContent) {
        let result = await addPost(userID, postContent);
        window.location.reload();
    }

   /**
    * function deletes a post using the postID 
    * @param {*} postID the id of the post to be deleted
    * written by Jash Choksi
    */
    async function remove(postID) {
        let result = await deletePost(postID);
        window.location.reload();
    }

    /**
     * gets all the posts and user info on render
     */
    useEffect(() => {
        getPosts();
        getUserInfo();
    }, [])

    /**
     * displays components and allows access to news feed based on whether or not user is admin
     * written by Jash Choksi
     */
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
