import { useAccount } from "../../lib/hooks/useAccount.ts";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput.tsx";
import { useNavigate, useLocation, Link } from "react-router";

export default function LoginForm() {
    const { loginUser } = useAccount();
    const navigate = useNavigate();
    const location = useLocation();
    const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginSchema) => {
        await loginUser.mutateAsync(data, {
            onSuccess: () => {
                navigate(location.state?.from || '/activities')
            }
        });
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
            <Typography sx={{ textAlign: 'center' }}>
                Don't have an account?
                <Typography sx={{ ml: 2 }} component={Link} to='/register' color='primary'>
                    Sign up
                </Typography>
            </Typography>
        </Paper>
    );
}