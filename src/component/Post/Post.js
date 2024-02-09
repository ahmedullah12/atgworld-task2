import React, { useContext, useState } from 'react';
import { FaEdit, FaEllipsisV, FaHeart, FaTrash, FaUserSecret } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa6";
import { AuthContext } from '../../context/AuthProvider';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import EditPostModal from '../EditPostModal/EditPostModal';

const Post = ({ post, refetch }) => {
    const {user} = useContext(AuthContext);
    const {_id,  desc, img, userEmail, userName,  } = post;
    const [isLiked, setIsLiked] = useState(false);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const isCurrentUser = user?.email === userEmail;

    const handleLikeToggle = () => {
        setIsLiked(!isLiked);
    };

    const handleCommentToggle = () => {
        setShowCommentInput(!showCommentInput);
    };

    const handleDeletePost = (id) => {
        console.log(id);
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
                            <li><label htmlFor='confirmation-modal' className="text-black"><FaTrash/> Delete</label></li>
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
                        <FaCommentDots size={20}/> Comments
                    </div>                    
                </div>
                {showCommentInput && (
                    <div className="mt-4">
                        <input type="text" placeholder="Write a comment..." className="border p-2 rounded-md w-full" />
                        <button className="btn btn-accent mt-2 text-white">Comment</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Post;
