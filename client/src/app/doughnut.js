"use client"
import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import "./style/Dash.css";

function Example() {
  const [userData, setUserData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4500/user/registeruser")
      .then((response) => {
        const data = response.data;
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    axios
      .get("http://localhost:4500/product/showproduct")
      .then((response) => {
        const data = response.data;
        setProductData(data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  const userCount = userData.length;
  const productCount = productData.length;

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Users", "Products"],
        datasets: [
          {
            data: [userCount, productCount],
            borderColor: [
              "rgb(75, 192, 192)",
              "rgb(255, 205, 86)",
              "rgb(255, 99, 132)",
              "rgb(255, 83, 175)",
            ],
            backgroundColor: [
              "rgb(75, 192, 192)",
              "rgb(255, 205, 86)",
              "rgb(255, 99, 132)",
              "rgb(255, 83, 175)",
            ],
          },
        ],
      },
      options: {
        responsive: true, 
        maintainAspectRatio: false, 
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const dataset = data.datasets[tooltipItem.datasetIndex];
              const currentValue = dataset.data[tooltipItem.index];
              return `${data.labels[tooltipItem.index]}: ${currentValue}`;
            },
          },
        },
      },
    });

    setChartInstance(myChart);
  }, [productCount, userCount]);

  return (
    <div className="Chart" style={{display:"contents"}}>
      <h1>Our Customers</h1>
      <div className="chart-container">
        <canvas id="myChart"></canvas>
      </div>
    </div>
  );
}

export default Example;
