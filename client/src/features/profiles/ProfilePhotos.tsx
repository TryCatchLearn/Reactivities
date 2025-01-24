import { useParams } from "react-router"
import { useProfile } from "../../lib/hooks/useProfile";
import { Box, Button, Divider, ImageList, ImageListItem, Typography } from "@mui/material";
import { useState } from "react";
import PhotoUploadWidget from "../../app/shared/components/PhotoUploadWidget";
import StarButton from "../../app/shared/components/StarButton";
import DeleteButton from "../../app/shared/components/DeleteButton";

export default function ProfilePhotos() {
    const { id } = useParams();
    const { photos, loadingPhotos, isCurrentUser, uploadPhoto,
        profile, setMainPhoto, deletePhoto } = useProfile(id);
    const [editMode, setEditMode] = useState(false);

    const handlePhotoUpload = (file: Blob) => {
        uploadPhoto.mutate(file, {
            onSuccess: () => {
                setEditMode(false);
            }
        })
    }

    if (loadingPhotos) return <Typography>Loading photos...</Typography>

    if (!photos) return <Typography>No photos found for this user</Typography>

    return (
        <Box>

            <Box display='flex' justifyContent='space-between'>
                <Typography variant="h5">Photos</Typography>
                {isCurrentUser && (
                    <Button onClick={() => setEditMode(!editMode)}>
                        {editMode ? 'Cancel' : 'Add photo'}
                    </Button>)}
            </Box>
            <Divider sx={{ my: 2 }} />

            {editMode ? (
                <PhotoUploadWidget
                    uploadPhoto={handlePhotoUpload}
                    loading={uploadPhoto.isPending}
                />
            ) : (
                <>
                    {photos.length === 0 ? (
                        <Typography>No photos added yet</Typography>
                    ) : (
                        <ImageList sx={{ height: 450 }} cols={6} rowHeight={164}>
                            {photos.map((item) => (
                                <ImageListItem key={item.id}>
                                    <img
                                        srcSet={`${item.url.replace(
                                            '/upload/',
                                            '/upload/w_164,h_164,c_fill,f_auto,dpr_2,g_face/'
                                        )}`}
                                        src={`${item.url.replace(
                                            '/upload/',
                                            '/upload/w_164,h_164,c_fill,f_auto,g_face/'
                                        )}`}
                                        alt={'user profile image'}
                                        loading="lazy"
                                    />
                                    {isCurrentUser && (
                                        <div>
                                            <Box
                                                sx={{ position: 'absolute', top: 0, left: 0 }}
                                                onClick={() => setMainPhoto.mutate(item)}
                                            >
                                                <StarButton selected={item.url === profile?.imageUrl} />
                                            </Box>
                                            {profile?.imageUrl !== item.url && (
                                                <Box
                                                    sx={{ position: 'absolute', top: 0, right: 0 }}
                                                    onClick={() => deletePhoto.mutate(item.id)}
                                                >
                                                    <DeleteButton />
                                                </Box>
                                            )}
                                        </div>

                                    )}
                                </ImageListItem>
                            ))}
                        </ImageList>
                    )}
                </>

            )}
        </Box>


    )
}