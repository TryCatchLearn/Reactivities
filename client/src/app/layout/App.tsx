import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import HomePage from "../../features/activities/home/HomePage";

function App() {

  const locatoin = useLocation();

  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <ScrollRestoration/>
      <CssBaseline />
      {locatoin.pathname === '/' ? <HomePage /> : (
        <>

          <NavBar />
          <Container maxWidth='xl' sx={{ pt: 14 }}>
            <Outlet />

          </Container>

        </>
      )}

    </Box>
  )
}

export default App
