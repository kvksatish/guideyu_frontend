import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { ChakraProvider, Input } from "@chakra-ui/react";
import { m } from "framer-motion";
import TemporaryDrawer from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://www.guideyu.in/">
        SpaceX
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Dashboard() {
  const navigate = useNavigate();
  const [load, setload] = React.useState(false);
  const [searcher, setsearcher] = React.useState({
    status: "",
    type: "",
    ol: "",
  });
  const [data, setdata] = React.useState([]);

  React.useEffect(() => {
    setload(true);
    // let token = sessionStorage.getItem('token');
    // axios.get(``, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }).then((res) => {
    //   console.log(res, searcher)
    //   setdata(res.data)
    //   setload(false)
    // })
  }, [searcher]);

  return <>Dashboard</>;
}
