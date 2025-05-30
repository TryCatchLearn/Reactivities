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

export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: [

                { path: '', element: <HomePage></HomePage> },
                { path: 'activities', element: <ActivityDashboard /> },
                { path: 'activities/:id', element: <ActivityDetailPage /> },
                { path: 'createActivity', element: <ActivityForm key='create' /> },
                { path: 'counter', element: <Counter /> },
                { path: 'errors', element: <TestErrors /> },
                { path: 'not-found', element: <NotFound /> },
                { path: 'server-error', element: <ServerError /> },
                { path: '*', element: <Navigate replace to='/not-found' /> },
                {path: 'manage/:id' , element: <ActivityForm/>}


            ]
        }
    ])
