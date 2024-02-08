import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const navigate = useNavigate();

    const hanldeSendEmail = (data) => {
        const user = {
            email: data.email,
        }


        axios.post('http://localhost:5000/auth/forgot-password', user)
        .then(res => {
            if(res.status === 200){
                alert("check your email for reset password link")
                    navigate('/login');
            }
        })
        .catch(err => {
            if(err.response){
                toast.error(err.response.data);
            }
        });
    }
    return (
        <div className=' h-[600px] flex justify-center items-center'>
            <div className="w-96 p-8 border rounded-lg shadow-lg">
                <h3 className='text-2xl text-center'>Forgot Password</h3>
                <form className='' onSubmit={handleSubmit(hanldeSendEmail)}>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register('email', {
                            required: "Email Address is required"
                        })}
                        type="email" placeholder="Enter your Email" className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className="text-red-600" role="alert">{errors.email.message}</p>}
                    </div>


                    <input className='btn btn-accent w-full my-4 text-white' value="Send" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;