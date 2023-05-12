import { Box, Pagination } from "@mui/material";
import React from "react";

const PaginationComp = ({ totalpages, page, setpage }) => {
  const handlePageChange = (event, value) => {
    console.log(value);
    setpage(value);
  };
  return (
    <Box p={"0.5rem"} display={"flex"} justifyContent={"center"}>
      <Pagination count={totalpages} page={page} onChange={handlePageChange} />
    </Box>
  );
};

export default PaginationComp;
