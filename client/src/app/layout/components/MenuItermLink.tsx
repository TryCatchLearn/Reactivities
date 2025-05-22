import { MenuItem } from "@mui/material";
import { ReactNode } from "react";
import { NavLink } from "react-router";

export default function MenuItermLink({children, to}: {children: ReactNode, to :string}) {
  return (
   <MenuItem
   component={NavLink}
   to={to}
   sx={{
    fontSiz: '1.2rem',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'inherit',
    '&.active':{
        color: 'tan'
    }
   }}>
   {children}
   </MenuItem>
  )
}