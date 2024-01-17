"use client"

import Header from "@/components/Headers/Header";
import { useGetCaminhoes } from "@/hooks/useCaminhao";
import { useEffect } from "react";
import { Edit } from "./Edit";
import { Register } from "./Register";
import Table, { TBody, THead } from "@/components/Table/Table";

function Caminhoes() {

    const {data , result} = useGetCaminhoes();
    useEffect(()=>{
        console.log(data);
        
    },[data])
    return ( <div>
        
        <Header 
            icon="ri-car-line"
            title="Caminhões"
        >
            <Register />
        </Header>
       
        <div className="mt-6">
            { result.isSuccess && (
                <Table>
                    <THead>
                        <td className="py-5 pl-2">Nome</td>
                        <td className="py-4">Marca</td>
                        <td className="py-4">Kilometragem</td>
                        <td className="py-4">Ano de fabricação</td>
                        <td className="py-4"></td>
                    </THead>
                    <TBody>
                    { data?.map( caminhao => (
                        <tr key={caminhao.id} className="border-b border-slate-300/10 last:border-none hover:bg-amber-600/10">
                            <td className="py-4 pl-2">{caminhao.nome}</td>
                            <td className="py-4">{caminhao.marca}</td>
                            <td className="py-4">{caminhao.km_rodado}</td>
                            <td className="py-4">{caminhao.ano_fabricacao}</td>
                            <td className="space-x-8">
                                <Edit caminhao={caminhao} />
                                <button><i className="ri-delete-bin-line text-red-500"></i></button>
                            </td>
                        </tr>
                    ))}
                    </TBody>
                </Table>
            )}
            { result.isLoading &&
                <div className="w-full justify-center">
                    <p className="text-slate-400 italic text-center">Carregando...</p>
                </div>
            }
        </div>
    </div> );
}

export default Caminhoes;


