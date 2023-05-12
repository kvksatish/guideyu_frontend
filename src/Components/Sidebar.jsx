import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { AddAPhotoSharp, AddHomeWork, AddReaction, Mail, ManageSearch, Menu, StarRate } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TemporaryDrawer = () => {
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      ((event.key === 'Tab' || event.key === 'Shift'))
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  let navigate=useNavigate()

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      
    >
      <List>
      <ListItem onClick={()=>navigate("/dashboard/addproperty")} disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <AddHomeWork/>
              </ListItemIcon>
              <ListItemText primary={"Add Property"} />
            </ListItemButton>
          </ListItem>
      <ListItem onClick={()=>navigate("/dashboard/searchproperty")}  disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ManageSearch/>
              </ListItemIcon>
              <ListItemText primary={"Search Property"} />
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
      <List>

       
          <ListItem  onClick={()=>navigate("/dashboard/addlead")} disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <AddReaction/>
              </ListItemIcon>
              <ListItemText primary={"Add Lead"} />
            </ListItemButton>
          </ListItem>

          <ListItem  onClick={()=>navigate("/dashboard/leads")} disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <StarRate/>
              </ListItemIcon>
              <ListItemText primary={"Leads"} />
            </ListItemButton>
          </ListItem>
          <ListItem  onClick={()=>navigate("/dashboard/mails")} disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <Mail/>
              </ListItemIcon>
              <ListItemText primary={"Mails"} />
            </ListItemButton>
          </ListItem>
       
      </List>
    </Box>
  );

  return (
    <Box  >
      {['left'].map((anchor) => (
        <Box key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <Menu/>
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </Box>
      ))}
    </Box>
  );
};

export default TemporaryDrawer;
