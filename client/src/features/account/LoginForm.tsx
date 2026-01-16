import { useAccount } from "../../lib/hooks/useAccount.ts";
import { useForm, useWatch } from "react-hook-form";
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import LockOpen from "@mui/icons-material/LockOpen";
import TextInput from "../../app/shared/components/TextInput.tsx";
import { useNavigate, useLocation, Link } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";
import { GitHub } from "@mui/icons-material";

export default function LoginForm() {
    const [notVerified, setNotVerified] = useState(false);
    const { loginUser, resendConfirmationEmail } = useAccount();
    const navigate = useNavigate();
    const location = useLocation();
    const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema)
    });

    const email = useWatch({ control, name: 'email' });

    const handleResendEmail = async () => {
        try {
            await resendConfirmationEmail.mutateAsync({email});
            setNotVerified(false);
        } catch (error) {
            console.log(error);
            toast.error('Problem sending email - please check email address');
        }
    }

    const onSubmit = async (data: LoginSchema) => {
        await loginUser.mutateAsync(data, {
            onSuccess: () => {
                navigate(location.state?.from || '/activities')
            },
            onError: (error => {
                if (error.message === 'NotAllowed') {
                    setNotVerified(true);
                }
            })
        });
    }

    const loginWithGithub = () => {
        const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
        const redirectUrl = import.meta.env.VITE_REDIRECT_URI;
        window.location.href = 
            `https://github.com/login/oauth/authorize?client_id=${clientId}&redirectUri=${redirectUrl}&scope=read:user user:email`
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
            }}>
            <Box display='flex' alignItems='center' justifyContent='center' gap={3} color='secondary.main'>
                <LockOpen fontSize='large' />
                <Typography variant="h4">Sign in</Typography>
            </Box>
            <TextInput label='Email' control={control} name='email' />
            <TextInput label='Password' control={control} name='password' type='password' />
            <Button
                type='submit'
                loading={isSubmitting}
                disabled={!isValid}
                variant="contained"
                size="large">Login</Button>

            <Button
                onClick={loginWithGithub}
                startIcon={<GitHub />}
                sx={{backgroundColor: 'black'}}
                type="button"
                variant="contained"
                size="large"
            >
                Login with Github
            </Button>
            {notVerified ? (
                <Box display='flex' flexDirection='column' justifyContent='center'>
                    <Typography textAlign='center' color="error">
                        Your email has not been verified. You can click the button to re-send the verfication link.
                    </Typography>
                    <Button
                        disabled={resendConfirmationEmail.isPending}
                        onClick={handleResendEmail}
                    >
                        Re-send email link
                    </Button>
                </Box>

            ) : (
                <Box display='flex' alignItems='center' justifyContent='center' gap={3}>
                    <Typography>
                        Forgot password? Click <Link to='/forgot-password'>here</Link>
                    </Typography>
                    <Typography sx={{ textAlign: 'center' }}>
                        Don't have an account?
                        <Typography sx={{ ml: 2 }} component={Link} to='/register' color='primary'>
                            Sign up
                        </Typography>
                    </Typography>
                </Box>
            )}
        </Paper>
    );
}