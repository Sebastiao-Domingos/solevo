"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "Viagens",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
      hoverOffset: 8,
    },
  ],
};


const mesesCores = [
  {
    provincia : "Janeiro" , cor : "bg-blue-200"
  },
  {
    provincia : "Fevereiro" , cor : "bg-pink-200"
  },
  {
    provincia : "Março" , cor : "bg-green-200"
  },
  {
    provincia : "Abril" , cor : "bg-red-200"
  },
  {
    provincia : "Junho" , cor : "bg-pink-300"
  },
]

export function Donut() {
  return (
    <div className="flex justify-between rounded shadow p-4 mt-4 min-h-[20rem]">
      <div className="w-2/3 pr-2">
        <h4 className="mb-4 font-bold text-sm">Detalhes</h4>
        <ul className="flex flex-wrap gap-2">
          {mesesCores
            .map((mes, idx) => (
              <li
                className={`p-2 shadow rounded w-[100px] text-center cursor-default ${mes.cor}`}
                key={idx}
              >
                {mes.provincia}
              </li>
            ))}
        </ul>
      </div>
      <div className="w-1/3">
        <Doughnut data={data} />
      </div>
    </div>
  );
}
