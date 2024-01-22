"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho" , "Agosto" , "Setembro"];

const faker = {
  datatype: {
    number: ({ min = 0, max = 1000 }) => {
      return Math.floor(Math.random() * max) + min;
    },
  },
};

const data = {
  labels,
  datasets: [
    {
      label: "Viagem",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgb(245, 158 ,11 , .5)",
    },
    {
      label: "Caminhão",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 25, 0.5)",
    },
  ],
};

export function Vertical() {
  return <Bar className="w-full" options={options} data={data} />;
}
