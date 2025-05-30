import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm } from 'react-hook-form';
import { useEffect } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { ActivitySchema, activitySchemas } from "../../../lib/schemas/activitySchemas";
import TextInput from "../../../app/layout/components/TextInput";
import SelectInput from "../../../app/layout/components/SelectInput";
import { categoryOptions } from "./CategoryOptions";
import DateTimeInput from "../../../app/layout/components/DateTimeInput";
import LocationInput from "../../../app/layout/components/LocationInput";
export default function ActivityForm() {
    const { reset, handleSubmit, control } = useForm<ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchemas)
    });
    const navigate= useNavigate();

    const { id } = useParams();
    const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);
    useEffect(() => {
        if (activity) reset({...activity, location: {
            city: activity.city,
            venue: activity.venue,
            latitude: activity.latitude,
            longitude: activity.longitude,
        }})
    }, [activity, reset]);


    const onSubmit = (data: ActivitySchema) => {
        const {location, ...rest}= data;
        const fattenedData= {...rest, ...location};
        try {
            if(activity){
                updateActivity.mutate({...activity, ...fattenedData},{
                    onSuccess: () =>  navigate(`/activities/${activity.id}`)
                })
            }
            else
            {
             createActivity.mutate(fattenedData, {
                onSuccess:( id)=> navigate(`/activities/${id}`)
             })   
            }
        } catch (error) {
            console.log(error)
        }
    }
    if (isLoadingActivity) return <Typography> Loading...</Typography>

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {activity ? 'Edit Activity' : 'Create Activity'}
            </Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3}>
                <TextInput label='Title' control={control} name='title' />
                <TextInput label='Description' control={control} name='description' multiline rows={3} />
                <Box display='flex' gap={3}>
                    <SelectInput
                        items={categoryOptions}
                        lable='Category'
                        control={control}
                        name='category' />

                    <DateTimeInput label='Date' control={control} name='date' />
                </Box>
                <LocationInput control={control} label='Enter the Location' name="location" />
                <Box display='flex' justifyContent='end' gap={3}>
                    <Button onClick={() => navigate('/activities/')} color='inherit'>Cancel</Button>
                    <Button
                        type="submit"
                        color='success'
                        variant="contained"
                        disabled={updateActivity.isPending || createActivity.isPending}
                    >Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}