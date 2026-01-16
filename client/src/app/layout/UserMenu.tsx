import { useAccount } from "../../lib/hooks/useAccount.ts";
import { useState } from "react";
import { Avatar, Box, Button, Divider, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import Add from "@mui/icons-material/Add";
import Person from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";
import { Link } from "react-router";
import { Password } from "@mui/icons-material";

export default function UserMenu() {
    const { currentUser, logoutUser } = useAccount();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                onClick={handleClick}
                color='inherit'
                size="large"
                sx={{ fontSize: '1.1rem' }}
            >
                <Box display='flex' alignItems='center' gap={2} >
                    <Avatar 
                        src={currentUser?.imageUrl}
                        alt="current user image"
                    />
                    {currentUser?.displayName}
                </Box>

            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    list: {
                        'aria-labelledby': 'basic-button'
                    }
                }}
            >
                <MenuItem component={Link} to='/createActivity' onClick={handleClose}>
                    <ListItemIcon>
                        <Add />
                    </ListItemIcon>
                    <ListItemText>Create activity</ListItemText>
                </MenuItem>
                <MenuItem component={Link} to={`/profiles/${currentUser?.id}`} onClick={handleClose}>
                    <ListItemIcon>
                        <Person />
                    </ListItemIcon>
                    <ListItemText>My profile</ListItemText>
                </MenuItem>
                <MenuItem component={Link} to={'/change-password'} onClick={handleClose}>
                    <ListItemIcon>
                        <Password />
                    </ListItemIcon>
                    <ListItemText>Change password</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => {
                    logoutUser.mutate();
                    handleClose();
                }}>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
}