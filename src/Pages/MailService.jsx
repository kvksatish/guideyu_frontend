import { Backdrop, Box, CircularProgress, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { AddComment } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PaginationComp from "../Components/PaginationComp";

const MailService = () => {
  let navigate = useNavigate();
  let token = sessionStorage.getItem("token");

  const [bdata, setbdata] = useState([]);
  const [page, setpage] = useState(1);
  const [totalpages, settotalpages] = useState(1);

  const [load, setload] = useState(false);

  function batchs_fetcher() {
    setload(true);
    axios
      .get(`https://guideyu-backend.vercel.app/all_batchs_info?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setbdata(res.data.batchInfo);
        console.log(res, "fhfrhrfs");
        settotalpages(res.data.totalPages);
        setload(false);
      })
      .catch((err) => {
        console.log(err, "dhsdgfhb");
        setload(false);
      });
  }

  useEffect(() => {
    batchs_fetcher();
  }, [page]);

  const handlePageChange = (event, value) => {
    console.log(value);
    setpage(value);
  };

  return (
    <>
      <Box>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={load}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
      <Box>
        <Box
          width={"80%"}
          onClick={() => navigate("createcamp")}
          sx={{ cursor: "pointer" }}
          m={"auto"}
          mt={"1rem"}
          p={"0.5rem"}
          fontSize={"1.5rem"}
          bgcolor={"#78c0e1"}
          color={"white"}
          borderRadius={"0.3rem"}>
          <Box
            m={"auto"}
            display={"flex"}
            width={"18rem"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            textAlign={"center"}>
            Create a Campaign
            <AddComment />
          </Box>
        </Box>

        <Box margin={"auto"} mt={"1rem"} width={"90%"} p={"1rem"}>
          {bdata &&
            bdata.length != 0 &&
            bdata.map((ele, index) => {
              return (
                <Box
                  m={"1rem"}
                  onClick={() =>
                    navigate(`campaigns/UPLOADED`, {
                      state: { bid: ele.batchid, count: ele.totalmails },
                    })
                  }
                  sx={{ cursor: "pointer" }}
                  bgcolor={"#e3c4f3"}
                  borderRadius={"0.3rem"}
                  display={"flex"}
                  flexWrap={"wrap"}
                  fontSize={"1.2rem"}
                  key={ele.batchid}>
                  <Box p={"0.5rem"}>Campaign {index + 1}</Box>
                  <Box p={"0.5rem"}>{ele.batchid}</Box>
                  <Box p={"0.5rem"}>Mails {ele.totalmails}</Box>
                  <Box p={"0.5rem"}>
                    {new Date(ele.uploadtime).toLocaleString()}
                  </Box>
                </Box>
              );
            })}
        </Box>
        {/* <Pagination
          count={totalpages}
          page={page}
          onChange={handlePageChange}
        /> */}
        <PaginationComp page={page} setpage={setpage} totalpages={totalpages} />
      </Box>
    </>
  );
};

export default MailService;
