import { Button, Paper, Typography } from "@mui/material";
import { UseAccount } from "../../lib/hooks/useAccount";
import { Check } from "@mui/icons-material";

type Props = {
    email?: string;
}

export default function RegisterSuccess({ email }: Props) {
    const { resentconfirmationEmail } = UseAccount();

    if (!email) return null;
    return (
        <Paper
            elevation={8}
            sx={{
                height: "auto",
                minHeight: 400,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 6,
                borderRadius: 6,
                background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
                },
                textAlign: "center",
            }}
        >
            <Check sx={{ fontSize: 80, color: "blueviolet", mb: 2 }} />

            <Typography
                gutterBottom
                variant="h3"
                sx={{ color: "turquoise", fontWeight: 700 }}
            >
                Woalla You've Been Registered To FreindsGrid!
            </Typography>

            <Typography gutterBottom variant="h5" sx={{ color: "black", mt: 2 }}>
                Now - Generous Developer - Mahabali Requests you to
            </Typography>
            <Typography gutterBottom variant="h5" sx={{ color: "black" }}>
                Check your Email account
            </Typography>
            <Typography gutterBottom variant="h5" sx={{ color: "black" }}>
                To Verify It's you!
            </Typography>

            <Button
                variant="contained"
                sx={{
                    mt: 4,
                    fontSize: 18,
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    background: "linear-gradient(to right, #4169e1, #6a5acd)",
                    textTransform: "none",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15)"
                }}
                onClick={() => resentconfirmationEmail.mutate({ email })}
            >
                Resend Confirmation Email
            </Button>
        </Paper>
    );
}
