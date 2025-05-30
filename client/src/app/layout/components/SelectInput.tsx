import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { SelectInputProps } from '@mui/material/Select/SelectInput';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';

type Props<T extends FieldValues> = {
  items: { text: string, value: string }[];
  lable: string;
} & UseControllerProps<T> & Partial<SelectInputProps>

export default function SelectInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props });

  return (
    <FormControl fullWidth error={!!fieldState.error}>
      <InputLabel> {props.lable}</InputLabel>

      <Select
        value={field.value || ''}
        label={props.lable}
        onChange={field.onChange}
      >
        {props.items.map(item => (
          <MenuItem key={item.value} value={item.value}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText> {fieldState.error?.message}</FormHelperText>

    </FormControl>
  )

}