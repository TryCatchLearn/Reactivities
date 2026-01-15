import {z} from 'zod';
import { requiredString } from '../util/util';

export const activitySchema = z.object({
    title: requiredString('Title'),
    description: requiredString('Description'),
    category: requiredString('Category'),
    date: z.coerce.date({error: 'Date is required'}),
    location: z.object({
        venue: requiredString('Venue'),
        city: z.string(),
        latitude: z.coerce.number(),
        longitude: z.coerce.number()
    })
})

export type ActivitySchema = z.input<typeof activitySchema>;