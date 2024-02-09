import React, { useContext, useState } from 'react';
import { FaEdit, FaEllipsisV, FaHeart, FaTrash, FaUserSecret } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa6";
import { AuthContext } from '../../context/AuthProvider';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import EditPostModal from '../EditPostModal/EditPostModal';
import axios from 'axios';
import toast from 'react-hot-toast';
import Comment from '../Comment/Comment';

const Post = ({ post, refetch }) => {
    const {user} = useContext(AuthContext);
    console.log(user);
    const {_id,  desc, img, userEmail, userName,  comments} = post;
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [comment, setComment] = useState('');

    const isCurrentUser = user?.email === userEmail;

    const handleLikeToggle = () => {
        setIsLiked(!isLiked);
    };

    const handleCommentToggle = () => {
        setShowCommentInput(!showCommentInput);
        setShowComments(!showComments);
    };

    const handleDeletePost = (postId) => {
        console.log(postId);
        axios.delete(`http://localhost:5000/posts/posts/${postId}`)
        .then(res => {
            console.log(res);
            if(res.status === 200){
                toast.success(res.data.message);
                refetch();
            }
        })
        .catch(err => console.log(err))
    };

    const handleAddComment = () => {
        const commentData = {
            userId: user.id, 
            userEmail: user.email, 
            userName: user.username,  
            comment: comment,
        };
        axios.post(`http://localhost:5000/posts/posts/comments/${_id}`, commentData)
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                toast.success(res.data.message);
                refetch();
                setComment('');
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }


    return (
        <div className="max-w-lg bg-white shadow-lg rounded-md overflow-hidden mx-auto my-4 px-5 py-4">
            
            <div className="p-4 relative">
                <p className="text-gray-700 font-semibold mb-2 flex items-center gap-2"><FaUserSecret/> {userName}</p>
                {isCurrentUser && (
                    <div className="dropdown dropdown-bottom dropdown-end absolute top-[10%] right-0">
                        <div tabIndex={0} role="button" className=" m-1"><FaEllipsisV/></div>
                        <ul tabIndex={0} className="dropdown-content z-50 menu p-2 shadow bg-white rounded-box w-52">
                            <li><label htmlFor= {`editPost-modal-${_id}`} className='text-black'> <FaEdit/> Edit Post</label></li>
                            <li><label htmlFor={`confirmation-modal-${_id}`} className="text-black"><FaTrash/> Delete</label></li>
                        </ul>
                    </div>
                )}
                <p className="text-gray-800">{desc}</p>
            </div>
            <ConfirmationModal 
                title={"Are you sure you want to delete your post?"}
                action={handleDeletePost}
                actionDataId={_id}
                setIsConfirmModalOpen={setIsConfirmModalOpen}
                isConfirmModalOpen={isConfirmModalOpen}
            ></ConfirmationModal>
            <EditPostModal postId={_id} refetch={refetch} previousDesc={desc}></EditPostModal>
            {img && (
                <img
                    className="w-full h-48 object-cover object-center"
                    src={img}
                    alt=""
                />
            )}
            <div>
                <div className="flex justify-between mt-4">
                    <div className='ml-5 flex items-center gap-3 cursor-pointer' onClick={handleLikeToggle}>
                        {isLiked ? <FaHeart size={20} color="red" /> : <FaRegHeart size={20} />}
                        Like
                    </div>
                    <div className='mr-8 flex items-center gap-3 cursor-pointer' onClick={handleCommentToggle}>
                        <FaCommentDots size={20}/> Comments ({comments.length})
                    </div>                    
                </div>
                {showCommentInput && (
                    <div className="mt-4">
                        <input onChange={(e) => setComment(e.target.value)} type="text" placeholder="Write a comment..." className="border p-2 rounded-md w-full" />
                        <button onClick={handleAddComment} className="btn btn-accent mt-2 text-white">Comment</button>
                    </div>
                )}
                {showComments && comments.length > 0 && (
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold mb-2">Comments:</h2>
                        {comments.map((comment) => (
                        <Comment key={comment._id} comment={comment} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Post;
