import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material"
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
  activity: Activity
  selectActivity: (id: string) => void;
}

export default function ActivityCard({ activity, selectActivity }: Props) {
  const {deleteActivity} = useActivities();

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1 }}>{activity.date}</Typography>
        <Typography variant="body2">{activity.description}</Typography>
        <Typography variant="subtitle1">{activity.city} / {activity.venue}</Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
        <Chip label={activity.category} variant="outlined" />
        <Box display='flex' gap={3}>
          <Button onClick={() => selectActivity(activity.id)} size="medium"
            variant="contained">View</Button>
          <Button 
            onClick={() => deleteActivity.mutate(activity.id)} 
            disabled={deleteActivity.isPending}
            color='error' 
            size="medium"
            variant="contained">Delete</Button>
        </Box>
      </CardActions>
    </Card>
  )
}