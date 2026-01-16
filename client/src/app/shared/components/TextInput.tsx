import { TextField, type TextFieldProps } from "@mui/material";
import { type FieldValues, useController, type UseControllerProps, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
    label: string;
    currency?: boolean;
} & UseControllerProps<T> & TextFieldProps;

export default function TextInput<T extends FieldValues>({control, ...props}: Props<T>) {
    const formContext = useFormContext<T>();
    const effectiveControl = control || formContext?.control;

    if (!effectiveControl) {
        throw new Error('TextInput must be used within form provider or explitly passed via a prop')
    }

    const { fieldState, field } = useController({ ...props, control: effectiveControl });

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