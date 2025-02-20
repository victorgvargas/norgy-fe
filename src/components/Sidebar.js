import MenuIcon from '@mui/icons-material/Menu';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import HomeIcon from '@mui/icons-material/Home';
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <IconButton sx={{position: "absolute", left: 10, top: 10}} onClick={() => setOpen(!open)}>
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="left"
                open={open}
                onClose={() => setOpen(false)}
            >
                <List>
                    <ListItem>
                        <ListItemButton onClick={() => navigate("/")}>
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText primary="Home"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={() => navigate("/scoreboard")}>
                            <ListItemIcon><ScoreboardIcon /></ListItemIcon>
                            <ListItemText primary="Scoreboard"/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}

export default Sidebar;