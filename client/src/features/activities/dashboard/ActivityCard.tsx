import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material"

type Props = {
  activity: Activity
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
}

export default function ActivityCard({ activity, selectActivity, deleteActivity }: Props) {
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
          <Button onClick={() => deleteActivity(activity.id)} color='error' size="medium"
            variant="contained">Delete</Button>
        </Box>
      </CardActions>
    </Card>
  )
}