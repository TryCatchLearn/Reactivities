import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityFilters from "./ActivityFilters";

export default function ActivityDashboard() {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={8}>
                <ActivityList />
            </Grid2>
            <Grid2 size={4}>
                <ActivityFilters />
            </Grid2>
        </Grid2>
    )
}