import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { UseAccount } from "./useAccount";

export const useActivities = (id?: string) => {
    const queryClient = useQueryClient();
    const { currentuser } = UseAccount();
    const location = useLocation()

    const { data: activities, isLoading } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const response = await agent.get<Activity[]>('/activities');
            return response.data;
        },
        enabled: !id && location.pathname == '/activities' && !!currentuser,
        select: data => {
            return data.map(activity => {
                return {
                    ...activity,
                    isHost: currentuser?.id === activity.hostId,
                    isGoing: activity.attendees.some(x => x.id === currentuser?.id)
                }
            })
        }

    });

    const { data: activity, isLoading: isLoadingActivity } = useQuery({
        queryKey: ['activities', id],
        queryFn: async () => {
            const response = await agent.get<Activity>(`/activities/${id}`);
            return response.data;
        },
        enabled: !!id && !!currentuser,
        select: data => {
            return {
                ...data,
                isHost: currentuser?.id === data.hostId,
                isGoing: data.attendees.some(x => x.id === currentuser?.id)
            }
        }
    })

    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.put('/activities', activity)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']
            })
        }
    })

    const createActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            const response = await agent.post('/activities', activity)
            return response.data;

        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']
            })
        }
    });

    const deleteActivity = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete(`/activities/${id}`)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']
            })
        }
    });

    const updateAttendance = useMutation(
        {
            mutationFn: async (id: string) => {
                await agent.post(`activities/${id}/attend`)

            },
            onMutate: async (activityId: string) => {
                await queryClient.cancelQueries({ queryKey: ['activities', activityId] });

                const prevActivity = queryClient.getQueryData<Activity>(['activities', activityId]);

                queryClient.setQueryData<Activity>(['activities', activityId], oldActivity => {
                    if (!oldActivity || !currentuser) {
                        return oldActivity
                    }
                    const isHost = oldActivity.hostId === currentuser.id;
                    const isAttending = oldActivity.attendees.some(x => x.id === currentuser.id);

                    return {
                        ...oldActivity, 
                        isCancelled: isHost ? !oldActivity.isCancelled: oldActivity.isCancelled,
                        attendees: isAttending
                        ? isHost
                        ?oldActivity.attendees
                        :oldActivity.attendees.filter( x => x.id !== currentuser.id)
                        :[...oldActivity.attendees, {
                            id: currentuser.id,
                            displayName: currentuser.displayName,
                            imageUrl: currentuser.imageURL
                            
                        }]
                    }

                    
                })

                return {prevActivity};
            },
            onError: (error, activityId, context) =>
            {
                if(context?.prevActivity){
                    console.log(error);
                    queryClient.setQueryData(['activities', activityId], context.prevActivity)
                }
            }
        })

    return {
        activities,
        isLoading,
        updateActivity,
        createActivity,
        deleteActivity,
        isLoadingActivity,
        activity,
        updateAttendance
    }

}