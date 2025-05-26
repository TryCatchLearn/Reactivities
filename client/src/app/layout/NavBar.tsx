import { Group } from "@mui/icons-material";
import { Box, AppBar, Toolbar, Typography, Container, MenuItem, LinearProgress } from "@mui/material";
import { NavLink } from "react-router";
import MenuItermLink from "./components/MenuItermLink";
import { useStore } from "../../lib/hooks/useStore";
import { Observer } from "mobx-react-lite";

export default function NavBar() {
    const { uiStore } = useStore();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{
                backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)'
                , position: 'relative'
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
                            <MenuItermLink to='/counter'>
                                Counter
                            </MenuItermLink>
                            <MenuItermLink to='/errors'>
                                Errors
                            </MenuItermLink>
                        </Box>
                        <MenuItem>
                            User Menu
                        </MenuItem>
                    </Toolbar>
                </Container>
                <Observer>
                    {() => uiStore.isLoading ? (
                        <LinearProgress
                            color="secondary"
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: 4

                            }}

                        />
                    ) : null}
                </Observer>
            </AppBar>
        </Box>
    )
}