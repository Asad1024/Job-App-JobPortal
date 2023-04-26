import React, { useState, useEffect } from "react";
import Header from "./Header";
import theme from "../theme/theme";
import {
  Box,
  CircularProgress,
  Grid,
  ThemeProvider,
  Typography,
  Button,
} from "@mui/material";
import Search from "./Search";
import JobCard from "./JobCard";
import NewJodModal from "./NewJodModal";
import { db } from "../config";
import { collection, getDocs } from "firebase/firestore";
import CloseIcon from "@mui/icons-material/Close";
import ViewJobModal from "./ViewJobModal";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newJobModal, setNewJobModal] = useState(false);
  const [customSearch, setCustomSearch] = useState(false);
  const [viewJob, setViewJob] = useState({});

  const fetchJobs = async () => {
    setLoading(true);
    const fetchRef = collection(db, "jobs");
    const snapshot = await getDocs(fetchRef);
    const jobsData = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      postedOn: doc.data().postedOn.toDate(),
    }));
    setJobs(jobsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  console.log(jobs);

  const fetchCustomJobs = async (jobType, jobLocation) => {
    setLoading(true);
    setCustomSearch(true);
    const fetchRef = collection(db, "jobs");
    const snapshot = await getDocs(fetchRef);
    const jobsData = snapshot.docs
      .map((doc) => ({
        ...doc.data(),
        id: doc.id,
        postedOn: doc.data().postedOn.toDate(),
      }))
      .filter((job) => {
        if (jobType && job.type !== jobType) return false;
        if (jobLocation && job.location !== jobLocation) return false;
        return true;
      });
    setJobs(jobsData);
    setLoading(false);
  };
  const handleClearCustomSearch = () => {
    setCustomSearch(false);
    fetchJobs();
  };
  const handleViewLatestJobs = () => {
    const element = document.getElementById("latest-jobs");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Header openNewJobModal={() => setNewJobModal(true)} />
      <NewJodModal
        closeNewJobModal={() => setNewJobModal(false)}
        newJobModal={newJobModal}
      />
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZmluZCUyMGpvYnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60")`,
          backgroundSize: "cover",
          backgroundPosition: "50% 50%", // Adjust the values here
          position: "relative",
        }}
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bgcolor="rgba(0, 0, 0, 0.5)"
        />
        <Box textAlign="center" position="relative" zIndex={1}>
          <Typography variant="h4" gutterBottom color="primary">
            Welcome to Our Job Portal
          </Typography>
          <Typography variant="h6" gutterBottom color="white">
            Discover new opportunities
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleViewLatestJobs}
          >
            View Latest Jobs
          </Button>
        </Box>
      </Box>

      <ViewJobModal job={viewJob} closeViewModal={() => setViewJob({})} />
      <Box id="latest-jobs" mb={3}>
        <Grid container justifyContent="center">
          <Grid item xs={10}>
            <Search fetchCustomJobs={fetchCustomJobs} />
            {loading ? (
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            ) : jobs.length > 0 ? (
              <>
                {customSearch && (
                  <Box display="flex" justifyContent="flex-end" my={2}>
                    <Button onClick={handleClearCustomSearch}>
                      <CloseIcon size={22} color="secondary" />
                      <Typography color="secondary">Custom Search</Typography>
                    </Button>
                  </Box>
                )}
                {jobs.map((job) => (
                  <JobCard open={() => setViewJob(job)} key={job.id} {...job} />
                ))}
              </>
            ) : (
              <Box display="flex" justifyContent="center">
                <Typography variant="h6">No jobs found</Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
