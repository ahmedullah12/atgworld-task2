import React from 'react';

const Post = ({ post }) => {
    const { desc, img, userEmail, userName } = post;

    return (
        <div className="max-w-sm bg-white shadow-lg rounded-md overflow-hidden mx-auto my-4">
            {img && (
                <img
                    className="w-full h-48 object-cover object-center"
                    src={img}
                    alt=""
                />
            )}
            <div className="p-4">
                <p className="text-gray-700 font-semibold mb-2">{userName}</p>
                <p className="text-gray-800">{desc}</p>
                <div className="flex justify-between mt-4">
                    <div className="flex items-center space-x-2">
                        {/* Like icon (you can replace this with your own like icon) */}
                        <svg
                            className="h-5 w-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 8h16M4 16h16"
                            />
                        </svg>
                        {/* Like count */}
                        <span className="text-gray-600">123 Likes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        
                        <span className="text-gray-600">45 Comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
