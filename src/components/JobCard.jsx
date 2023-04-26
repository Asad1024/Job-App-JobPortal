import { Box, Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { differenceInMinutes } from "date-fns";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    border: "1px solid #e8e8e8",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0px 5px 25px rgba(0,0,0,0.1)",
      borderLeft: "6px solid #4D64e4",
      transition: ".3s",
    },
  },

  companyName: {
    fontSize: "13.5px",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(0.75),
    borderRadius: "5px",
    fontWeight: 600,
    display: "inline-block",
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

const JobCard = (props) => {
  const classes = useStyles();
  return (
    <Box p={2} className={classes.wrapper}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography variant="subtitle1">{props.title}</Typography>
          <Typography variant="subtitle1" className={classes.companyName}>
            {props.companyName}
          </Typography>
        </Grid>
        <Grid item container xs>
          {props.skills.map((skill) => (
            <Grid key={skill} className={classes.skillChip} item>
              {skill}
            </Grid>
          ))}
        </Grid>
        <Grid item container xs direction="column" alignItems="flex-end">
          <Grid item>
            <Typography variant="caption">
              {differenceInMinutes(Date.now(), props.postedOn)} min ago |{" "}
              {props.type} | {props.location}
            </Typography>
          </Grid>
          <Grid item>
            <Box mt={2}>
              <Button onClick={props.open} variant="outlined" color="secondary">
                Check
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobCard;
