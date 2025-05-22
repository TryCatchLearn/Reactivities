import { FilterList, Event } from "@mui/icons-material";
import { Box, ListItemText, MenuItem, Paper, Typography } from "@mui/material";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export default function ActivityFilters() {
  return (
    <Box sx={{display: 'flex', flexDirection:'column', gap: 3, borderRadius: 3}}>
    <Paper sx={{p: 3, borderRadius:3}}>
        <Box sx={{width: '100%'}}>
            <Typography variant="h6" sx={{display: 'flex', alignItems: 'center', mb: 1, color: 'primary.main'}}>
                <FilterList sx={{mr: 1}}/>
                Filters
            </Typography>

            <MenuItem>
            <ListItemText primary='All Events'/>
            </MenuItem>

            <MenuItem>
            <ListItemText primary="I'm Going"/>
            </MenuItem>

            <MenuItem>
            <ListItemText primary="I'm Hosting"/>
            </MenuItem>


        </Box>

    </Paper>
    <Box component={Paper} sx={{width: '100%', p: 3, borderRadius:3}}>
        <Typography variant="h6" sx={{display: 'flex', alignItems: 'center', mb: 1,color: 'primary.main'}}>
            <Event sx={{mr: 1}}/>
            Select Date
        </Typography>
        <Calendar/>
    </Box>
    </Box>
  )
}