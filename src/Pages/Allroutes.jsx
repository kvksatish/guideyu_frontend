import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Dashboard from './Dashboard';
import Hof from '../Components/Hof';
import { SearchProperty } from './SearchProperty';
import AddProperty from './AddProperty';
import AddLead from './AddLead';
import Leads from './Leads';
import MailService from './MailService';
import Campaigns from './Campaigns';
import Navbar from '../Components/Navbar';
import { ThemeProvider, createTheme } from '@mui/material';
import CreateCamp from './CreateCamp';

const Allroutes = () => {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Hof>
        <ThemeProvider theme={theme}>
    <Navbar/>
    
    </ThemeProvider >

        <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/searchproperty" element={<SearchProperty />} />
        <Route path="/addproperty" element={<AddProperty />} />
        <Route path="/addlead" element={<AddLead />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/mails" element={<MailService />} />
        <Route path="/mails/createcamp" element={<CreateCamp />} />
        <Route path="/mails/campaigns/:type" element={<Campaigns />} />
      </Routes></Hof>} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
};

export default Allroutes;
