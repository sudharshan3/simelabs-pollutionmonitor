import * as React from "react";
import {
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
  Container,
  Skeleton,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import ChartTabs from "./ChartTabs";
import { connect } from "react-redux";
import { getChartList } from "../../redux/chart/actions";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DatewiseData = (props) => {
  const [value, setValue] = React.useState(new Date());
  const[paramindex,setParamindex]=React.useState('')
  React.useEffect(() => {
    if (props.data && props.chart) {
      let data = {
        date: value.toISOString().split('T')[0],
        parameter:props.data.parameters[0].parameter,
        location:props.data.id
      };
      props.getChartList(data);
    }
  }, [props.data]);
  React.useEffect(() => {
    if (props.data && props.chart && props.chart.chart) {
      let data = {
        date: value.toISOString().split('T')[0],
        parameter:paramindex || props.data.parameters[0].parameter,
        location:props.data.id
      };
      props.getChartList(data);
    }
  }, [value]);
  return (
    <div>
      <Dialog
        fullScreen
        open={props.chartModal}
        onClose={() => {
          props.closechartModal();
        }}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Datewise Data
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => {
                props.closechartModal();
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container>
          <Paper variant="outlined" sx={{ marginY: 3, padding: 3 }}>
            <Grid
              container
              spacing={2}
              sx={{ width: "100%", height: "100%", alignItems: "center" }}
            >
              <Grid item lg={6}>
                <Typography variant="h6" sx={{ marginY: "auto" }}>
                  Select Date
                </Typography>
              </Grid>
              <Grid item lg={6} sx={{ width: "100%", height: "100%" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    sx={{ marginY: "auto", width: "100%" }}
                    label="Basic example"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Paper>
      
          {props.chart && (
                  <Paper variant="outlined" sx={{ marginY: 3 }}>
                  <ChartTabs chartdata={props.chart} data={props.data} value={value} getChartList={props.getChartList}  setParamindex={setParamindex}/>
                </Paper>
          )}
    
        </Container>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    chart: state.Chart,
  };
};
export default connect(mapStateToProps, { getChartList })(DatewiseData);
