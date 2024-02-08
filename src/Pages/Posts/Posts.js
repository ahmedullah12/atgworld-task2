import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import Post from '../../component/Post/Post';

const Posts = () => {
    
    const {data: posts, isLoading} = useQuery({
        queryKey: ["posts"],
        queryFn: async() => {
            const res = await axios.get("http://localhost:5000/posts/posts");
            const data = await res.data.posts;
            return data;
        }
    })

    if(isLoading){
        return <p>Loading...</p>
    }
    return (
        <div className='w-full md:w-[80%] lg:w-[70%] mx-auto'>
            <h3 className='my-4 text-2xl font-bold text-center'>All Posts</h3>
            <div>
                {
                    posts.map((post) => <Post key={post._id} post={post}></Post>)
                }
            </div>
        </div>
    );
};

export default Posts;