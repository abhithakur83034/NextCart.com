"use client"
import { useEffect, useState } from "react";
import axios from "axios"; 
import { Chart } from "chart.js";

function ExampleGraph() {
  const [weeklySales, setWeeklySales] = useState([]);
  const [weeklyProfit, setWeeklyProfit] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4500/api/sold")
      .then((res) => {
        const SOLD = res.data.sold;

        const currentDay = new Date();
        const currentDayOfWeek = currentDay.getDay(); // Get the day of the week.

        // Calculate the starting date of the current week (Sunday)
        const startOfWeek = new Date(currentDay);
        startOfWeek.setDate(currentDay.getDate() - currentDayOfWeek);

        const weeklyData = [0, 0, 0, 0, 0, 0, 0];
        const weeklyProfitData = [0, 0, 0, 0, 0, 0, 0];

        SOLD.forEach((item) => {
          const itemDate = new Date(item.date);

          // Check if the item date is within the current week
          if (itemDate >= startOfWeek && itemDate <= currentDay) {
            const dayOfWeek = itemDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
            weeklyData[dayOfWeek] += parseFloat(item.price);
            weeklyProfitData[dayOfWeek] += parseFloat(item.price) * 0.4;
          }
        });

        setWeeklySales(weeklyData);
        setWeeklyProfit(weeklyProfitData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // Create a chart when weeklySales and weeklyProfit states change
    var ctx = document.getElementById('myGraph').getContext('2d');

    // Destroy the existing chart instance (if it exists)
    Chart.getChart(ctx)?.destroy();

    var myGraph = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [{
          data: weeklySales,
          label: "Today Sale",
          borderColor: "rgb(109, 253, 181)",
          backgroundColor: "rgb(109, 253, 181,0.5)",
          borderWidth: 2
        }, {
          data: weeklyProfit,
          label: "Profit",
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgb(75, 192, 192,0.5)",
          borderWidth: 2
        }]
      },
    });
  }, [weeklySales, weeklyProfit]);

  return (
    <div className='graph'>
      <h1>Weekly Sales and Profit</h1>
      <canvas id='myGraph'></canvas>
    </div>
  );
}

export default ExampleGraph;
