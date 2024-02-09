import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditPostModal = ({postId, refetch, previousDesc}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [desc, setDesc] = useState('');

    const handleAddPost = async(e) => {
        e.preventDefault();

        const post = {
            newDesc: desc,
          };
          console.log(post);

          axios.put(`http://localhost:5000/posts/posts/${postId}`, post)
          .then(res => {
            if(res.status === 200){
                toast.success(res.data.message);
                refetch();
                setModalOpen(false);
                setDesc('');
            }
          })
          .catch(err => {
            console.log(err);
          });

    }


    return (
    <>
        <input type="checkbox" className="modal-toggle"  id={`editPost-modal-${postId}`} checked={modalOpen}
        onChange={() => setModalOpen(!modalOpen)}/>
        <div  className="modal">
            <div className="modal-box relative">
                <label htmlFor={`editPost-modal-${postId}`} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 className="text-lg font-bold mb-8">Edit the Post</h3>
                <form onSubmit={handleAddPost} className="grid grid-cols-1 gap-y-3" action="">
                    
                    <textarea
                        onChange={(e) => setDesc(e.target.value)}
                        defaultValue={previousDesc}
                        className="border p-2 rounded-md w-[250px] md:w-[400px] h-[200px] resize-none"
                        required
                    ></textarea>
                    <button className="btn btn-primary" type="submit">
                        Post
                    </button>
                </form>
                
            </div>
        </div>
    </>
    );
};

export default EditPostModal;