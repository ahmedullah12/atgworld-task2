import React, { useContext, useState } from 'react';
import { FaHeart, FaUserSecret } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa6";
import { AuthContext } from '../../context/AuthProvider';

const Post = ({ post }) => {
    const {user} = useContext(AuthContext);
    const { desc, img, userEmail, userName } = post;
    const [isLiked, setIsLiked] = useState(false);
    const [showCommentInput, setShowCommentInput] = useState(false);

    const handleLikeToggle = () => {
        setIsLiked(!isLiked);
    };

    const handleCommentToggle = () => {
        setShowCommentInput(!showCommentInput);
    };
    return (
        <div className="max-w-md bg-white shadow-lg rounded-md overflow-hidden mx-auto my-4 px-5 py-4">
            
            <div className="p-4">
                <p className="text-gray-700 font-semibold mb-2 flex items-center gap-2"><FaUserSecret/> {userName}</p>
                <p className="text-gray-800">{desc}</p>
            </div>
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
                        {/* Comment input field and button go here */}
                        <input type="text" placeholder="Write a comment..." className="border p-2 rounded-md w-full" />
                        <button className="btn btn-accent mt-2 text-white">Comment</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Post;
