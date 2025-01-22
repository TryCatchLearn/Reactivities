import { Button, ButtonProps, styled } from "@mui/material";
import { LinkProps } from "react-router";

type StyledButtonProps = ButtonProps & Partial<LinkProps>

const StyledButton = styled(Button)<StyledButtonProps>(({theme}) => ({
    '&.Mui-disabled': {
        backgroundColor: theme.palette.grey[600],
        color: theme.palette.text.disabled
    }
}))

export default StyledButton;