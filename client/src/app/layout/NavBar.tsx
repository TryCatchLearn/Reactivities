import { Group } from "@mui/icons-material";
import { Box, AppBar, Toolbar, Typography, Container, MenuItem } from "@mui/material";
import { NavLink } from "react-router";
import MenuItermLink from "./components/MenuItermLink";

export default function NavBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{
                backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)'
            }}>
                <Container maxWidth='xl'>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                            <MenuItem component={NavLink} to='/' sx={{ display: 'flex', gap: 2 }}>
                                <Group fontSize="large" />
                                <Typography variant="h4" fontWeight='bold'>Reactivities</Typography>
                            </MenuItem>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <MenuItermLink to='/activities'>
                            Activities 
                            </MenuItermLink>
                            <MenuItermLink to='/createActivity'>
                            Create Activity
                            </MenuItermLink>
                        </Box>
                        <MenuItem> 
                        User Menu
                        </MenuItem>
                    </Toolbar>
                </Container>

            </AppBar>
        </Box>
    )
}