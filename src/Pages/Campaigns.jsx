import { Backdrop, Box, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PaginationComp from "../Components/PaginationComp";
import MailCard from "../Components/MailCard";

const Campaigns = () => {
  let token = sessionStorage.getItem("token");
  const location = useLocation();
  const bid = location?.state?.bid;
  const totalmails = location?.state?.count;
  console.log(bid);

  const [totalobject, settotalobject] = useState();

  const [type, settype] = useState("UPLOADED");
  const [page, setpage] = useState();
  const [limit, setlimit] = useState();
  const [totalpages, settotalpages] = useState();

  const [load, setload] = useState(false);

  const [reSendMsg, setreSendMsg] = useState("");

  const [data, setdata] = useState([]);

  function change_type() {
    console.log("vdvdavdevdvf", bid, type, page);
    setload(true);
    axios
      .get(
        `http://localhost:7500/batchwise_mails?batchid=${bid}&type=${type}&page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setdata(res.data.data);
        settotalpages(res.data.totalPages);
        settotalobject(res.data.totalObjects);
        console.log(data);
        setload(false);
      })
      .catch((err) => {
        console.log(err);
        setload(false);
      });
  }

  useEffect(() => {
    change_type();
  }, [type, page, limit]);

  //////////////////sse///////////////////////////////////
  const [sseStarted, setSseStarted] = useState(false);

  let sse;

  const startSse = () => {
    if (!sseStarted) {
      setSseStarted(true);
      sse = new EventSource(
        `http://localhost:7500/batch_bulk_mailing/${bid}?type=${type}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      sse.addEventListener("message", ({ data }) => {
        console.log(data);
        setreSendMsg(data);
      });
    }
  };

  const stopSse = () => {
    if (sseStarted) {
      sse?.close();
      setSseStarted(false);
      console.log(sseStarted);
      sse = null;
    }
  };

  return (
    <Box>
      <Box>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={load}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
      <Box display={"flex"} justifyContent={"center"}>
        <Box
          sx={{ cursor: "pointer" }}
          color={type == "UPLOADED" ? "black" : "white"}
          bgcolor={type == "UPLOADED" ? "#f4bbce" : "#69dcfe"}
          p={"0.5rem"}
          px={"1.5rem"}
          borderRadius={"0.2rem"}
          m={"0.5rem"}
          onClick={() => settype("UPLOADED")}>
          UPLOADED
        </Box>
        <Box
          sx={{ cursor: "pointer" }}
          color={type == "DELIVERED" ? "black" : "white"}
          bgcolor={type == "DELIVERED" ? "#f4bbce" : "#69dcfe"}
          p={"0.5rem"}
          px={"1.5rem"}
          borderRadius={"0.2rem"}
          m={"0.5rem"}
          onClick={() => settype("DELIVERED")}>
          DELIVERED
        </Box>
        <Box
          sx={{ cursor: "pointer" }}
          color={type == "FAILED" ? "black" : "white"}
          bgcolor={type == "FAILED" ? "#f4bbce" : "#69dcfe"}
          p={"0.5rem"}
          px={"1.5rem"}
          borderRadius={"0.2rem"}
          m={"0.5rem"}
          onClick={() => settype("FAILED")}>
          FAILED
        </Box>
        <Box
          sx={{ cursor: "pointer" }}
          color={type == "OPENED" ? "black" : "white"}
          bgcolor={type == "OPENED" ? "#f4bbce" : "#69dcfe"}
          p={"0.5rem"}
          px={"1.5rem"}
          borderRadius={"0.2rem"}
          m={"0.5rem"}
          onClick={() => settype("OPENED")}>
          OPENED
        </Box>
      </Box>
      <Box>
        <Box width={"fit-content"} m={"auto"} fontSize={"1.5rem"}>
          Total Mails {totalmails}
        </Box>
        <Box width={"fit-content"} m={"auto"} fontSize={"1.5rem"}>
          {type} MAILS-{totalobject}
        </Box>

        {(type == "FAILED" || type == "UPLOADED") &&
          !sseStarted &&
          data &&
          data.length != 0 && (
            <Box
              width={"fit-content"}
              padding={" 0.5rem 1rem"}
              borderRadius={"0.2rem"}
              m={"auto"}
              sx={{ cursor: "pointer" }}
              bgcolor={"red"}
              color={"white"}
              onClick={() => startSse()}>
              Send All
            </Box>
          )}

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={sseStarted}>
          <Box>
            <Box fontSize={"2rem"} m={"1rem"} textAlign={"center"}>
              {reSendMsg?.split(" ")?.map((res) => (
                <Box>{res}</Box>
              ))}
            </Box>
            {sseStarted && (
              <Box
                width={"fit-content"}
                padding={" 0.5rem 1rem"}
                borderRadius={"0.2rem"}
                m={"auto"}
                sx={{ cursor: "pointer" }}
                bgcolor={"red"}
                color={"white"}
                onClick={stopSse}>
                Stop SSE
              </Box>
            )}
          </Box>
        </Backdrop>

        <Box p={"1rem"}>
          {data &&
            data.length != 0 &&
            data.map((ele) => {
              return <MailCard type={type} ele={ele} />;
            })}
        </Box>

        <PaginationComp page={page} totalpages={totalpages} setpage={setpage} />
      </Box>
    </Box>
  );
};

export default Campaigns;
