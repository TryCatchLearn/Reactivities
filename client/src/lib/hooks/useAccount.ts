import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import agent from "../api/agent.ts";
import type { LoginSchema } from "../schemas/loginSchema.ts";
import { useNavigate } from "react-router";
import type { RegisterSchema } from "../schemas/registerSchema.ts";
import { toast } from "react-toastify";

export const useAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post('/login?useCookies=true', creds);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user']
            });
            await navigate('/activities');
        }
    });

    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => {
            await agent.post('/account/register', creds);
        }
    })

    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post('/account/logout');
        },
        onSuccess: () => {
            queryClient.removeQueries({queryKey: ['user']});
            queryClient.removeQueries({queryKey: ['activities']});
            navigate('/');
        }
    })

    const verifyEmail = useMutation({
        mutationFn: async ({ userId, code }: {userId: string, code: string}) => {
            await agent.get(`/confirmEmail?userId=${userId}&code=${code}`);
        }
    });

    const resendConfirmationEmail = useMutation({
        mutationFn: async ({email, userId} :{email?: string, userId?: string | null}) => {
            await agent.get(`/account/resendConfirmEmail`, {
                params: { email, userId }
            });
        },
        onSuccess: () => {
            toast.success('Email sent - please check your inbox');
        }
    })

    const { data: currentUser,isLoading: loadingUserInfo } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>('/account/user-info');
            return response.data
        },
        enabled: !queryClient.getQueryData(['user'])
    });
    
    return {
        loginUser,
        currentUser,
        logoutUser,
        loadingUserInfo,
        registerUser,
        resendConfirmationEmail,
        verifyEmail
    }
}