import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import agent from "../api/agent";
import { useMemo, useState } from "react";
import { Photo, Profile, User } from "../types";

export const useProfile = (id?: string, predicate?: string) => {
    const [filter, setFilter] = useState<string | null>(null);

    const queryclient = useQueryClient();

      const { data: userActivities, isLoading: loadingUserActivities } = useQuery({
        queryKey: ['user-activities', filter],
        queryFn: async () => {
            const response = await agent.get<Activity[]>(`/profiles/${id}/activities`, {
                params: {
                    filter
                }
            });
            return response.data
        },
        enabled: !!id && !!filter
    });


    const { data: profile, isLoading: loadingProfile } = useQuery<Profile>({
        queryKey: ['profile', id],
        queryFn: async () => {
            const response = await agent.get<Profile>(`/profiles/${id}`);
            return response.data

        },
        enabled: !!id && !predicate
    });

    const { data: following, isLoading: loadingFollowings } = useQuery<Profile[]>({
        queryKey: ['following', id, predicate],
        queryFn: async () => {
            const response = await agent.get<Profile[]>(`/profiles/${id}/follow-list?predicate=${predicate}`);
            return response.data;

        },
        enabled: !!id && !!predicate
    })

    const uploadPhoto = useMutation({
        mutationFn: async (file: Blob) => {
            const formdata = new FormData();
            formdata.append('file', file)
            const response = await agent.post('/profiles/add-photo', formdata, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            return response.data;
        },
        onSuccess: async (photo: Photo) => {
            await queryclient.invalidateQueries({
                queryKey: ['photos', id]
            });
            queryclient.setQueryData(['user'], (data: User) => {
                if (!data) return data;
                return {
                    ...data,
                    imageUrl: data.imageUrl ?? photo.url
                }
            });
            queryclient.setQueryData(['profile', id], (data: Profile) => {
                if (!data) return data;
                return {
                    ...data,
                    imageUrl: data.imageUrl ?? photo.url
                }
            });
        }

    })

    const setMainPhoto = useMutation({
        mutationFn: async (photo: Photo) => {
            await agent.put(`profiles/${photo.id}/setmain`)

        },
        onSuccess: (_, photo) => {
            queryclient.setQueryData(['user'], (userData: User) => {
                if (!userData) return userData;
                return {
                    ...userData,
                    imageUrl: photo.url
                }
            });
            queryclient.setQueryData(['profile', id], (profile: Profile) => {
                if (!profile) return profile;
                return {
                    ...profile,
                    imageUrl: photo.url
                }
            })
        }
    })


    const { data: photos, isLoading: loadingphotos } = useQuery<Photo[]>({
        queryKey: ['photo', id],
        queryFn: async () => {
            const response = await agent.get<Photo[]>(`/profiles/${id}/photos`)

            return response.data
        },
        enabled: !!id && !predicate
    });

    const deletePhoto = useMutation({
        mutationFn: async (photoId: string) => {
            await agent.delete(`/profiles/${photoId}/photos`)
        },
        onSuccess: (_, photoId) => {
            queryclient.setQueryData(['photos', id], (photos: Photo[]) => {
                return photos?.filter(x => x.id !== photoId)
            })
        }
    })
  
    const updateFollowing = useMutation({
        mutationFn: async () => {
            await agent.post(`/profiles/${id}/follow`)
        },
        onSuccess: () => {
            queryclient.setQueryData(['profile', id], (profile: Profile) => {
                queryclient.invalidateQueries({ queryKey: ['followings', id, 'followers'] })
                if (!profile || profile.followersCount == undefined) return profile;
                return {
                    ...profile,
                    following: !profile.following,
                    followersCount: profile.following ? profile.followersCount - 1 : profile.followersCount + 1
                }
            })
        }
    })

    const isCurrentUser = useMemo(() => {
        return id === queryclient.getQueryData<User>(['user'])?.id
    }, [id, queryclient])



    return {
        userActivities,
        loadingUserActivities,
        setFilter,
        filter,
        profile,
        loadingProfile,
        photos,
        loadingphotos,
        isCurrentUser,
        uploadPhoto,
        setMainPhoto,
        deletePhoto,
        updateFollowing,
        following,
        loadingFollowings
    }
}
