import { Box, Paper, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react"
import ProfilePhotos from "./ProfilePhotos";
import AboutPage from "./AboutPage";
import ProfileFollowings from "./ProfileFollowings";

export default function ProfileContent() {

    const [vlaue, setValue]= useState(0);

    const handleChange = (_: SyntheticEvent, newvalue: number) => 
    {
        setValue(newvalue);
    }

    const tabContent = [

        {Label: 'About', content: <AboutPage/>},
        {Label: 'Photos', content: <ProfilePhotos/>},
        {Label: 'Events', content: <div>Events</div>},
        {Label: 'Followers', content: <ProfileFollowings activeTab={vlaue}/>},
        {Label: 'Following', content: <ProfileFollowings activeTab={vlaue}/>},
        
    ]
  return (
    <Box
    component={Paper}
    mt={2}
    p={3}
    elevation={3}
    height={500}
    sx={{display: 'flex', alignItems: 'flex-start', borderRadius: 3}}

    >
        <Tabs
        orientation="vertical"
        value={vlaue}
        onChange={handleChange}
        sx={{borderRight: 1, Height: 450, minWidth: 200}}
        >
            {tabContent.map((tab, index) =>(
                <Tab key={index} label={tab.Label} sx={{mr: 3}}/>
            ))}

        </Tabs>

        <Box
        sx={{flexGrow: 1,p:3, pt: 0}}
        >
            {tabContent[vlaue].content}

        </Box>

    </Box>
  )
}
