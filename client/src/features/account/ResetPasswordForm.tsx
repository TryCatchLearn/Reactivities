import { useNavigate, useSearchParams } from "react-router"
import { UseAccount } from "../../lib/hooks/useAccount";
import { Typography } from "@mui/material";
import { resetPasswordSchema, ResetPasswordSchema } from "../../lib/schemas/resetPasswordSchema";
import { toast } from "react-toastify";
import AcFormWapper from "./AcFormWapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/layout/components/TextInput";

export default function ResetPasswordForm() {
    const [params] = useSearchParams();
    const {resetPassword} = UseAccount();
    const navigate = useNavigate();

    const email = params.get('email');
    const code = params.get('code');

    if(!email || !code) return <Typography>Invalid Email Please check Email again.</Typography>

    const onSubmit = async (data: ResetPasswordSchema ) => {
        try {
            await resetPassword.mutateAsync({email, resetCode: code, newPassword: data.newPassword}, {
                onSuccess: () => {
                    toast.success('Password Reset SuccessFul- You can enjoy FriendsGrid Now');
                    navigate('/login');
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
  return (
        <AcFormWapper<ResetPasswordSchema>
            title='Reset your Password'
            submitButtonText="Reset Password"
            onSubmit={onSubmit}
            resolver={zodResolver(resetPasswordSchema)}
            icon={<LockOpen fontSize="large"/>}

        >
            <TextInput label='New Password' type="password" name='newPassword'/>
            <TextInput label='Confirm Password' type="password" name='confirmPassword'/>

        </AcFormWapper>
  )
}
