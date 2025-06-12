import {Grid2, Typography } from "@mui/material"
import { useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import GetbacktoActivity from "./GetbacktoActivity";
export default function ActivityDetailPage() {
      

    
    const {id} = useParams();
    const {activity, isLoadingActivity}= useActivities(id);

    if (isLoadingActivity) return <Typography>Loading... </Typography>

    if (!activity) return <Typography>Activity is not found </Typography>

    return (
        <Grid2 container spacing={3}>
         <Grid2 size={8}>
            <ActivityDetailsHeader activity={activity}/>
            <ActivityDetailsInfo activity={activity}/>
            <ActivityDetailsChat/>
            <GetbacktoActivity/>

            </Grid2 >
            <Grid2 size={4}>
                <ActivityDetailsSidebar activity={activity}/>
                
            </Grid2>

            </Grid2>
    )
}