"use client"

import Header from "@/components/Headers/Header";
import { useActionCaminhao, useGetCaminhoes } from "@/hooks/useCaminhao";
import { useEffect, useState } from "react";
import { Edit } from "./Edit";
import { Register } from "./Register";
import Table, { TBody, THead } from "@/components/Table/Table";
import { StatesType } from "@/components/State/StateComponent";
import { DeleteModal } from "@/components/Modals/DeleteModal";
import Link from "next/link";

function Caminhoes() {

    const {data , result} = useGetCaminhoes();

    const {mutationDelete} = useActionCaminhao()
    const [states , setStates ] =useState<StatesType>({
        isLoading : false, isSuccess : false , isError : false
    })
    
    const handleData = ( id : number)=>{
        
        setStates({...states , isLoading:true});
        mutationDelete.mutate( id, {
            onSuccess(){
                setStates({...states , isLoading : false , isSuccess : true})
            },
            onError(){
                setStates({...states , isError : true , isLoading : false})
            },
            onSettled(){
                setTimeout(() => {
                    setStates({...states , isError : false , isLoading : false , isSuccess : false})
                }, 4000);
            }
        })
    }
    return ( <div>
        
        <Header 
            icon="ri-car-line"
            title="Caminhões"
        >
            <Register />
        </Header>
       
        <div className="mt-6">
            { result.isSuccess && data && (
                <Table>
                    <THead>
                        <td className="py-5 pl-2">Nome</td>
                        <td className="py-4">Marca</td>
                        <td className="py-4">Kilometragem</td>
                        <td className="py-4">Ano de fabricação</td>
                        <td className="py-4"></td>
                    </THead>
                    <TBody>
                    {data &&  data?.map( caminhao => (
                        <tr key={caminhao.id} className="border-b border-slate-300/10 last:border-none hover:bg-amber-600/10">
                            <td className="py-4 pl-2">
                                <Link  href={`/dashboard/caminhoes/${caminhao.id}`}>{caminhao.nome}</Link>
                            </td>
                            <td className="py-4">
                                <Link  href={`/dashboard/caminhoes/${caminhao.id}`}>{caminhao.marca}</Link>
                            </td>
                            <td className="py-4">
                                <Link  href={`/dashboard/caminhoes/${caminhao.id}`}>{caminhao.km_rodado}</Link>
                            </td>
                            <td className="py-4">{caminhao.ano_fabricacao}</td>
                            <td className="space-x-8">
                                <Edit caminhao={caminhao} />
                                <DeleteModal 
                                    handleDelete={() => handleData(caminhao.id!)}
                                    status={states}                                    
                                />
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


