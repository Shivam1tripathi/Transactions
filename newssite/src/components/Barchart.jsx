import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = (props) => {
 

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={props.data} options={options} />;
};

export default BarChart;