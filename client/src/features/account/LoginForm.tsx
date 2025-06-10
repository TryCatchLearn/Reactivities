import { useForm } from "react-hook-form";
import { UseAccount } from "../../lib/hooks/useAccount"
import { loginSchema, LoginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/layout/components/TextInput";
import { Link, useLocation, useNavigate } from "react-router";

export default function LoginForm() {


    const { loginUser } = UseAccount();
    const location= useLocation();
    const navigate= useNavigate();
    const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema)
    });


    const onSubmit = async (data: LoginSchema) => {
        await loginUser.mutateAsync(data, {
            onSuccess: () =>
            {
                navigate(location.state?.from || '/activities');
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
            }}
        >
            <Box display='flex' alignItems='center' justifyContent='center'
                gap={3} color='secondary.main'>
                <LockOpen fontSize="large" />
                <Typography variant="h4"> Sign in</Typography>
            </Box>

            <TextInput label='Email' control={control} name='email' />
            <TextInput label= 'Password'  control={control} name='password'  />
           
            <Button
                type='submit'
                disabled={!isValid || isSubmitting}
                variant="contained"
                size="large"
            >
                Login

            </Button>
            <Typography sx={{textAlign: 'center'}}>
                Don't have a Account?
                <Typography sx={{ml: 2}} component={Link} to ='/register' color="primary">
                Sign Up
                </Typography>
                 </Typography>




        </Paper>
    )
}