import { TextField, TextFieldProps } from "@mui/material";
import { FieldValues, useController, UseControllerProps, useFormContext } from "react-hook-form"

type Props<T extends FieldValues> = {} & UseControllerProps<T> & TextFieldProps

export default function TextInput<T extends FieldValues>({control, ...props}: Props<T>) {
    const formContext = useFormContext<T>();
    const effectiveControl = control || formContext?.control;

    if (!effectiveControl) {
        throw new Error('Text input must be used within a form provider or passed as props')
    }

    const {field, fieldState} = useController({...props, control: effectiveControl});

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
    )
}