import React, { useEffect, useState } from 'react'
import { getPosts } from '../Utilities';

export default function NewsFeedPage() {

    const [posts, setPosts] = useState([]);
    async function getInfo() {
        let results = getPosts();
        setPosts(results);
    }

    useEffect(() => {
        getInfo()
    }, [])
    return (
        <div>
            NewsFeedPage
            {posts.length !== 0 && 
                <div>
                    {/* {posts.map((post, i) => {
                        return (
                        <div key={i}>
                            <h1>{post.title}</h1>
                            <p>{post.body}</p>    
                        </div>
                        )
                    })} */}
                </div>
            }
        </div>
    )
}
