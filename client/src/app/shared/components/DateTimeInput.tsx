import { FieldValues, useController, UseControllerProps } from "react-hook-form"
import {DateTimePicker, DateTimePickerProps} from '@mui/x-date-pickers';

type Props<T extends FieldValues> = {} & UseControllerProps<T> & DateTimePickerProps<Date>

export default function DateTimeInput<T extends FieldValues>(props: Props<T>) {
    const { field, fieldState } = useController({ ...props });

    return (
        <DateTimePicker 
            {...props}
            value={field.value ? new Date(field.value) : null}
            onChange={value => {
                field.onChange(new Date(value!))
            }}
            sx={{width: '100%'}}
            slotProps={{
                textField: {
                    onBlur: field.onBlur,
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message
                }
            }}
        />
    )
}