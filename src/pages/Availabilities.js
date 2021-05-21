import React from 'react';
import DoctorAvailabilities from "../components/DoctorAvailabilities";
import {useDoctorHooks} from '../hooks/DoctorHooks';
import {Grid} from "@material-ui/core";



export default  function Availabilities() {
    const {doctors} = useDoctorHooks()
   
  
    return (
      <Grid container direction="row" spacing={2} justify="flex-start" alignItems="center">
        {doctors.map((doctor, index) => doctor && <DoctorAvailabilities doctor={doctor} key={index}/>)}
      </Grid>)
}
