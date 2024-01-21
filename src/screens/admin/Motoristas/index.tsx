"use client"

import Header from "@/components/Headers/Header";
import { Edit } from "./Edit";
import { Register } from "./Register";
import Table, { TBody, THead } from "@/components/Table/Table";
import { useActionMotorista, useGetMotoristas } from "@/hooks/useMotorista";
import { DeleteModal } from "@/components/Modals/DeleteModal";
import { useState } from "react";
import { StatesType } from "@/components/State/StateComponent";
import Link from "next/link";

function Motoristas() {

    const {data , result} = useGetMotoristas();

    const {mutationDelete} = useActionMotorista()
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
            title="Motoristas"
        >
            <Register />
        </Header>
       
        <div className="mt-6">
            { result.isSuccess && (
                <Table>
                    <THead>
                        <td className="py-5 pl-2">Nome</td>
                        <td className="py-4">Número de carta</td>
                        <td className="py-4">Telefone</td>
                        <td className="py-4"></td>
                        <td className="py-4"></td>
                    </THead>
                    <TBody>
                    { data?.map( motorista => (
                        <tr key={motorista.id} className="border-b border-slate-300/10 last:border-none hover:bg-amber-600/10">
                            <td className="py-4 pl-2">
                                <Link href={`/dashboard/motoristas/${motorista.id}`} >{motorista.nome}</Link>
                            </td>
                            <td className="py-4">
                                <Link href={`/dashboard/motoristas/${motorista.id}`} >{motorista.numero_carta_conducao}</Link>
                            </td>
                            <td className="py-4">{motorista.telefone}</td>
                            <td className="py-4"></td>
                            <td className="space-x-8">
                                <Edit motorista={motorista} />
                                <DeleteModal 
                                    handleDelete={() => handleData(motorista.id!)}
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

export default Motoristas;


