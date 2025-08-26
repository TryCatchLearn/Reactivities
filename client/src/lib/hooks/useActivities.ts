import { keepPreviousData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { UseAccount } from "./useAccount";
import { useStore } from "./useStore";
import { FieldValues } from "react-hook-form";

export const useActivities = (id?: string) => {
    const {activityStore: {filter, startDate}} = useStore();
    const queryClient = useQueryClient();
    const { currentuser } = UseAccount();
    const location = useLocation()

    const { data: activitiesGroup, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = 
    useInfiniteQuery<PagedList<Activity, string>>({
        queryKey: ['friendGrid',filter, startDate],
        queryFn: async ({pageParam = null}) => {
            const response = await agent.get<PagedList<Activity, string>>('/friendGrid',{

                params : 
                {
                    cursor: pageParam,
                    pageSize: 3,
                    filter,
                    startDate
                }

            });
            return response.data;
        },
        placeholderData: keepPreviousData,
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.nextCursor,

        enabled: !id && location.pathname.toLowerCase().includes('/friendgrid') && !!currentuser,
        select: data => ({
            ...data,
            pages: data.pages.map((page) =>({
                ...page,
                items: page.items.map(activity => {
                    const host = activity.attendees.find(x => x.id === activity.hostId)
                return {
                    ...activity,
                    isHost: currentuser?.id === activity.hostId,
                    isGoing: activity.attendees.some(x => x.id === currentuser?.id),
                    hostImageUrl : host?.imageUrl                    
                }
                })
            }))
        })
    });

    const { data: activity, isLoading: isLoadingActivity } = useQuery({
        queryKey: ['friendGrid', id],
        queryFn: async () => {
            const response = await agent.get<Activity>(`/friendGrid/${id}`);
            return response.data;
        },
        enabled: !!id && !!currentuser,
        select: data => {
            const host = data.attendees.find(x => x.id === data.hostId)
            return {
                ...data,
                isHost: currentuser?.id === data.hostId,
                isGoing: data.attendees.some(x => x.id === currentuser?.id),
                hostImageUrl: host?.imageUrl
            }
        }
    })

    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.put('/friendGrid', activity)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['friendGrid']
            })
        }
    })

    const createActivity = useMutation({
        mutationFn: async (activity: FieldValues) => {
            const response = await agent.post('/friendGrid', activity)
            return response.data;

        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['friendGrid']
            })
        }
    });

    const deleteActivity = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete(`/friendGrid/${id}`)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['friendGrid']
            })
        }
    });

    const updateAttendance = useMutation(
        {
            mutationFn: async (id: string) => {
                await agent.post(`/friendGrid/${id}/attend`)

            },
            onMutate: async (activityId: string) => {
                await queryClient.cancelQueries({ queryKey: ['friendGrid', activityId] });

                const prevActivity = queryClient.getQueryData<Activity>(['friendGrid', activityId]);

                queryClient.setQueryData<Activity>(['friendGrid', activityId], oldActivity => {
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
                            imageUrl: currentuser.imageUrl
                            
                        }]
                    }

                    
                })

                return {prevActivity};
            },
            onError: (error, activityId, context) =>
            {
                if(context?.prevActivity){
                    console.log(error);
                    queryClient.setQueryData(['friendGrid', activityId], context.prevActivity)
                }
            }
        })

    return {
        activitiesGroup,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        isLoading,
        updateActivity,
        createActivity,
        deleteActivity,
        isLoadingActivity,
        activity,
        updateAttendance
    }

}