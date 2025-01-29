import { useForm } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccount";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { Link } from "react-router";
import { registerSchema, RegisterSchema } from "../../lib/schemas/registerSchema";
import { useState } from "react";
import RegisterSuccess from "./RegisterSuccess";

export default function RegisterForm() {
    const { registerUser } = useAccount();
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const { control, handleSubmit, watch, setError, formState: { isValid, isSubmitting } } = useForm<RegisterSchema>({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema)
    });
    const email = watch('email');

    const onSubmit = async (data: RegisterSchema) => {
        await registerUser.mutateAsync(data, {
            onSuccess: () => setRegisterSuccess(true),
            onError: (error) => {
                if (Array.isArray(error)) {
                    error.forEach(err => {
                        if (err.includes('Email')) setError('email', { message: err });
                        else if (err.includes('Password')) setError('password', { message: err })
                    })
                }
            }
        });
    }

    return (
        <>
            {registerSuccess ? (
                <RegisterSuccess email={email} />
            ) : (
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
                        <Typography variant="h4">Register</Typography>
                    </Box>
                    <TextInput label='Email' control={control} name='email' />
                    <TextInput label='Display name' control={control} name='displayName' />
                    <TextInput label='Password' type='password' control={control} name='password' />
                    <Button
                        type='submit'
                        disabled={!isValid || isSubmitting}
                        variant="contained"
                        size="large"
                    >
                        Register
                    </Button>
                    <Typography sx={{ textAlign: 'center' }}>
                        Already have an account?
                        <Typography sx={{ ml: 2 }} component={Link} to='/login' color="primary">
                            Sign in
                        </Typography>
                    </Typography>
                </Paper>
            )}
        </>

    )
}