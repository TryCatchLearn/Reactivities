import { Group } from "@mui/icons-material";
import { Box, AppBar, Toolbar, Typography, Container, MenuItem, CircularProgress } from "@mui/material";
import { NavLink } from "react-router";
import MenuItermLink from "./components/MenuItermLink";
import { useStore } from "../../lib/hooks/useStore";
import { Observer } from "mobx-react-lite";
import { UseAccount } from "../../lib/hooks/useAccount";
import UserMenu from "./UserMenu";

export default function NavBar() {
    const { uiStore } = useStore();
    const { currentuser } = UseAccount();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{
                backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)'
                // , position: 'relative'
            }}>
                <Container maxWidth='xl'>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                            <MenuItem component={NavLink} to='/' sx={{ display: 'flex', gap: 2 }}>
                                <Group fontSize="large" />
                                <Typography sx={{ position: 'relative' }} variant="h4" fontWeight='bold'>
                                    Reactivities
                                </Typography>
                                <Observer>
                                    {() => uiStore.isLoading ? (
                                        <CircularProgress
                                            size={20}
                                            thickness={8}
                                            sx={{
                                                color: 'white',
                                                position: 'absolute',
                                                top: '30%',
                                                left: '105%'

                                            }}

                                        />
                                    ) : null}
                                </Observer>
                            </MenuItem>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <MenuItermLink to='/activities'>
                                Activities
                            </MenuItermLink>
                            <MenuItermLink to='/counter'>
                                Counter
                            </MenuItermLink>
                            <MenuItermLink to='/errors'>
                                Errors
                            </MenuItermLink>
                        </Box>
                        <Box display='flex' alignItems='center'>
                            {currentuser ?
                                (
                                    <UserMenu />
                                ) : (
                                    <>
                                        <MenuItermLink to='/login'> Login</MenuItermLink>
                                        <MenuItermLink to='/register'> Register</MenuItermLink>
                                    </>
                                )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}