import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { LoginSchema } from "../schemas/loginSchema"
import agent from "../api/agent"
import { useNavigate } from "react-router";
import { RegisterSchema } from "../schemas/registerSchema";
import { toast } from "react-toastify";

export const UseAccount = () => {
    const queryClinet = useQueryClient();
    const navigate = useNavigate();
    // const location= useLocation();


    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post('/login?useCookies=true', creds);

        },
        onSuccess: async () => {
            await queryClinet.invalidateQueries({
                queryKey: ['user']
            });

        }


    });
    const registerUser = useMutation({

        mutationFn: async (creds: RegisterSchema) => {
            await agent.post('/account/register', creds)
        }
        
        
    })



    const logoutuser = useMutation({
        mutationFn: async () => {
            await agent.post('/account/logout');

        },
        onSuccess: () => {
            queryClinet.removeQueries({ queryKey: ['user'] });
            queryClinet.removeQueries({ queryKey: ['activities'] });
            navigate('/')
        }
    })
    const verifyEmail = useMutation({
        mutationFn: async({userId, code}:{userId: string, code: string}) => {
            await agent.get(`/confirmEmail?userId=${userId}&code=${code}`)
        }
    });

    const resentconfirmationEmail = useMutation({
            mutationFn: async ({email, userId}:{email?: string, userId?: string | null}) => {
                await agent.get(`/account/resendConfirmEmail`, {
                    params: {
                        email,
                        userId
                    }
                })
            },
            onSuccess: () => {
                toast.success('Email Is sent Dear User Request to confirm the link on your Email account and login again');
            }
    })


    const { data: currentuser, isLoading: loadingUserInfo } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>('/account/user-info');
            return response.data;
        },
        enabled: !queryClinet.getQueryData(['user']) 
        // && location.pathname !=='/login'
        // && location.pathname !=='/register'
    })
    return {
        loginUser,
        currentuser,
        logoutuser,
        loadingUserInfo,
        registerUser,
        verifyEmail,
        resentconfirmationEmail
    }
}