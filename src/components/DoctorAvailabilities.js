import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Grid, Typography } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import PersonIcon from "@material-ui/icons/Person";
import { useAvailabilities } from "../hooks/DoctorHooks";
import dayjs from "dayjs";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { useBooking } from "../hooks/BookingsHooks";

const useStyles = makeStyles({
  root: {
    maxWidth: 450,
    marginLeft: "20px"

  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function DoctorAvailabilities({ doctor }) {
  const {
    id,
    name,
    address: { city, country, line1, line2 },
  } = doctor;
  const classes = useStyles();
  const { displayedAvailabilities, onLoadMoreClick, loadMore } =
    useAvailabilities(id);
  const { bookingAction, loading } = useBooking(doctor);

  return (
    <Grid item xs={4}>
      <Card className={classes.root}>
        <CardHeader
          avatar={<PersonIcon />}
          title={name}
          subheader={`${line1} ${line2} ${city},${country}`}
        />
        <CardContent>
          <Typography variant="p">Availabilities :</Typography>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {displayedAvailabilities.map(({ start }, index) => (
              <Grid key={`${index}`} item>
                <Button
                  color="primary"
                  onClick={() => bookingAction(start)}
                  className={classes.button}
                  endIcon={<ScheduleIcon />}
                >
                  {loading
                    ? "loading"
                    : dayjs(start).format("MMM. DD, YYYY  HH:mm")}
                </Button>
              </Grid>
            ))}
          </Grid>
        </CardContent>
        <CardActions >
          <Button variant="contained" color="primary" onClick={onLoadMoreClick} size="small">
            {!loadMore ? "Load More" : "Load Less"}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
