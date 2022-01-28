import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DataChart from "./DataChart";
import { Skeleton } from "@mui/material";
import { blue } from "@mui/material/colors";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function ChartTabs(props) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    let params = event.target.innerText.toLowerCase();
    props.setParamindex(params);
    if (props.data) {
      let data = {
        date: props.value.toISOString().split("T")[0],
        parameter: params,
        location: props.data.id,
      };
      props.getChartList(data);
    }
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      {props.data !== null && (
        <>
          <AppBar position="static" color="inherit">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              {props.data.parameters.map((e, index) => {
                return <Tab label={e.parameter} {...a11yProps(index)} />;
              })}
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            {props.data.parameters.map((e, index) => {
              return (
                <TabPanel value={value} index={index} dir={theme.direction}>
                  {/* <DataChart data={e} /> */}
                  {props.chartdata.listloading ? (
                    <>
                      <Skeleton variant="text" />
                      <Skeleton
                        variant="rectangular"                        
                        height={200}
                      />
                        <Skeleton variant="text" />
                    </>
                  ) : (
                    <>
                    {props.chartdata.chart.results.length>0?(
                       <DataChart data={e} chartdata={props.chartdata.chart} />
                    ):(
                      <Box sx={{paddingY:10}} style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                         <Typography variant='subtitle'>
                        No Data Available on this Date <b sx={{fontColor:`${blue[500]}`}}>{props.value.toISOString().split('T')[0]}</b>  
                      </Typography>
                         <Typography variant='caption'>
                         Try Searching on different Date 
                      </Typography>
                      </Box>
                     
                    )}
                    </>
                   
                  )}
                </TabPanel>
              );
            })}
          </SwipeableViews>
        </>
      )}
    </Box>
  );
}
