import axios from 'axios';
import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import Post from '../../component/Post/Post';
import AddPostModal from '../../component/AddPostModal/AddPostModal.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider.js';

const MyPosts = () => {
    const {user} = useContext(AuthContext);
    
    const {data: myPosts, isLoading, refetch} = useQuery({
        queryKey: ["posts"],
        queryFn: async() => {
            const res = await axios.get(`http://localhost:5000/posts/my-posts?email=${user?.email}`);
            const data = await res.data.myPosts;
            return data;
        }
    })

    if(isLoading){
        return <p>Loading...</p>
    }
    return (
        <div className='w-full md:w-[80%] lg:w-[70%] mx-auto'>
            <h3 className='my-4 text-2xl font-bold text-center'>My Posts</h3>
            <div className='w-[75%] flex justify-end '>
                <button className='btn btn-secondary mr-3'><Link to="/posts">All Posts</Link></button>
                <label htmlFor='post-modal' className='btn btn-accent text-white'>Add a Post</label>
            </div>
            <div>
                {
                    myPosts.map((post) => <Post key={post._id} post={post} refetch={refetch}></Post>)
                }
            </div>
            <AddPostModal refetch={refetch}></AddPostModal>
        </div>
    );
};

export default MyPosts;