import ForgotPassword from "../Pages/ForgotPassword.js/ForgotPassword";
import MyPosts from "../Pages/Posts/MyPosts";
import Posts from "../Pages/Posts/Posts";
import ResetPassword from "../Pages/ResetPassword/ResetPassword";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");
const { default: MainLayout } = require("../layout/MainLayout");
const { default: Home } = require("../Pages/Home/Home");

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <SignIn></SignIn>
            },
            {
                path: "/register",
                element: <SignUp></SignUp>
            },
            {
                path: '/forgot-password',
                element: <ForgotPassword></ForgotPassword>
            },
            {
                path: '/reset-password/:token',
                element: <ResetPassword></ResetPassword>
            },
            {
                path: "/posts",
                element: <PrivateRoute><Posts></Posts></PrivateRoute>
            },
            {
                path: "/my-posts",
                element: <PrivateRoute><MyPosts></MyPosts></PrivateRoute>
            },
        ]
    }
]);

export default router;