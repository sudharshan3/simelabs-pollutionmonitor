// @flow
import { pink } from "@mui/material/colors";
import moment from "moment";
import React from "react";
import Chart from "react-apexcharts";

const DataChart = (props) => {
  var categories = [];
  for (var i = 1; i <= 10; i++) {
    categories.push("Sprint " + i);
  }
  const changeDateformat = (e) => {
    let newDate2 = moment(e).format("hh:mm A");
    return newDate2;
  };
  const arrayMaker = (data) => {
    let newData = data.map((e) => e.average);
    return newData;
  };
  const arrayMakertime = (data) => {
    let newData = data.map((e) => changeDateformat(e.hour));
    return newData;
  };
  const apexOpts = {
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    chart: {
      height: 150,
      type: "bar",
      stacked: true,
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        dataLabels: {
          position: "top", 
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -24,
      style: {
        fontSize: "12px",
        colors: ["#98a6ad"],
      },
    },
    zoom: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    colors: [pink[500]],
    xaxis: {
      categories: arrayMakertime(props.chartdata.results),
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: true,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        inverseColors: !0,
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: void 0,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100],
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  const apexData = [
    {
      name: "Average",
      data: arrayMaker(props.chartdata.results),
    },
  ];

  return (
    <div>
      <h4 className="header-title mb-4">{props.data.displayName}</h4>

      <Chart
        options={apexOpts}
        series={apexData}
        type="bar"
        height={320}
        className="apex-charts mt-2"
      />
    </div>
  );
};

export default DataChart;
