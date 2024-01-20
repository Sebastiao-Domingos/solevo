"use client"
import { EditModal } from "@/components/Modals/EditModal";
import StateComponent, { StatesType } from "@/components/State/StateComponent";
import { useGetCaminhoes } from "@/hooks/useCaminhao";
import { useActionPneu } from "@/hooks/usePneu";
import { PneuData } from "@/services/pneu/PneuService";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as AlertDialog from '@radix-ui/react-alert-dialog';



function Edit( {pneu} : {pneu : PneuData}) {  
    const { data : caminhoes , result : resultCaminhoes } = useGetCaminhoes();
    const {register, handleSubmit } = useForm<PneuData>({
        defaultValues : {
            marca : pneu.marca, 
            durancao:pneu.durancao,
            caminhao_id : pneu.caminhao_id
        }
    });
    const {mutationUpdate} = useActionPneu()
    const [states , setStates ] =useState<StatesType>({
        isLoading : false, isSuccess : false , isError : false
    })

    const handleData = (data : PneuData)=>{
        data.id = Number(pneu.id);

        setStates({...states , isLoading:true});
        mutationUpdate.mutate( data , {
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
    
    return <EditModal
        title="Atualizar motorista"
        btnText=""
    >
        <form action="" className="space-y-3" onSubmit={handleSubmit(handleData)}>
            <div className="flex flex-col gap-1">
                <label htmlFor="caminhao">Selecionar o caminhão</label>
                <select  id="caminhao" className="p-2 rounded border border-amber-600/30 focus:border-amber-600/60 outline-none"
                    {...register("caminhao_id" , {required : true})}
                    placeholder="Caminhões"
                    defaultValue={ pneu.caminhao_id}
                >
                    {caminhoes?.map( caminhao => (
                        <option key={caminhao.id} value={caminhao.id}>{caminhao.nome}</option>
                    ))}
                </select>
                </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" placeholder="Nome" 
                    className="p-2 rounded border border-amber-600/30 focus:border-amber-600/60 outline-none"
                    {...register("marca" , {required : true})}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="email">Duração</label>
                <input type="text" id="email" placeholder="Duração" 
                    className="p-2 rounded border border-amber-600/30 focus:border-amber-600/60 outline-none"
                    {...register("durancao" , {required : true})}
                />
            </div>
            <div className="pt-4 relative">
                <div className="space-x-8">
                    <AlertDialog.Cancel className='py-3 px-4 rounded border border-amber-600 text-amber-600 hover:bg-amber-100 active:bg-amber-300'>Manter Dados</AlertDialog.Cancel>
                    <button type="submit" className="py-3 px-8 rounded shadow bg-amber-600 hover:bg-amber-400 active:bg-amber-300 text-white">Salvar</button>
                </div>
                <StateComponent 
                    states={states!}
                />
            </div>
        </form>
    </EditModal>;
}

export {Edit};