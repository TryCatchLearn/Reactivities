import { FieldValues, useForm } from "react-hook-form"
import { useAccount } from "../../lib/hooks/useAccount";
import { Button, Paper, Typography } from "@mui/material";
import { EmailOutlined } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";

export default function ResendConfirmEmail() {
    const {control, handleSubmit, reset, formState: {isValid, isSubmitting}} = useForm();
    const {resendConfirmationEmail} = useAccount();

    const onSubmit = async (data: FieldValues) => {
        await resendConfirmationEmail.mutateAsync(data.email, {
            onSuccess: () => {
                reset();
            }
        })
    }

    return (
        <Paper
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                height: 400,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 6,
                gap: 3,
                maxWidth: 'lg',
                mx: 'auto'
            }}
        >
            <EmailOutlined sx={{fontSize: 100}} color="primary" />
            <Typography gutterBottom variant="h3">
                Resend the confirmation email
            </Typography>
            <TextInput 
                name='email'
                control={control}
                rules={{required: 'Email is required'}}
                label='Email address'
            />
            <Button type="submit" disabled={!isValid || isSubmitting}>
                Re-send confirmation email
            </Button>
        </Paper>
    )
}