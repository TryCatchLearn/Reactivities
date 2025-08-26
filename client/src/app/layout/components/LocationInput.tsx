import { useEffect, useMemo, useState } from "react";
import { FieldValues, useController, UseControllerProps } from "react-hook-form"
import { TextField, Box, Typography, List, ListItemButton, debounce } from "@mui/material";
import axios from "axios";


type Props<T extends FieldValues> = {
    label: string
} & UseControllerProps<T>


export default function LocationInput<T extends FieldValues>(props: Props<T>) {
    const { field, fieldState } = useController({ ...props });

    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestoins] = useState<LocationIQSuggestoin[]>([]);
    const [inputValue, setInputvalue] = useState(field.value || '');

    useEffect(() => {
        if (field.value && typeof field.value === 'object') {
            setInputvalue(field.value.venue || '');
        } else {
            setInputvalue(field.value || '');
        }
    }, [field.value])

    const locationURL = 'https://api.locationiq.com/v1/autocomplete?key=pk.5aa5441f75438d2feba66c5599dc025d&limit=5&dedupe=1&'

    const fetchSuggestions = useMemo(
        () => debounce(async (query: string) => {
            if (!query || query.length < 3) {
                setSuggestoins([]);
                return;
            }
            setLoading(true);
            try {
                const res = await axios.get<LocationIQSuggestoin[]>(`${locationURL}q= ${query}`)
                setSuggestoins(res.data)

            }
            catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }

        }, 500), [locationURL]
    );
    const handleChange = async (value: string) => {
        field.onChange(value);
        await fetchSuggestions(value);
    }
    const handleSelect= (location: LocationIQSuggestoin) =>
    {
        const city= location.address?.city || location.address?.town || location.address?.village;
        const venue= location.display_name;
        const latitude= location.lat;
        const longitude= location.lon;
        setInputvalue(venue);
        field.onChange({city, venue, longitude, latitude, });
        setSuggestoins([]);
    }
    return (
        <Box>
            <TextField
                {...props}
                value={inputValue}
                onChange={e => handleChange(e.target.value)}
                fullWidth
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}

            />
            {loading && <Typography>Loading...</Typography>}
            {suggestions.length > 0 && (
                <List sx={{ border: 1 }}>
                    {suggestions.map(suggestion => (
                        <ListItemButton

                            divider
                            key={suggestion.place_id}
                            onClick={() =>handleSelect(suggestion)}
                        >
                            {suggestion.display_name}
                        </ListItemButton>

                    ))}
                </List>
            )}
        </Box>
    )
}
