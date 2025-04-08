import axios from "axios";
import React, { useEffect, useState } from "react";

const baseURL = "https://jsonplaceholder.typicode.com/posts";

export default function Post() {
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`${baseURL}/2`)
            .then((res) => {
                setPost(res.data);
            });
    }, []);

    function createPost() {
        axios
            .post(baseURL, {
                title: "Hello World!",
                body: "This is a new post."
            })
            .then((response) => {
                setPost(response.data);
            });
    }

    if (!post) return "No post!"

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <button onClick={createPost}>Create Post</button>
        </div>
    );
}