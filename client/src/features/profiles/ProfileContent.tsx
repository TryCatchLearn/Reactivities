import { Box, Paper, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react"
import ProfilePhotos from "./ProfilePhotos";
import ProfileAbout from "./ProfileAbout";

export default function ProfileContent() {
  const [value, setValue] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }

  const tabContent = [
    {label: 'About', content: <ProfileAbout />},
    {label: 'Photos', content: <ProfilePhotos />},
    {label: 'Events', content: <div>Events</div>},
    {label: 'Followers', content: <div>Followers</div>},
    {label: 'Following', content: <div>Following</div>},
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
        value={value}
        onChange={handleChange}
        sx={{borderRight: 1, height: 450, minWidth: 200}}
      >
        {tabContent.map((tab, index) => (
          <Tab key={index} label={tab.label} sx={{mr: 3}} />
        ))}
      </Tabs>
      <Box sx={{flexGrow: 1, p: 3, pt: 0}}>
        {tabContent[value].content}
      </Box>
    </Box>
  )
}