import { FieldValues } from "react-hook-form";
import { UseAccount } from "../../lib/hooks/useAccount"
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import AcFormWapper from "./AcFormWapper";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/layout/components/TextInput";

export default function ForgotPasswordForm() {
    const {forgotPassword} = UseAccount();
    const navigate =  useNavigate()

    const onSubmit = async (data: FieldValues) =>{
        try {
            await forgotPassword.mutateAsync(data.email, {
                onSuccess: () => {
                    toast.success('Password reset requested - please check your Email');
                    navigate('/login')
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
  return (
        <AcFormWapper
        title='Please Enter Your Email Address'
        icon={<LockOpen fontSize="large" />}
        submitButtonText="Request Password Reset Link"
        onSubmit={onSubmit}
        >
            <TextInput rules={{required: true}}label='Email Address' name='email'/> 

        </AcFormWapper>
  )
}
