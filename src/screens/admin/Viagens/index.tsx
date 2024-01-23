"use client"

import Header from "@/components/Headers/Header";
import { Edit } from "./Edit";
import { Register } from "./Register";
import Table, { TBody, THead } from "@/components/Table/Table";
import { useActionViagem, useGetViagens } from "@/hooks/useViagem";
import { DeleteModal } from "@/components/Modals/DeleteModal";
import { StatesType } from "@/components/State/StateComponent";
import { useActionMotorista } from "@/hooks/useMotorista";
import { useState } from "react";

function Viagens() {

    const {data , result} = useGetViagens();
    const {mutationDelete} = useActionViagem()
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
            icon="ri-driver-line"
            title="Viagens"
        >
            <Register />
        </Header>
       
        <div className="mt-6">
            { result.isSuccess && (
                <Table>
                    <THead>
                        <td className="py-5 pl-2">Origim</td>
                        <td className="py-4">Destino</td>
                        <td className="py-4">Data de Saida</td>
                        <td className="py-4">Data de Chegada</td>
                        <td className="py-4" colSpan={2}>Kilometragem</td>
                    </THead>
                    <TBody>
                    { Array.isArray(data) && data?.map( viagem => (
                        <tr key={viagem.id} className="border-b border-slate-300/10 last:border-none hover:bg-amber-600/10">
                            <td className="py-4 pl-2">{viagem.origem}</td>
                            <td className="py-4">{viagem.destino}</td>
                            <td className="py-4">{viagem.data_inicio}</td>
                            <td className="py-4">{viagem.data_fim}</td>
                            <td className="py-4">{viagem.kilometragem}</td>
                            <td className="py-4 flex justify-end items-center gap-8 pr-4">
                                <Edit viagem={viagem} />
                                <DeleteModal 
                                    handleDelete={() => handleData(viagem.id!)}
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

export default Viagens;


