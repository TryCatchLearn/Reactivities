import { Box, Typography, Card, CardContent, TextField, Avatar, CircularProgress } from "@mui/material";
import { Link, useParams } from "react-router";
import { useComments } from "../../../lib/hooks/useComments";
import { timeAgo } from "../../../lib/util/util";
import { FieldValues, useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";

const ActivityDetailsChat = observer(function ActivityDetailsChat() {
    const { id } = useParams();
    const { commentStore } = useComments(id);
    const {register, handleSubmit, reset, formState: {isSubmitting}} = useForm();

    const addComment = async (data: FieldValues) => {
        try {
            await commentStore.hubConnection?.invoke('SendComment', {
                activityId: id,
                body: data.body
            });
            reset();
        } catch (error) {
            console.log(error);
        }
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(addComment)();
        }
    }

    return (
        <>
            <Box
                sx={{
                    textAlign: 'center',
                    bgcolor: 'primary.main',
                    color: 'white',
                    padding: 2
                }}
            >
                <Typography variant="h6">Chat about this event</Typography>
            </Box>
            <Card>
                <CardContent>
                    <div>
                        <form>
                            <TextField
                                {...register('body', {required: true})}
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={2}
                                placeholder="Enter your comment (Enter to submit, SHIFT + Enter for new line)"
                                onKeyDown={handleKeyPress}
                                slotProps={{
                                    input: {
                                        endAdornment: isSubmitting ? (
                                            <CircularProgress size={24} />
                                        ) : null
                                    }
                                }}
                            />
                        </form>
                    </div>

                    <Box sx={{ height: 400, overflow: 'auto' }}>
                        {commentStore.comments.map(comment => (
                            <Box key={comment.id} sx={{ display: 'flex', my: 2 }}>
                                <Avatar src={comment.imageUrl} alt={'user image'} sx={{ mr: 2 }} />
                                <Box display='flex' flexDirection='column'>
                                    <Box display='flex' alignItems='center' gap={3}>
                                        <Typography component={Link} to={`/profiles/${comment.userId}`} 
                                            variant="subtitle1" sx={{ fontWeight: 'bold', textDecoration: 'none' }}>
                                            {comment.displayName}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {timeAgo(comment.createdAt)}
                                        </Typography>
                                    </Box>

                                    <Typography sx={{ whiteSpace: 'pre-wrap' }}>{comment.body}</Typography>
                                </Box>
                            </Box>
                        ))}

                    </Box>
                </CardContent>
            </Card>
        </>
    )
});

export default ActivityDetailsChat;