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
        },
        onSuccess: () => {
            toast.success('You are now registerd - Please login');
            navigate('/login');
        },
        
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
        registerUser
    }
}