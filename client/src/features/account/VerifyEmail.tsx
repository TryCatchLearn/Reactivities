import { useEffect, useRef, useState } from "react";
import { UseAccount } from "../../lib/hooks/useAccount"
import { Link, useSearchParams } from "react-router";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { EmailRounded } from "@mui/icons-material";

export default function VerifyEmail() {
    const { verifyEmail, resentconfirmationEmail } = UseAccount();
    const [status, setStatus] = useState('verifying');
    const [serachParam] = useSearchParams();
    const userId = serachParam.get('userId');
    const code = serachParam.get('code');
    const hasRun = useRef(false);

    useEffect(() => {
        if (code && userId && !hasRun.current) {
            hasRun.current = true;
            verifyEmail.mutateAsync({userId, code})
                .then(() => setStatus('verified'))
                .catch(() => setStatus('failed'))
        }
    }, [code, userId, verifyEmail])

    const getBody = () => {
        switch (status) {
            case "verifying":
                return (
                    <Typography
                        variant="h5"
                        sx={{ color: "royalblue", fontWeight: 500, textAlign: "center", mt: 3 }}
                    >
                        Verifying...
                    </Typography>
                );

            case "failed":
                return (
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        gap={3}
                        sx={{
                            p: 4,
                            borderRadius: 4,
                            background: "linear-gradient(135deg, #fff1f1, #ffeaea)",
                            boxShadow: "0 6px 20px rgba(255,0,0,0.15)",
                            textAlign: "center",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                transform: "translateY(-3px)",
                                boxShadow: "0 10px 28px rgba(255,0,0,0.25)",
                            },
                        }}
                    >
                        <Typography variant="h6" sx={{ color: "darkred", fontWeight: 600 }}>
                            Seems There is a problem! Verification Failed. Please try Resending the link again
                        </Typography>
                        <Button
                            onClick={() => resentconfirmationEmail.mutate({ userId })}
                            disabled={resentconfirmationEmail.isPending}
                            variant="contained"
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: 16,
                                borderRadius: 3,
                                background: "linear-gradient(to right, #ff4d4d, #ff6666)",
                                boxShadow: "0 6px 16px rgba(255,77,77,0.4)",
                                "&:hover": {
                                    background: "linear-gradient(to right, #ff6666, #ff4d4d)",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 8px 20px rgba(255,77,77,0.5)",
                                },
                            }}
                        >
                            Resend verification Email
                        </Button>
                    </Box>
                );

            case "verified":
                return (

                    <Box


                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        gap={3}
                        sx={{
                            p: 4,
                            borderRadius: 4,
                            background: "linear-gradient(135deg, #e6f7ff, #f0faff)",
                            boxShadow: "0 6px 20px rgba(0,123,255,0.15)",
                            textAlign: "center",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                transform: "translateY(-3px)",
                                boxShadow: "0 10px 28px rgba(0,123,255,0.25)",
                            },
                        }}
                    >

                        <Button
                            variant="contained"
                            component={Link}
                            to="/login"
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: 17,
                                borderRadius: 3,
                                background: "linear-gradient(to right, #4169e1, #6a5acd)",
                                boxShadow: "0 6px 16px rgba(65,105,225,0.4)",
                                "&:hover": {
                                    background: "linear-gradient(to right, #6a5acd, #4169e1)",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 8px 22px rgba(65,105,225,0.5)",
                                },
                            }}
                        >
                            One Step away Now Just LOGIN
                        </Button>
                    </Box>
                );
        }
    };


    return (
        <Paper
            sx={{
                height: 400,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 6
            }}
        >
            <EmailRounded sx={{ fontSize: 100 }} color="primary" />
            <Typography gutterBottom variant="h3">
                Email Verification
            </Typography>
            <Typography
                variant="h6"
                sx={{ color: "royalblue", fontWeight: 600 }}
            >
                Yess$$ Your Email is Verified - You can now enjoy FriendsGrid
            </Typography>
            <Divider />
            {getBody()}
        </Paper>
    )
}
