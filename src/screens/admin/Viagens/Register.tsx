import { RegisterModal } from "@/components/Modals/RegisterModal";
import StateComponent, { StatesType } from "@/components/State/StateComponent";
import { useGetCaminhoes } from "@/hooks/useCaminhao";
import { useActionMotorista, useGetMotoristas } from "@/hooks/useMotorista";
import { useActionViagem } from "@/hooks/useViagem";
import { MotoristaData } from "@/services/motorista/MotoristaService";
import { ViagemData } from "@/services/viagem/ViagemService";
import { useState } from "react";
import { useForm } from "react-hook-form";


function Register() {  
    const {data : motoristas, result : resultMotoristas} = useGetMotoristas();
    const { data : caminhoes , result  : resultCaminhoes} = useGetCaminhoes();
    const [states , setStates ] =useState<StatesType>({
        isLoading : false, isSuccess : false , isError : false
    })
    const {register, handleSubmit } = useForm<ViagemData>();
    const {mutationCreate} = useActionViagem()

    const handleData = (data : ViagemData)=>{
        
        setStates({...states , isLoading:true});
        mutationCreate.mutate( data , {
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
    
    return <RegisterModal
        title="Adicionar motorista"
        btnIcon="ri-user-add-line"
        btnText="Adiconar"
    >
        { resultCaminhoes.isSuccess && resultMotoristas.isSuccess && (
            <form action="" className="space-y-3 max-h-[400px] overflow-auto" onSubmit={handleSubmit(handleData)}>
                <div className="flex flex-col gap-1">
                    <label htmlFor="motorista">Seleciona o motorista</label>
                    <select {...register("motorista_id")} id="motorista"
                        className="p-2 rounded border border-amber-600/30 focus:border-amber-600/60 outline-none"
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

                <div className="pt-4 sticky bottom-0 left-0 py-3 bg-white">
                    <button type="submit" className="py-3 px-8 rounded shadow bg-amber-600 text-white">Adicionar</button>
                    <div className="pr-8">
                        <StateComponent 
                            states={states!}
                        />
                    </div>
                </div>
            </form>
        )}

        {resultCaminhoes.isLoading && resultMotoristas.isLoading &&
            <div className="w-full justify-center">
                <p className="text-slate-400 italic text-center">Carregando...</p>
            </div>
        }

    </RegisterModal>;
}

export {Register};