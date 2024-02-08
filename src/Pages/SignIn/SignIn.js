import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
    const { register, handleSubmit, formState: {errors}, reset } = useForm();
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleLogin = (data) => {
        const user = {
            email: data.email,
            password: data.password,
        }


        axios.post('http://localhost:5000/auth/login', user)
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
        <h3 className="text-3xl text-center">Login</h3>
        <form className='' onSubmit={handleSubmit(handleLogin)}>
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
                    minLength: {value: 6, message: "Password must be 6 character or long"} 
                })}
                type="password" placeholder="Enter your Password" className="input input-bordered w-full max-w-xs" />
                {errors.password && <p className="text-red-600" role="alert">{errors.password.message}</p>}
            </div>

            <input className='btn btn-accent w-full my-4 text-white' value="Login" type="submit" />
        </form>
        <p className='underline text-blue-500 mb-3'><Link to="/forgot-password">Forgot Password?</Link></p>
        <p>New to ATG-Social? Please <Link to='/register' className="text-secondary">Sign Up.</Link></p>
      </div>
    </div>
    );
};

export default SignIn;