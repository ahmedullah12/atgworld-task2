import React, { useContext, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthProvider';

const AddPostModal = ({product}) => {
    const {user} = useContext(AuthContext)
    const [modalOpen, setModalOpen] = useState(false);
    const [desc, setDesc] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleBook = async(e) => {
        e.preventDefault();
        
        
    }
    return (
    <>
        <input type="checkbox" className="modal-toggle"  id='post-modal' checked={modalOpen}
        onChange={() => setModalOpen(!modalOpen)}/>
        <div  className="modal">
            <div className="modal-box relative">
                <label htmlFor="post-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 className="text-lg font-bold mb-8">Add a Post</h3>
                <form onSubmit={handleBook} className="grid grid-cols-1 gap-y-3" action="">
                    
                <textarea
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Write your post..."
                            className="border p-2 rounded-md w-[250px] md:w-[400px] h-[200px] resize-none"
                            required
                        ></textarea>
                        <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                        <button className="btn btn-primary" type="submit">
                            Post
                        </button>
                </form>
                
            </div>
        </div>
    </>
    );
};

export default AddPostModal;