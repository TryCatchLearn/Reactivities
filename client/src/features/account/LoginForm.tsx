import { useForm } from "react-hook-form";
import { UseAccount } from "../../lib/hooks/useAccount"
import { loginSchema, LoginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/layout/components/TextInput";
import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LoginForm() {

    const [notVerified, setNotVerified] = useState(false);
    const { loginUser, resentconfirmationEmail } = UseAccount();
    const location = useLocation();
    const navigate = useNavigate();
    const { control, handleSubmit, watch, formState: { isValid, isSubmitting } } = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema)
    });

    const email = watch('email');
    const handleResendEmail = async () => {
        try {
            await resentconfirmationEmail.mutateAsync({ email });
            setNotVerified(false);
        } catch (error) {
            console.log(error);
            toast.error(
                'Problem sending email pleae check and Try Again'
            )

        }

    }


    const onSubmit = async (data: LoginSchema) => {
        await loginUser.mutateAsync(data, {
            onSuccess: () => {
                navigate(location.state?.from || '/friendGrid');
            },
            onError: error => {
                if (error.message === 'NotAllowed') {
                    setNotVerified(true);
                }
            }
        })
    }
    return (
        <Paper
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 3,
                gap: 3,
                maxWidth: 'md',
                mx: 'auto',
                borderRadius: 3
            }}
        >
            <Box display='flex' alignItems='center' justifyContent='center'
                gap={3} color='secondary.main'>
                <LockOpen fontSize="large" />
                <Typography variant="h4"> Sign in</Typography>
            </Box>

            <TextInput label='Email' control={control} name='email' />
            <TextInput label='Password' control={control} name='password' />

            <Button
                type='submit'
                disabled={!isValid || isSubmitting}
                variant="contained"
                size="large"
            >
                Login

            </Button>
            {notVerified ? (
                <Box display='flex' flexDirection='column' justifyContent='center'>
                    <Typography textAlign='center' color='error'>
                        Seems Your Email is not Verified. Just click the Button to resend the Email
                    </Typography>
                    <Button
                        disabled={resentconfirmationEmail.isPending}
                        onClick={handleResendEmail}
                    >
                        Send Emial Link
                    </Button>
                </Box>
            ) : (
                <Box display='flex' alignItems='center' justifyContent='center' gap={3}>
                    <Typography>
                        Oops IF you Forgot Password? <Link to='/forgotPassword'> click me</Link>
                    </Typography>
                    <Typography sx={{ textAlign: 'center' }}>
                        Don't have a Account?
                        <Typography sx={{ ml: 2 }} component={Link} to='/register' color="primary">
                            Sign Up
                        </Typography>
                    </Typography>
                </Box>


            )}





        </Paper>
    )
}