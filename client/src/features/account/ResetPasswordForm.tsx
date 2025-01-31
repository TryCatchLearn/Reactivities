import { useNavigate, useSearchParams } from "react-router"
import { useAccount } from "../../lib/hooks/useAccount";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import AccountFormWrapper from "./AccountFormWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { resetPasswordSchema, ResetPasswordSchema } from "../../lib/schemas/resetPasswordSchema";

export default function ResetPasswordForm() {
    const [params] = useSearchParams();
    const {resetPassword} = useAccount();
    const navigate = useNavigate();

    const email = params.get('email');
    const code = params.get('code');
    
    if (!email || !code) return <Typography>Invalid reset password code</Typography>

    const onSubmit = async (data: ResetPasswordSchema) => {
        try {
            await resetPassword.mutateAsync({email, 
                resetCode: code, newPassword: data.newPassword}, {
                    onSuccess: () => {
                        toast.success('Password reset successfully - you can now sign in');
                        navigate('/login');
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AccountFormWrapper<ResetPasswordSchema>
            title='Reset your password'
            submitButtonText="Reset password"
            onSubmit={onSubmit}
            resolver={zodResolver(resetPasswordSchema)}  
            icon={<LockOpen fontSize="large" />}  
        >
            <TextInput label='New password' type="password" name='newPassword' />
            <TextInput label='Confirm password' type="password" name='confirmPassword' />
        </AccountFormWrapper>
    )
}