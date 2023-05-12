import { Backdrop, Box, Button, CircularProgress, Input } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Snackbar, SnackbarContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateCamp = () => {
  let token = sessionStorage.getItem("token");
  const [file, setfile] = useState();
  const [load, setload] = useState(false);

  let navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  function handleSuccess() {
    setSuccess(true);
    setError(false);
  }

  function handleError() {
    setSuccess(false);
    setError(true);
  }

  function send_mail_data() {
    setload(true);
    const formData = new FormData();
    formData.append("csvFile", file);
    axios
      .post(
        "https://guideyu-backend.vercel.app/multiple_mails_sender",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setload(false);
        console.log(res);
        handleSuccess();
        navigate("/dashboard/mails");
      })
      .catch((err) => {
        setload(false);
        console.log(err);
        handleError();
      });
  }
  return (
    <Box>
      <Box>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={load}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>

      <Snackbar
        open={success || error}
        onClose={() => {
          setSuccess(false);
          setError(false);
        }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        autoHideDuration={3000}>
        <SnackbarContent
          sx={{
            backgroundColor: success ? "green" : error ? "red" : "green",
          }}
          message={
            success
              ? "Campaign Created Successfully"
              : error && "Failed to Create. Please try again later."
          }
        />
      </Snackbar>

      <Box
        m={"auto"}
        mt={"5rem"}
        width={"80%"}
        display="flex"
        justifyContent="center">
        <Input
          onChange={(e) => setfile(e?.target?.files[0])}
          sx={{ p: "1rem" }}
          type="file"
        />
      </Box>
      <Box margin={"auto"} width={"10rem"} mt={"1rem"}>
        <Button onClick={send_mail_data} variant="outlined" disabled={!file}>
          Upload Csv
        </Button>
      </Box>
    </Box>
  );
};

export default CreateCamp;
