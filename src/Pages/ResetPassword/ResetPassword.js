import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const { register, handleSubmit, formState: {errors}, reset } = useForm();
    const {token} = useParams();
    const navigate = useNavigate();
    

    const handleResetPassword = (data) => {
        const user = {
            password: data.password,
        }


        axios.post('http://localhost:5000/auth/reset-password/'+token, user)
        .then(res => {
            if(res.status === 200){
                toast.success(res.data.message)
                navigate('/login');
            }
        })
        .catch(err => {
            if(err.response){
                toast.error(err.response.data.message);
            }
        });
    }
    return (
        <div className=' h-[600px] flex justify-center items-center'>
            <div className="w-96 p-8 border rounded-lg shadow-lg">
                <h3 className='text-2xl text-center'>Reset Password</h3>
                <form className='' onSubmit={handleSubmit(handleResetPassword)}>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input {...register('password', {
                            required: 'Password is required',
                            minLength: {value: 6, message: "Password must be 6 character or long"} 
                        })}
                        type="password" placeholder="Enter your new password" className="input input-bordered w-full max-w-xs" />

                        {errors.password && <p className="text-red-600" role="alert">{errors.password.message}</p>}
                    </div>


                    <input className='btn btn-accent w-full my-4 text-white' value="Reset" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;