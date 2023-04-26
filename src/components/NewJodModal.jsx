import {
  Dialog,
  DialogContent,
  DialogTitle,
  FilledInput,
  Grid,
  Select,
  MenuItem,
  Box,
  Typography,
  DialogActions,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config";

const useStyles = makeStyles((theme) => ({
  skillChip: {
    margin: "10px !important",
    padding: theme.spacing(0.75),
    fontSize: "14.5px",
    borderRadius: "5px",
    fontWeight: 600,
    cursor: "pointer",
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,

    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "#fff",
    },
  },
  included: {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
  },
}));

const initiate = {
  title: "",
  type: "Full time",
  companyName: "",
  companyUrl: "",
  location: "Remote",
  link: "",
  description: "",
  skills: [],
};

const NewJodModal = (props) => {
  const [loading, setLoading] = useState(false);
  const [jobDetails, setJobDetails] = useState(initiate);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const skills = [
    "Javascript",
    "React.js",
    "Node.js",
    "Vue",
    "Firebase",
    "MongoDB",
    "SQL",
  ];

  useEffect(() => {
    const isComplete = Object.values(jobDetails).every((val) => Boolean(val));
    setIsFormComplete(isComplete);
  }, [jobDetails]);

  const classes = useStyles();
  const handleChange = (e) => {
    e.preventDefault();
    setJobDetails((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  const addRemoval = (skill) =>
    jobDetails.skills.includes(skill)
      ? setJobDetails((oldState) => ({
          ...oldState,
          skills: oldState.skills.filter((s) => s !== skill),
        }))
      : setJobDetails((oldState) => ({
          ...oldState,
          skills: oldState.skills.concat(skill),
        }));

  console.log(jobDetails);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "jobs"), {
        ...jobDetails,
        postedOn: serverTimestamp(),
      });
      console.log("Job added to Firestore with ID:", docRef.id);

      // Reset the form
      setJobDetails({
        title: "",
        type: "Full time",
        companyName: "",
        companyUrl: "",
        location: "Remote",
        link: "",
        description: "",
        skills: [],
      });

      closeModal();
    } catch (error) {
      console.error("Error adding job to Firestore", error);
    }
    setLoading(false);
  };

  const closeModal = () => {
    setJobDetails(initiate);
    setLoading(false);
    props.closeNewJobModal();
  };
  return (
    <Dialog open={props.newJobModal} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Post Job
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="title"
              value={jobDetails.title}
              autoComplete="off"
              placeholder="Job Title"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              onChange={handleChange}
              name="type"
              value={jobDetails.type}
              fullWidth
              disableUnderline
              defaultValue="Full time"
            >
              <MenuItem value="Full time">Full time</MenuItem>
              <MenuItem value="Part time">Part time</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="companyName"
              value={jobDetails.companyName}
              autoComplete="off"
              placeholder="Company Name"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="companyUrl"
              value={jobDetails.companyUrl}
              autoComplete="off"
              placeholder="Company Url"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              onChange={handleChange}
              name="location"
              value={jobDetails.location}
              fullWidth
              disableUnderline
              defaultValue="Remote"
            >
              <MenuItem value="Remote">Remote</MenuItem>
              <MenuItem value="In-office">In-office</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="link"
              value={jobDetails.link}
              autoComplete="off"
              placeholder="Job Link"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FilledInput
              onChange={handleChange}
              name="description"
              value={jobDetails.description}
              autoComplete="off"
              placeholder="Job Description"
              disableUnderline
              fullWidth
              multiline
              rows={3}
            />
          </Grid>
        </Grid>
        <Box mt={2}>
          <Typography>Skills</Typography>
          <Box display="flex">
            {skills.map((skill) => (
              <Box
                onClick={() => addRemoval(skill)}
                className={`${classes.skillChip} ${
                  jobDetails.skills.includes(skill) && classes.included
                }`}
                key={skill}
              >
                {skill}
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          color="red"
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>*Required fields</Typography>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disableElevation
            color="primary"
            disabled={!isFormComplete || loading}
          >
            {loading ? (
              <CircularProgress color="secondary" size={22} />
            ) : (
              " Post  Job"
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default NewJodModal;
