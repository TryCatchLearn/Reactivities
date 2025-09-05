import { changePassSchema, ChangePassSchema } from "../../lib/schemas/ChangePassSchemas"
import AcFormWapper from "./AcFormWapper";
import { Password } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../app/layout/components/TextInput";
import { UseAccount } from "../../lib/hooks/useAccount";
import { toast } from "react-toastify";

export default function ChangePassForm() {

    const {changePassword} = UseAccount();
    const onSubmit = async (data: ChangePassSchema) => {
        try {
            await changePassword.mutateAsync(data, {
                onSuccess: () => toast.success('Your Password has been changed')
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <AcFormWapper<ChangePassSchema>
            title='Change Password'
            icon={<Password fontSize="large"/>}
            onSubmit={onSubmit}
            submitButtonText="Update Password"
            resolver={zodResolver(changePassSchema)}
            reset={true}
        >
                <TextInput type="password" label="Current Password" name="currentPassword"/>
                <TextInput type="password" label="New Password" name="newPassword"/>
                <TextInput type="password" label="Confirm Password" name="confirmPassword"/>
        </AcFormWapper>

    )
}
