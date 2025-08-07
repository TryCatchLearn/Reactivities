import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { Avatar, Box, Divider, ListItemIcon, ListItemText } from '@mui/material';
import { UseAccount } from '../../lib/hooks/useAccount';
import { Link } from 'react-router';
import { Add, Logout } from '@mui/icons-material';

export default function UserMenu() {
    const { currentuser, logoutuser } = UseAccount();

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
                size='large'
                sx={{ fontSize: '1.1rem' }}
            >
                <Box display='flex' alignItems='center' gap={2}>
                    <Avatar 
                    src={currentuser?.imageURL}
                    alt='current user image'
                    />
                    {currentuser?.displayName}

                </Box>

            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{

                    'aria-labelledby': 'basic-button',

                }}
            >
                <MenuItem component={Link} to='/createActivity' onClick={handleClose}>
                    <ListItemIcon>
                        <Add />

                    </ListItemIcon>
                    <ListItemIcon>Create Activity</ListItemIcon>


                </MenuItem>
                <MenuItem component={Link} to={`/profiles/${currentuser?.id}`} onClick={handleClose}>
                    <ListItemIcon>
                        <Add />

                    </ListItemIcon>
                    <ListItemText>My Profile</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => {
                    logoutuser.mutate();
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
