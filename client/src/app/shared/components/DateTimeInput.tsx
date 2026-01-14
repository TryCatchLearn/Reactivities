import { DateTimePicker, type DateTimePickerProps } from "@mui/x-date-pickers";
import {type FieldValues, useController, type UseControllerProps} from "react-hook-form";

type Props<T extends FieldValues> = {
    label: string;
} & UseControllerProps<T> & DateTimePickerProps;

export default function DateTimeInput<T extends FieldValues>(props: Props<T>) {
    const { field, fieldState } = useController({ ...props});

    return (
        <DateTimePicker
            {...props}
            value={field.value ? new Date(field.value) : null}
            onChange={value => {
                field.onChange(new Date(value!));
            }}
            sx={{width: '100%'}}
            slotProps={{
                textField: {
                    onBlur: field.onBlur,
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                    sx: {
                        "& .MuiFormHelperText-root": {
                            color: 'red'
                        },
                        width: '100%'
                    }
                },

            }}
        />
    )
}