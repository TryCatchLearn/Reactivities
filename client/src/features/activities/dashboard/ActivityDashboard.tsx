import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivitityForm";

type Props = {
    activities: Activity[]
    selectActivity: (id: string) => void
    cancelSelect: () => void
    selectedActivity?: Activity
    openForm: (id: string) => void
    closeForm: () => void
    editMode: boolean
    submitForm: (activity: Activity) => void;
    deleteActivity: (id: string) => void
}

export default function ActivityDashboard({ activities, selectActivity, selectedActivity, cancelSelect, openForm, closeForm, editMode, submitForm, deleteActivity }: Props) {
    return (
        <Grid container spacing={3}>
            <Grid size={7}>
                <ActivityList 
                    activities={activities} 
                    selectActivity={selectActivity} 
                    deleteActivity={deleteActivity}
                />
            </Grid>
            <Grid size={5}>
                {selectedActivity && !editMode &&
                    <ActivityDetails
                        activity={selectedActivity}
                        cancelSelect={cancelSelect}
                        openForm={openForm}
                    />
                }
                {editMode &&
                <ActivityForm 
                    closeForm={closeForm} 
                    activity={selectedActivity} 
                    submitForm={submitForm}
                />
                }
            </Grid>
        </Grid>
    )
}