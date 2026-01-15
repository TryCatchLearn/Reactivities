import Group from "@mui/icons-material/Group";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <Paper className="home"
      sx={{
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: 'linear-gradient(135deg, rgb(24, 42, 115) 0%,rgb(33, 138, 174) 69%,rgb(32, 167, 172) 89%)'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', alignContent: 'center', color: 'white', gap: 3 }}>
        <Group sx={{ height: 110, width: 110 }} />
        <Typography variant="h1" fontWeight='bold'>
          Reactivities
        </Typography>
      </Box>
      <Typography variant="h2">
        Welcome to reactivities
      </Typography>
      <Button 
        component={Link} to='/activities' size='large' variant="contained" 
        sx={{height: 80, borderRadius: 4, fontSize: '1.5rem'}}>
        Take me to the activities!
      </Button>
    </Paper>
  )
}