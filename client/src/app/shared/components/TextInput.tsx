import { TextField, type TextFieldProps } from "@mui/material";
import { type FieldValues, useController, type UseControllerProps } from "react-hook-form";

type Props<T extends FieldValues> = {
    label: string;
    currency?: boolean;
} & UseControllerProps<T> & TextFieldProps;

export default function TextInput<T extends FieldValues>(props: Props<T>) {
    const { fieldState, field } = useController({ ...props });

    return (
        <TextField
            {...props}
            {...field}
            value={field.value || ''}
            fullWidth
            variant="outlined"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
        />
    );
}