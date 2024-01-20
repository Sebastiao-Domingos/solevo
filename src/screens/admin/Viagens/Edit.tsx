"use client"
import { EditModal } from "@/components/Modals/EditModal";
import StateComponent, { StatesType } from "@/components/State/StateComponent";
import { useGetCaminhoes } from "@/hooks/useCaminhao";
import { useGetMotoristas } from "@/hooks/useMotorista";
import { useActionViagem } from "@/hooks/useViagem";
import { ViagemData } from "@/services/viagem/ViagemService";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as AlertDialog from '@radix-ui/react-alert-dialog';



function Edit( {viagem} : {viagem: ViagemData}) {  
    const {data : motoristas, result : resultMotoristas} = useGetMotoristas();
    const { data : caminhoes , result  : resultCaminhoes} = useGetCaminhoes();
    
    const {register, handleSubmit } = useForm<ViagemData>({
        defaultValues : {
            destino : viagem.destino,
            origem : viagem.origem ,
            data_inicio : viagem.data_inicio ,
            data_fim : viagem.data_fim,
            kilometragem : viagem.kilometragem
        }
    });
    const {mutationUpdate} = useActionViagem()
    const [states , setStates ] =useState<StatesType>({
        isLoading : false, isSuccess : false , isError : false
    })

    const handleData = (data : ViagemData)=>{
        data.id = viagem.id;
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
         { resultCaminhoes.isSuccess && resultMotoristas.isSuccess && (
            <form action="" className="space-y-3 max-h-[400px] overflow-auto" onSubmit={handleSubmit(handleData)}>
                <div className="flex flex-col gap-1">
                    <label htmlFor="motorista">Seleciona o motorista</label>
                    <select {...register("motorista_id")} id="motorista"
                        className="p-2 rounded border border-amber-600/30 focus:border-amber-600/60 outline-none"
                        defaultValue={viagem.motorista_id}
                    >
                        { motoristas?.map( motorista => (
                            <option key={motorista.id} value={motorista.id}>{motorista.nome}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="motorista">Seleciona o caminhão</label>
                    <select {...register("caminhao_id")} id="motorista"
                        className="p-2 rounded border border-amber-600/30 focus:border-amber-600/60 outline-none"
                        defaultValue={viagem.caminhao_id}
                    >
                        {caminhoes?.map( caminhao => (
                            <option key={caminhao.id} value={caminhao.id}>{caminhao.nome}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="nome">Origem</label>
                    <input type="text" id="nome" placeholder="Origem" 
                        className="p-2 rounded border border-amber-600/30 focus:border-amber-600/60 outline-none"
                        {...register("origem" , {required : true})}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email">Destino</label>
                    <input type="text" id="email" placeholder="Destino" 
                        className="p-2 rounded border border-amber-600/30 focus:border-amber-600/60 outline-none"
                        {...register("destino" , {required : true})}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="saida">Data de saida</label>
                    <input type="text" id="saida"  placeholder="Data de saida"
                        className="p-2 rounded border border-amber-600/30 focus:border-amber-600/60 outline-none"
                        {...register("data_inicio" , { required : true})}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="chegada">Data de chegada</label>
                    <input type="text" id="chegada"  placeholder="Data de chegada"
                        className="p-2 rounded border border-amber-600/30 focus:border-amber-600/60 outline-none"
                        {...register("data_fim" , { required : true})}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="kilometragem">Distância</label>
                    <input type="text" id="kilometragem"  placeholder="Distância"
                        className="p-2 rounded border border-amber-600/30 focus:border-amber-600/60 outline-none"
                        {...register("kilometragem" , { required : true})}
                    />
                </div>

                <div className="pt-4 sticky bottom-0 left-0 right-0 bg-white">
                    <div className="space-x-8">
                        <AlertDialog.Cancel className='py-3 px-4 rounded border border-amber-600 text-amber-600 hover:bg-amber-100 active:bg-amber-300'>Manter Dados</AlertDialog.Cancel>
                        <button type="submit" className="py-3 px-8 rounded shadow bg-amber-600 hover:bg-amber-400 active:bg-amber-300 text-white">Salvar</button>
                    </div>
                    <div className="pr-8">
                        <StateComponent 
                            states={states!}
                        />
                    </div>
                </div>
            </form>
        )}
    </EditModal>;
}

export {Edit};