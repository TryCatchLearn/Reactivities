import { AccessTime, Place } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Divider, Typography } from "@mui/material"
import { Link } from "react-router";
import { formatDate } from "../../../lib/util/util";
import AvatarPopover from "../../../app/layout/components/AvatarPopover";
type Props = {
  activity: Activity

}

export default function ActivityCard({ activity }: Props) {
  const lable = activity.isHost ? 'You are Hosting' : 'You are Going';
  const color = activity.isHost ? 'secondary' : activity.isGoing ? 'warning' : 'default';


  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <CardHeader
          avatar={<Avatar
            src={activity.hostImageUrl}
            sx={{height: 80, width: 70}}
            alt="image of host"
          />}
          title={activity.title}
          titleTypographyProps={{
            fontWeight: 'bold',
            fontSize: 20
          }}
          subheader={
            <>
              Hosted By{' '}<Link to={`/profiles/${activity.hostId}`}> {activity.hostDisplayName}</Link>


            </>
          }


        />
        <Box display='flex' flexDirection='column' gap={2} mr={2}>
          {(activity.isHost || activity.isGoing) && <Chip label={lable} variant="outlined" color={color} sx={{ borderRadius: 2 }} />}
          {activity.isCancelled && <Chip label='Cancelled' color='error' sx={{ borderRadius: 2 }} />}
        </Box>
      </Box>


      <Divider sx={{ mb: 3 }} />

      <CardContent sx={{ p: 0 }}>
        <Box display='flex' alignItems='center' mb={2} px={2}>
          <Box display='flex' flexGrow={0} alignItems='center'>
            <AccessTime sx={{ mr: 1 }} />
            <Typography variant="body2" noWrap>
              {formatDate(activity.date)}
            </Typography>
          </Box>

          <Place sx={{ ml: 3, mr: 1 }} />
          <Typography variant="body2">{activity.venue}</Typography>

        </Box>

        <Divider />
        <Box display='flex' gap={2} sx={{ backgroundColor: 'grey.200', py: 3, pl: 3 }}>
          {activity.attendees.map(att => (
            <AvatarPopover profile={att} key={att.id} />
          ))}
        </Box>
      </CardContent>
      <CardContent>

      </CardContent>
      <CardContent sx={{ pb: 2 }}>
        <Typography variant="body2">
          {activity.description}
        </Typography>

        <Button
          component={Link}
          to={`/activities/${activity.id}`}
          size="medium"
          variant="contained"
          sx={{ display: 'flex', justifySelf: 'self-end', borderRadius: 3 }}

        >
          View
        </Button>
      </CardContent>
    </Card>
  )
}