import { Button, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { connect } from "react-redux";
import {
  getLocationList,
  getCityList,
  getCountryList,
  getLocationDetails,
} from "../../redux/location/actions";

const convertToOptions = (countries) => {
  return countries.map((country) => ({
    label: country.name,
    value: country.code,
  }));
};
const ConvertCities = (cities) => {
  return cities.map((city) => ({
    label: city.city,
    value: city.city,
  }));
};
const ConvertLocations = (locations) => {
  return locations.map((location) => ({
    label: location.name,
    value: location.id,
  }));
};
const LocationSelector = (props) => {
  const [countries, setCountries] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [locations, setLocations] = React.useState([]);

  useEffect(() => {
    if (props.location && !props.location.country) {
      props.getCountryList();
    }
  }, []);
  useEffect(() => {
    if (props.location && props.location.country) {
      console.log("country");
      setCountries(convertToOptions(props.location.country.results));
    }
  }, [props.location.country]);
  useEffect(() => {
    if (props.location && props.location.city) {
      console.log("city");
      setCities(ConvertCities(props.location.city.results));
    }
  }, [props.location.city]);
  useEffect(() => {
    if (props.location && props.location.location) {
      console.log("location");
      setLocations(ConvertLocations(props.location.location.results));
    }
  }, [props.location.location]);

  const handleCountryChange = (value) => {
    if (value !== null) {
      props.getCityList({ data: value.value });
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (value) => {
    if (value !== null) {
      props.getLocationList({ data: value.value });
    } else {
      setLocations([]);
    }
  };
  const handleLocationChange = (value) => {
    if (value !== null) {
      props.getLocationDetails({ data: value.value });
    } else {
      setLocations([]);
    }
  };

  return (
    <>
      <Paper elevation={3} sx={{ padding: 5, marginBottom: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={6} sx={{ textAlign: "left" }}>
            <Typography variant="h6">Search Location</Typography>
          </Grid>
          {cities.length > 0 && (
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setCities([]);
                  setLocations([]);
                }}
              >
                Reset
              </Button>
            </Grid>
          )}
        </Grid>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          onChange={(event, value) => {
            handleCountryChange(value);
            setCities([]);
            setLocations([]);
          }}
          options={countries}
          sx={{ width: "100%", marginY: 5 }}
          renderInput={(params) => (
            <TextField {...params} label="Search Country" />
          )}
        />
        {cities.length > 0 && (
          <Autocomplete
            id="combo-box-demo-2"
            onChange={(event, value) => {
              handleCityChange(value);
              setLocations([]);
            }}
            options={cities}
            sx={{ width: "100%", marginY: 5 }}
            renderInput={(params) => (
              <TextField {...params} label="Search your City" />
            )}
          />
        )}
        {locations.length > 0 && (
          <Autocomplete
            id="combo-box-demo-2"
            onChange={(event, value) => {
              handleLocationChange(value);
            }}
            options={locations}
            sx={{ width: "100%", marginY: 5 }}
            renderInput={(params) => (
              <TextField {...params} label="Search your Location" />
            )}
          />
        )}
      </Paper>
      <Paper elevation={3} sx={{ padding: 5, marginBottom: 3 }}></Paper>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    location: state.Location,
  };
};
export default connect(mapStateToProps, {
  getCountryList,
  getLocationList,
  getCityList,
  getLocationDetails,
})(LocationSelector);
