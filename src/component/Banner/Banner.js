import { Link } from 'react-router-dom';
import bgImg from '../../assets/banner.jpg'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';


const Banner = () => {
    const {user} = useContext(AuthContext);
    const navbarHeight = 68;
    const bannerStyle = {
        width: '100%',
        height: `calc(100vh - ${navbarHeight}px)`,
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',  // Adjust as needed
        backgroundPosition: 'center',  // Adjust as needed
      };

    return (
        <div className='flex justify-center items-center relative' 
        style={bannerStyle}
        >
            <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10'></div>
            <div className='text-center z-50'>
                <p className='text-2xl text-white mb-4'><span className='text-3xl text-orange-500 text-bold'>Welcome to ATG Social</span> <br /> – we are thrilled to have you join our community!   </p>
                <button className="btn btn-outline btn-white text-white relative z-50">
                    {
                        user?.email ? 
                        <Link to="/posts">Get Started</Link> :
                        <Link to="/login">Get Started</Link>
                    }
                </button>
            </div>
        </div>
    );
};

export default Banner;