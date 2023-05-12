import { Box } from '@mui/material'
import React from 'react'
import TemporaryDrawer from './Sidebar'

const Navbar = () => {
  return (
    <Box  bgcolor={"teal"} color={"white"} p={"0.5rem"} >
 <TemporaryDrawer/>
    </Box>
  )
}

export default Navbar