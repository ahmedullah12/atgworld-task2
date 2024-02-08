import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';


const SignUp = () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const navigate = useNavigate();
 
    const handleRegister = (data) => {
        const user = {
            username: data.username,
            email: data.email,
            password: data.password,
        }


        axios.post('http://localhost:5000/auth/signup', user)
        .then(res => {
            if(res.status === 200){
                toast.success(res.data.message);
                reset();
                navigate('/');
            }
        })
        .catch(err => {
            if(err.response){
                toast.error(err.response.data.message);
            }
        });
    }
    return (
        <div className="h-[600px] flex justify-center items-center">
      <div className="w-96 p-8 border rounded-lg shadow-lg">
        <h3 className="text-3xl text-center">Sign Up</h3>
        <form onSubmit={handleSubmit(handleRegister)}>
            <div className="form-control w-full ">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input {...register('username', {
                    required: "username  is required"
                })}
                type="text" placeholder="Enter your Name" className="input input-bordered w-full max-w-xs" />
                {errors.name && <p className="text-red-600" role="alert">{errors.name.message}</p>}
            </div>
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
            <div className="form-control w-full ">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input {...register('password', {
                    required: 'Password is required',
                    minLength: {value: 8, message: "Password must be 8 character or long"} ,
                })}
                type="password" placeholder="Enter your Password" className="input input-bordered w-full max-w-xs" />
                
                {errors.password && <p className="text-red-600" role="alert">{errors.password.message}</p>}
            </div>
            <input className='btn btn-accent w-full my-4 text-white' value="Sign Up" type="submit" />
        </form>
        
        <p>Already have an account? Please <Link to='/login' className="text-secondary">Login.</Link></p>

      </div>
    </div>
    );
};

export default SignUp;