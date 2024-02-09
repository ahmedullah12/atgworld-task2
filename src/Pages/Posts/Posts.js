import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import Post from '../../component/Post/Post';
import AddPostModal from '../../component/AddPostModal/AddPostModal.js';
import { Link } from 'react-router-dom';

const Posts = () => {
    
    const {data: posts, isLoading, refetch} = useQuery({
        queryKey: ["posts"],
        queryFn: async() => {
            const res = await axios.get("https://atg-task2-server-production.up.railway.app/posts/posts");
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
            <div className='w-[75%] flex justify-end '>
                <button className='btn btn-secondary mr-3'><Link to="/my-posts">My Posts</Link></button>
                <label htmlFor='post-modal' className='btn btn-accent text-white'>Add a Post</label>
            </div>
            <div>
                {
                    posts.map((post) => <Post key={post._id} post={post} refetch={refetch}></Post>)
                }
            </div>
            <AddPostModal refetch={refetch}></AddPostModal>
        </div>
    );
};

export default Posts;