"use client"
import Header from "@/components/Headers/Header";
import { Edit } from "./Edit";
import { Register } from "./Register";
import Table, { TBody, THead } from "@/components/Table/Table";
import { useActionPneu, useGetPneus } from "@/hooks/usePneu";
import { DeleteModal } from "@/components/Modals/DeleteModal";
import { StatesType } from "@/components/State/StateComponent";
import { useState } from "react";

function Pneus() {
    const {data , result} = useGetPneus();
    const {mutationDelete} = useActionPneu()
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
                }, 5000);
            }
        })
    }
    return ( <div>
        <Header 
            icon="ri-driver-line"
            title="Pneus"
        >
            <Register />
        </Header>
       
        <div className="mt-6">
            { result.isSuccess && (
                <Table>
                    <THead>
                        <td className="py-5 pl-2">Marca</td>
                        <td className="py-4">Duração</td>
                        <td className="py-4"></td>
                        <td className="py-4"></td>
                        <td className="py-4"></td>
                    </THead>
                    <TBody>
                    { data?.map( pneu => (
                        <tr key={pneu.id} className="border-b border-slate-300/10 last:border-none hover:bg-amber-600/10">
                            <td className="py-4 pl-2">{pneu.marca}</td>
                            <td className="py-4">{pneu.durancao}</td>
                            <td className="py-4"></td>
                            <td className="py-4"></td>
                            <td className="py-4 flex justify-end gap-8 pr-2">
                                <Edit pneu={pneu} />
                                <DeleteModal 
                                    handleDelete={() => handleData(pneu.id!)}
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

export default Pneus;


