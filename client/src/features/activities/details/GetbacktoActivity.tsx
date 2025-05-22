import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router";

export default function GetbacktoActivity() {
    const navigate = useNavigate();
    return (

        <Box sx={{ fontVariant: 'large', display: 'flex', gap: 2, margin: 2, marginLeft: 0}}>

            <Button sx={{
                textAlign: 'center',
                bgcolor: 'primary.main',
                color: 'white',
                padding: 1.5
            }}
                color="primary"
                variant='contained'


                onClick={() => navigate('/activities/')}
            >
                Get Back To ActivityDashboard
            </Button>
        </Box>


    )
}