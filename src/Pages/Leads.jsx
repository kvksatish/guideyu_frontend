import { Backdrop, Box, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MailCard from "../Components/MailCard";
import PaginationComp from "../Components/PaginationComp";

const Leads = () => {
  let token = sessionStorage.getItem("token");
  const location = useLocation();
  const bid = location?.state?.bid;
  const totalmails = location?.state?.count;
  console.log(bid);

  const [totalobject, settotalobject] = useState();

  const [type, settype] = useState("LEAD");
  const [page, setpage] = useState();
  const [limit, setlimit] = useState();
  const [totalpages, settotalpages] = useState();

  const [load, setload] = useState(false);

  const [reSendMsg, setreSendMsg] = useState("");

  const [data, setdata] = useState([]);

  function change_type() {
    console.log("first");
    setload(true);
    axios
      .get(
        `http://localhost:7500/batchwise_mails?type=${type}&page=${page}&limit=${limit}`,
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

  console.log(data);
  useEffect(() => {
    change_type();
  }, [type, page, limit]);

  return (
    <>
      <Box p={"1rem"}>
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
              color={type == "INTRESTED" ? "black" : "white"}
              bgcolor={type == "INTRESTED" ? "#f4bbce" : "#69dcfe"}
              p={"0.5rem"}
              px={"1.5rem"}
              borderRadius={"0.2rem"}
              m={"0.5rem"}
              onClick={() => settype("INTRESTED")}>
              INTRESTED
            </Box>
            <Box
              sx={{ cursor: "pointer" }}
              color={type == "NOT INTRESTED" ? "black" : "white"}
              bgcolor={type == "NOT INTRESTED" ? "#f4bbce" : "#69dcfe"}
              p={"0.5rem"}
              px={"1.5rem"}
              borderRadius={"0.2rem"}
              m={"0.5rem"}
              onClick={() => settype("NOT INTRESTED")}>
              NOT INTRESTED
            </Box>
            <Box
              sx={{ cursor: "pointer" }}
              color={type == "LATER" ? "black" : "white"}
              bgcolor={type == "LATER" ? "#f4bbce" : "#69dcfe"}
              p={"0.5rem"}
              px={"1.5rem"}
              borderRadius={"0.2rem"}
              m={"0.5rem"}
              onClick={() => settype("LATER")}>
              LATER
            </Box>
            <Box
              sx={{ cursor: "pointer" }}
              color={type == "OTHER REQUIREMENT" ? "black" : "white"}
              bgcolor={type == "OTHER REQUIREMENT" ? "#f4bbce" : "#69dcfe"}
              p={"0.5rem"}
              px={"1.5rem"}
              borderRadius={"0.2rem"}
              m={"0.5rem"}
              onClick={() => settype("OTHER REQUIREMENT")}>
              OTHER REQUIREMENT
            </Box>
          </Box>
          <Box>
            <Box width={"fit-content"} m={"auto"} fontSize={"1.5rem"}>
              Total Mails {totalmails}
            </Box>
            <Box width={"fit-content"} m={"auto"} fontSize={"1.5rem"}>
              {type} MAILS-{totalobject}
            </Box>

            {/* <Backdrop
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
            </Backdrop> */}
            <Box p={"1rem"}>
              {data &&
                data.length != 0 &&
                data.map((ele) => {
                  return <MailCard type={type} ele={ele} />;
                })}
            </Box>
            <PaginationComp
              page={page}
              totalpages={totalpages}
              setpage={setpage}
            />
          </Box>
        </Box>
        {data &&
          data.length != 0 &&
          data.map((ele) => {
            return <MailCard type={type} ele={ele} />;
          })}
      </Box>

      <PaginationComp page={page} totalpages={totalpages} setpage={setpage} />
    </>
  );
};

export default Leads;
