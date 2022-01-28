import React, { useState } from "react";
import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { lightBlue, grey, pink } from "@mui/material/colors";
import { Box } from "@mui/system";
import moment from "moment";
import DatewiseData from "./DatewiseData";
const LocationDetails = (props) => {
  const { locationdetails } = props;
  const [chartModal, setChartModal] = useState(false);
  const[data,setData]=useState(null)
  const changeDateformat = (e) => {
    let newDate2 = moment(e).format("MMM Do, YYYY hh:mm A ");
    return newDate2;
  };
  const closechartModal = () => {
    setChartModal(false);
    setData(null)
  };
  const openChartData = () => {
    setChartModal(true);
    setData(locationdetails[0])
  };
  return (
    <>
      <Paper sx={{ padding: 3, bgcolor: `${lightBlue[500]}` }}>
        <Grid container spacing={3} sx={{alignItems:'center'}}>
          <Grid item md={6} sx={{ textAlign: "left" }}>
            <Typography color="white" variant="h4">
              {locationdetails[0].name}
            </Typography>
            <Typography color="white" variant="h6">
              {locationdetails[0].city} , {locationdetails[0].country}
            </Typography>
          </Grid>
          <Grid item md={6} sx={{ textAlign: "right", paddingY: "auto" }}>
            <Button
            disableElevation
            size='lg'
              onClick={() => {
                openChartData();
              }}
              variant="contained"
              color="secondary"
            >
              Date Wise Data
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Box sx={{ padding: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4}>
            <Paper
              variant="outlined"
              sx={{ padding: 2, bgcolor: `${pink[50]}`, textAlign: "left" }}
            >
              <Typography variant="h6">Details</Typography>
              <Typography sx={{ color: `${pink[500]}` }} variant="h4">
                {locationdetails[0].measurements}
              </Typography>
              <Typography variant="button">Measurements</Typography>
              <Divider sx={{ marginY: 2 }} />
              <Typography
                sx={{ color: `${grey[600]}` }}
                variant="caption"
                display="block"
                gutterBottom
              >
                Co-ordinates
              </Typography>
              <Typography
                sx={{ color: `${grey[600]}` }}
                variant="caption"
                display="block"
                gutterBottom
              >
                {locationdetails[0].coordinates.latitude} ,{" "}
                {locationdetails[0].coordinates.longitude}
              </Typography>
            </Paper>
          </Grid>
          {locationdetails[0].parameters.map((val, index) => {
            return (
              <Grid item xs={12} lg={4}>
                <Paper
                  variant="outlined"
                  sx={{
                    padding: 2,
                    bgcolor: `${lightBlue[50]}`,
                    textAlign: "left",
                  }}
                >
                  <Typography variant="h6">{val.parameter}</Typography>
                  <Typography color="primary" variant="h4">
                    {val.lastValue}
                  </Typography>
                  <Typography variant="button"> {val.unit}</Typography>
                  <Divider sx={{ marginY: 2 }} />
                  <Typography
                    sx={{ color: `${grey[600]}` }}
                    variant="caption"
                    display="block"
                    gutterBottom
                  >
                    Last Updated
                  </Typography>
                  <Typography
                    sx={{ color: `${grey[600]}` }}
                    variant="caption"
                    display="block"
                    gutterBottom
                  >
                    {changeDateformat(locationdetails[0].lastUpdated)}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <DatewiseData
      data={data}
      chartModal={chartModal}
      closechartModal={closechartModal}
      />
    </>
  );
};

export default LocationDetails;
