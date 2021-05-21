import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import dayjs from "dayjs";
import Grid from "@material-ui/core/Grid";
import { AlertTitle } from '@material-ui/lab';
// import {useDoctorHooks} from "../hooks/DoctorHooks"

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function Bookings() {
  const params = new URLSearchParams(window.location.search);
  const reservation = JSON.parse(atob(params.get("reservation")));
  // Si on avait les même Id à chaque appel de l'API, j'aurai utilisé ce hook commenté en bas ( Quand je fait deux appels de suite à L'API on reçoit deux set d'élément différents )
  // const {doctor} = useDoctorHooks()
  const doctor = JSON.parse(atob(params.get("doctor")));
  return (
    <Grid container justify="center" alignItems="center" direction="column">
      <h5>Your Booking has been succesfull:</h5>
      <Grid item>
        <Alert severity="success">
          {`Scheduled on : ${dayjs(reservation.date).format("MMM. DD, YYYY")} at ${dayjs(reservation.date).format("HH:mm")}`}
        </Alert>
        <Alert severity="info"> <AlertTitle>Doctor :</AlertTitle>{doctor && doctor.name}</Alert>
        <Alert severity="info"><AlertTitle>Address</AlertTitle>{`${`${doctor.address.line1} ${doctor.address.line2} ${doctor.address.city},${doctor.address.country}`}`}</Alert>
        <Alert severity="info"><AlertTitle>Created on :</AlertTitle>{`${dayjs(
          reservation.createdAt
        ).format("MMM. DD, YYYY  HH:mm")}`}</Alert>
      </Grid>
    </Grid>
  );
}
