import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  DialogActions,
  IconButton,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  info: {
    "& > *": {
      margin: "5px !important",
    },
  },
  skillChip: {
    margin: "10px !important",
    padding: theme.spacing(0.75),
    fontSize: "14.5px",
    borderRadius: "5px",
    fontWeight: 600,
    cursor: "pointer",
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
  },
}));

const ViewJobModal = (props) => {
  const classes = useStyles();
  return (
    <Dialog open={!!Object.keys(props.job).length} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {props.job.title} & {props.job.companyName}
          <IconButton onClick={props.closeViewModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption">Posted on:</Typography>
            <Typography variant="body2">
              {props.job.postedOn &&
                format(props.job.postedOn, "dd/MMM/yyyy HH:MM")}
            </Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption">Job Type:</Typography>
            <Typography variant="body2">{props.job.type}</Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption">Job Location:</Typography>
            <Typography variant="body2">{props.job.location}</Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption">Job Description:</Typography>
            <Typography variant="body2">{props.job.description}</Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption">Company Name:</Typography>
            <Typography variant="body2">{props.job.companyName}</Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption">Company Website:</Typography>
            <Typography variant="body2">{props.job.companyUrl}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="caption">Skills:</Typography>
            <Grid container alignItems="center">
              {props.job.skills &&
                props.job.skills.map((skill) => (
                  <Grid key={skill} className={classes.skillChip} item>
                    {skill}
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          component="a"
          href={props.job.link}
          target="_blank"
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewJobModal;
