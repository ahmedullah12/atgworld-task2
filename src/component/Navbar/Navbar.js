import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { FaUserNinja } from "react-icons/fa";
import axios from 'axios';


const Navbar = () => {
    const {user, setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.get('https://atg-task2-server-production.up.railway.app/auth/logout')
        .then(res => {
            if(res.data.status){
                setUser(null);
                navigate('/login')
            }
        })
        .catch(err => {
            console.log(err);
        }) 
    };

    return (
        <div className="navbar bg-orange-400">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    {
                        <>
                            <li ><Link to="/login">Sign In</Link></li>
                            <li><Link to="/register">Sign Up</Link></li>
                        </> 
                    }
                </ul>
                </div>
                <a href='/' className="btn btn-ghost text-xl ms-1 lg:ms-14 text-white font-bold">ATG-Social</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">

                {
                    user?.email ? 
                    <>
                        <li><button className='text-base text-white text-bold'><FaUserNinja/> {user.username}</button></li>
                        <li><button onClick={handleLogout} className='text-base text-white text-bold'>Logout</button></li>
                    </> : 
                    <>
                    <li className='text-white  font-bold'><Link to="/register">Sign Up</Link></li>
                    <li className='text-white  font-bold'><Link to="/login">Sign In</Link></li>
                </> 
                }
                    
                </ul>
            </div>
        </div>
    );
};

export default Navbar;