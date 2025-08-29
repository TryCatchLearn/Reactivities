import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import HomePage from "../../../features/activities/home/HomePage";
import ActivityForm from "../../../features/activities/form/ActivityForm";
import ActivityDashboard from "../../../features/activities/dashboard/ActivityDashboard";
import ActivityDetailPage from "../../../features/activities/details/ActivityDetailPage";
import Counter from "../../../features/counter/Counter";
import TestErrors from "../../../features/Error/TestErrors";
import NotFound from "../../../features/Error/NotFound";
import ServerError from "../../../features/Error/ServerError";
import LoginForm from "../../../features/account/LoginForm";
import RequireAuth from "./RequireAuth";
import RegisterForm from "../../../features/account/RegisterForm";
import ProfilePage from "../../../features/profiles/ProfilePage";
import VerifyEmail from "../../../features/account/VerifyEmail";

export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: [
                {
                    element: <RequireAuth />, children: [
                        { path: 'friendGrid', element: <ActivityDashboard /> },
                        { path: 'friendGrid/:id', element: <ActivityDetailPage /> },
                        { path: 'createActivity', element: <ActivityForm key='create' /> },
                        { path: 'manage/:id', element: <ActivityForm /> },
                        { path: 'profiles/:id', element: <ProfilePage/> }

                    ]
                },

                { path: '', element: <HomePage></HomePage> },
                { path: 'counter', element: <Counter /> },
                { path: 'errors', element: <TestErrors /> },
                { path: 'not-found', element: <NotFound /> },
                { path: 'server-error', element: <ServerError /> },
                { path: 'login', element: <LoginForm /> },
                { path: 'register', element: <RegisterForm /> },
                { path: 'confirm-email', element: <VerifyEmail /> },
                { path: '*', element: <Navigate replace to='/not-found' /> },



            ]
        }
    ])
