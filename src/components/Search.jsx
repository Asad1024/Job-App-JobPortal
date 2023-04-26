import { Box, MenuItem, Select, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    boxShadow: "0px 1px 5px rgba(0,0,0,0.1)",
    borderRadius: "5px",
    "& > *": {
      flex: 1,
      height: "45px",
      margin: "8px",
    },
  },
});

const Search = (props) => {
  const classes = useStyles();
  const [jobSearch, setJobSearch] = useState({
    type: "Full time",
    location: "Remote",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setJobSearch((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(jobSearch);

  const handleJobs = () => {
    props.fetchCustomJobs(jobSearch.type, jobSearch.location);
  };

  return (
    <Box p={2} mt={2} mb={2} className={classes.wrapper}>
      <Select
        onChange={handleChange}
        value={jobSearch.type}
        name="type"
        disableUnderline
        defaultValue="Full time"
      >
        <MenuItem value="Full time">Full time</MenuItem>
        <MenuItem value="Part time">Part time</MenuItem>
        <MenuItem value="Contract">Contract</MenuItem>
      </Select>
      <Select
        onChange={handleChange}
        value={jobSearch.location}
        name="location"
        disableUnderline
        defaultValue="Remote"
      >
        <MenuItem value="Remote">Remote</MenuItem>
        <MenuItem value="In-office">In-office</MenuItem>
      </Select>
      <Button onClick={handleJobs} variant="contained" color="primary">
        Search
      </Button>
    </Box>
  );
};

export default Search;
