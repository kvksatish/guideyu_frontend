import { Box } from "@mui/material";
import axios from "axios";
import React from "react";

const MailCard = ({ type, ele }) => {
  function handle_lead_conversion() {
    let token = sessionStorage.getItem("token");
    console.log("vwvwwvd");
    axios
      .get(`http://localhost:7500/convert_to_lead/${ele.uuid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res, "rrrrr");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }
  return (
    <div>
      <Box
        p={"0.5rem"}
        m={"0.5rem"}
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
        borderRadius={"0.5rem"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-evenly"}>
        <Box>
          <Box>
            <Box
              sx={{
                backgroundColor: "#f3f3f3",
                color: "#333",
                fontSize: "1rem",
                fontWeight: "normal",
                padding: "0.5rem 1rem",

                borderRadius: "0.3rem",

                border: "1px solid #ccc",
                m: "0.2rem auto",

                textAlign: "left",
              }}>
              State: {ele.state}
            </Box>
            <Box
              sx={{
                backgroundColor: "#f0f0f0",
                color: "#333",
                fontSize: "1rem",
                fontWeight: "normal",
                padding: "0.5rem 1rem",

                borderRadius: "0.3rem",

                border: "1px solid #ccc",
                m: "0.2rem auto",

                textAlign: "left",
              }}>
              Date of Registration: {ele.date_of_registration}
            </Box>
            <Box
              sx={{
                backgroundColor: "#f7f7f7",
                color: "#333",
                fontSize: "1.1rem",
                fontWeight: "normal",
                padding: "0.5rem 1rem",

                borderRadius: "0.3rem",

                border: "1px solid #ccc",
                m: "0.2rem auto",

                textAlign: "left",
              }}>
              Email: {ele.email}
            </Box>
            <Box
              sx={{
                backgroundColor: "#f7f7f7",
                color: "#333",
                fontSize: "1.2rem",
                fontWeight: "bold",
                padding: "0.5rem 1rem",
                border: "1px solid #ccc",
                borderRadius: "0.3rem",
                border: "1px solid #ccc",
                m: "0.2rem auto",

                textAlign: "left",
              }}>
              Activity: {ele.activity}
            </Box>
            <Box
              sx={{
                backgroundColor: "#e9f7ec",
                color: "#333",
                fontSize: "1rem",
                fontWeight: "normal",
                padding: "0.5rem 1rem",

                borderRadius: "0.3rem",

                border: "1px solid #ccc",
                m: "0.2rem auto",

                textAlign: "left",
              }}>
              Address: {ele.address}
            </Box>
            {/* <Box
            sx={{
              backgroundColor: "#fef0f1",
              color: "#333",
              fontSize: "1.1rem",
              fontWeight: "normal",
              padding: "0.5rem 1rem",

              borderRadius: "0.3rem",

              border: "1px solid #ccc",
              m: "0.2rem auto",

              textAlign: "left",
            }}>
            Batch ID: {ele.batchid}
          </Box> */}
            <Box
              sx={{
                backgroundColor: "#fff6dd",
                color: "#333",
                fontSize: "1.2rem",
                fontWeight: "bold",
                padding: "0.5rem 1rem",

                borderRadius: "0.3rem",

                border: "1px solid #ccc",
                m: "0.2rem auto",

                textAlign: "left",
              }}>
              Company Name: {ele.company_name}
            </Box>

            {/* <Box
            sx={{
              backgroundColor: "#e0f7f8",
              color: "#333",
              fontSize: "1.2rem",
              fontWeight: "bold",
              padding: "0.5rem 1rem",

              borderRadius: "0.3rem",

              border: "1px solid #ccc",
              m: "0.2rem auto",

              textAlign: "left",
            }}>
            Open Time: {ele.open_time}
          </Box> */}
            {/* <Box
            sx={{
              backgroundColor: "#ffeded",
              color: "#333",
              fontSize: "1rem",
              fontWeight: "normal",
              padding: "0.5rem 1rem",

              borderRadius: "0.3rem",

              border: "1px solid #ccc",
              m: "0.2rem auto",

              textAlign: "left",
            }}>
            Sent Time: {ele.sent_time}
          </Box> */}

            {/* <Box
            sx={{
              backgroundColor: "#d5edf8",
              color: "#333",
              fontSize: "1.2rem",
              fontWeight: "bold",
              padding: "0.5rem 1rem",

              borderRadius: "0.3rem",

              border: "1px solid #ccc",
              m: "0.2rem auto",

              textAlign: "left",
            }}>
            Status: {ele.status}
          </Box> */}
            {/* <Box
            sx={{
              backgroundColor: "#f7f7f7",
              color: "#333",
              fontSize: "1rem",
              fontWeight: "normal",
              padding: "0.5rem 1rem",

              borderRadius: "0.3rem",

              border: "1px solid #ccc",
              m: "0.2rem auto",

              textAlign: "left",
            }}>
            UUID: {ele.uuid}
          </Box> */}
            {/* <Box
            sx={{
              backgroundColor: "#fff6dd",
              color: "#333",
              fontSize: "1rem",
              fontWeight: "normal",
              padding: "0.5rem 1rem",

              borderRadius: "0.3rem",

              border: "1px solid #ccc",
              m: "0.2rem auto",

              textAlign: "left",
            }}>
            Upload Time: {new Date(ele.uploadtime).toLocaleString()}
          </Box> */}
          </Box>
        </Box>

        {type == "OPENED" && (
          <Box
            fontSize={"1.3rem"}
            p={"0.5rem"}
            mt={"0.5rem"}
            borderRadius={"0.3rem"}
            bgcolor={"red"}
            color={"white"}
            textAlign={"center"}
            sx={{ cursor: "pointer" }}
            onClick={handle_lead_conversion}>
            Convert to Lead
          </Box>
        )}
      </Box>
    </div>
  );
};

export default MailCard;
