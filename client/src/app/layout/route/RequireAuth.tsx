import { Navigate, Outlet, useLocation } from "react-router";
import { UseAccount } from "../../../lib/hooks/useAccount"
import { Typography } from "@mui/material";

export default function RequireAuth() {
    const { currentuser, loadingUserInfo } = UseAccount();
    const location = useLocation();

    if (loadingUserInfo)
        return <Typography> Loading...</Typography>
    if (!currentuser) return <Navigate to='/login' state={{from: location }} />

    return (
        <Outlet />
    )
}