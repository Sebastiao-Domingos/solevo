import React, { HTMLAttributes } from "react";
import { Donut, Vertical } from "./Graphics";
import { twMerge } from "tailwind-merge";

const amounts = [
  {
    title: "Total Motoristas",
    icon: "ri-bell-line",
    amount: 12,
    borderCor: "border-l-amber-500 ",
  },
  {
    title: "Total Caminhões",
    icon: "ri-bell-line",
    amount: 12,
    borderCor: "border-l-blue-500 ",
  },
  {
    title: "Total Pneus",
    icon: "ri-bell-line",
    amount: 90,
    borderCor: "border-l-green-500 ",
  },
  {
    title: "Total de viagens",
    icon: "ri-bell-line",
    amount: 10,
    borderCor: "border-l-amber-300",
  },
];

const provincias = [
    "Luanda" , "Bengo" , "Benguela", "Huambo" , "Huila" ,"Uíge", "Lunda Norte" , "Lunda Sul", "Moxico","Kuando Kubango", "Zaire"
]

function Home() {
  return (
    <div className="mb-8">
      <div
        className={
          "flex flex-row items-center gap-6 overflow-x-auto pb-1 pl-1 mb-8"
        }
      >
        {amounts.map((item, index) => (
          <TotalItem key={index} amountData={item} className={item.borderCor} />
        ))}
      </div>
      <div className="space-y-10">
        <div>
          <h3 className="text-xl font-bold">Vendas de Produtos</h3>
          <div className="w-full max-h-[680px] flex justify-center rounded shadow p-4 mt-4">
            <Vertical />
          </div>
        </div>
        <div className="w-full flex justify-between gap-8">
          <div className="w-3/4 h-[20rem]">
            <h3 className="text-xl font-bold">Viagens por mês</h3>
            <Donut />
          </div>
          <div className="w-1/4">
            <h3 className="text-xl font-bold">Viagens por províncias</h3>
            <div className="rounded shadow p-4 mt-4 max-h-[20rem] overflow-auto py-8">
              <ul className="space-y-2">
                {provincias
                  .map((provincia, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between border-b last:border-b-0 py-1 cursor-default"
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="inline-block w-4 h-4 rounded bg-primary"
                          style={{ opacity: 1 - idx / 10 }}
                        ></span>
                        {provincia}
                      </span>
                      10
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;


export interface AmountData {
    title: string;
    icon?: string;
    amount?: number | string;
    borderCor?: string;
  }
  
  interface ItemProps extends HTMLAttributes<HTMLDivElement> {
    amountData: AmountData;
  }
  
  function TotalItem({ amountData, className, ...others }: ItemProps) {
    return (
      <div
        className={twMerge(
          "flex flex-row items-start min-w-[12rem] w-1/4 border-l-4 /border-l-red-500 shadow rounded p-4",
          className
        )}
        {...others}
      >
        <i className={`${amountData.icon} text-primary mr-2`}></i>
        <div className="space-y-3">
          <h4>{amountData.title}</h4>
          <span className="text-xl font-bold">{amountData.amount}</span>
        </div>
      </div>
    );
  }