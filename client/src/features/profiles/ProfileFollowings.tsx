import { useParams } from "react-router"
import { useProfile } from "../../lib/hooks/useProfile";
import { Box, Divider, Typography } from "@mui/material";
import ProfileCard from "./ProfileCard";

type Props = {
    activeTab: number
}
export default function ProfileFollowings({ activeTab }: Props) {
    const { id } = useParams();
    const predicate = activeTab === 3 ? 'followers' : 'following';
    const { profile, following, loadingFollowings } = useProfile(id, predicate);

    return (
        <Box>
            <Box display='flex'>
                <Typography variant="h5">
                    {activeTab === 3 ? `People Following ${profile?.displayName}` : `People ${profile?.displayName} is Following`}

                </Typography>

            </Box>
            <Divider sx={{ my: 2 }} />
            {loadingFollowings ? <Typography>Loading...</Typography> : (
                <Box display='flex' marginTop={3} gap={3}>
                    {following?.map(profile => (
                        <ProfileCard key={profile.id} profile={profile} />
                    ))}
                </Box>
            )}
        </Box>
    )
}
