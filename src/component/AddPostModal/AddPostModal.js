import React, { useContext, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthProvider';

const AddPostModal = ({refetch}) => {
    const {user} = useContext(AuthContext)
    const [modalOpen, setModalOpen] = useState(false);
    const [desc, setDesc] = useState('');
    const [photo, setPhoto] = useState(null);


    const handlePhotoChange = (e) => {
        const selectedFile = e.target.files[0];
    
        
        if (selectedFile) {
          const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
          if (allowedFileTypes.includes(selectedFile.type)) {
            setPhoto(selectedFile);
          } else {
            alert("Please select a valid image file (JPEG, PNG, or GIF).");

            e.target.value = "";
          }
        }
      };
    const handleAddPost = async(e) => {
        e.preventDefault();
        
        if (photo) {
      const imageHostKey = "7e0021a086b0aaae3d1df03d04fc3faf";
      const formData = new FormData();
      formData.append("image", photo);
  
      // Upload the image
      fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imgData) => {
          if (imgData.success === true) {
            const post = {
              desc,
              img: imgData.data.url,
              userEmail: user?.email,
              userId: user?.id,
              userName: user?.username
            };
            axios.post("http://localhost:5000/posts/posts", post)
              .then((res) => {
                if (res.status === 200) {
                  setDesc('');
                  setPhoto(null);
                  refetch();
                  toast.success(res.data.message)
                  setModalOpen(false);

                }
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    } 
    else {
      const post = {
        desc,
        userEmail: user?.email,
        userId: user?.id,
        userName: user?.username
      };
      axios.post("http://localhost:5000/posts/posts", post)
        .then((res) => {
          if (res.status === 200) {
              setDesc('');
              refetch();
              toast.success(res.data.message)
              setModalOpen(false);
          }
        })
        .catch((err) => console.log(err));
    }
    }
    return (
    <>
        <input type="checkbox" className="modal-toggle"  id='post-modal' checked={modalOpen}
        onChange={() => setModalOpen(!modalOpen)}/>
        <div  className="modal">
            <div className="modal-box relative">
                <label htmlFor="post-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 className="text-lg font-bold mb-8">Add a Post</h3>
                <form onSubmit={handleAddPost} className="grid grid-cols-1 gap-y-3" action="">
                    
                <textarea
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Write your post..."
                            className="border p-2 rounded-md w-[250px] md:w-[400px] h-[200px] resize-none"
                            required
                        ></textarea>
                        <input onChange={handlePhotoChange} type="file" className="file-input file-input-bordered w-full max-w-xs" />
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