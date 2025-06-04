import { useMutation } from "@tanstack/react-query"
import { LoginSchema } from "../schemas/loginSchema"
import agent from "../api/agent"

export const UseAccount = () => {
    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post('/login?useCookies=true', creds);

        }
    });
    return {
        loginUser
    }
}