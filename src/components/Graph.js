import React, { useState, useEffect } from "react";
import "./sass/graph.scss";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

function Graph(props) {
  const [data, setData] = useState({});

  const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

  const buildChartData = (date, casesType) => {
    date = date[casesType];
    const chartDate = [];
    let lastDay = 0;
    for (let day in date) {
      chartDate.push({ x: day, y: date[day] - lastDay });
      lastDay = date[day];
    }
    chartDate.shift();
    return chartDate;
  };

  const fetchData = async () => {
    await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((response) => response.json())
      .then((ans) => {
        const ansData = buildChartData(ans, props.casesType);
        setData(ansData);
      });
  };

  useEffect(() => {
    fetchData();
  }, [props.casesType]);

  return (
    <div className="graph">
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204,16,52,0.5)",
                borderColor: "black",
                data: data,
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default Graph;
