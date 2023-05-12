import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.spacex.com/">
        SpaceX
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function LoginPage() {
  const navigate = useNavigate()

  React.useEffect(() => {
    sessionStorage.removeItem("token")
  }, [])
  

  const [load, setload] = React.useState(false)
  const handleSubmit = (event) => {
    event.preventDefault();
    setload(true)
    const data = new FormData(event.currentTarget);
    const email = data.get('email')
    const password = data.get('password')
    console.log(email, password)

    axios.post('https://guideyu-backend.vercel.app/login', {
      email,
      password,
    }).then((res) => {
      alert(res.data)
      setload(false)
      if (res.data.token) {
        sessionStorage.setItem('token', res.data.token);
        navigate("/dashboard")
        console.log({
          email,
          password,
          res
        });
      }
    }).catch((res) => {
      alert("invalid credentials")
      setload(false)
      console.log({
        res,
        email,
        password,
      });
    });
  };
  //
  return (
    <ThemeProvider theme={theme}>
      <Box container component="main" sx={{
        height: '100vh', backgroundImage: 'url(https://sxcontent9668.azureedge.us/cms-assets/assets/Homepage_Desktop_5ebdeb0c6c.webp)', backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Box sx={{
          background: "none",
          width: "fit-content", marginX: "auto", p: "1rem", m: "1rem",
          boxShadow: " 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
          backdropFilter: " blur( 5px )", border: "2px solid rgba( 255, 255, 255, 0.18 )", borderRadius: "0.2rem"

        }} component={Paper} elevation={6} square>

          <Box fontSize={"2rem"} >

GUIDEYU
          </Box>


          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Box mt='2.5rem' >

              <Box fontFamily={"monospace"} fontSize={"1.5rem"} >
                Sign In
              </Box>

              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                {
                  load ?
                    <Box width={"100%"} display={"flex"} justifyContent={"center"}  >
                      <CircularProgress /></Box> :

                    <Button
                      disabled={load}
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    > Sign In
                    </Button>
                }

                <Grid container>

                  <Grid item>

                    <div style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => navigate('/signup')} >
                      {"Don't have an account? Sign Up"}
                    </div>

                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box></Box>
          </Box>

        </Box>
      </Box>



    </ThemeProvider>
  );
}