import { RegisterModal } from "@/components/Modals/RegisterModal";
import StateComponent, { StatesType } from "@/components/State/StateComponent";
import { useGetCaminhoes } from "@/hooks/useCaminhao";
import { useActionPneu } from "@/hooks/usePneu";
import { PneuData } from "@/services/pneu/PneuService";
import { useState } from "react";
import { useForm } from "react-hook-form";


function Register() {  
    const { data:caminhoes , result:resultCaminhoes } = useGetCaminhoes();
    const [states , setStates ] =useState<StatesType>({
        isLoading : false, isSuccess : false , isError : false
    })
    const {register, handleSubmit } = useForm<PneuData>();
    const {mutationCreate} = useActionPneu()

    const handleData = (data : PneuData)=>{
        
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
        { resultCaminhoes.isSuccess && (
            <form action="" className="space-y-3" onSubmit={handleSubmit(handleData)}>
                <div className="flex flex-col gap-1">
                    <label htmlFor="caminhao">Selecionar o caminhão</label>
                    <select  id="caminhao" className="p-2 rounded border border-amber-600/30 focus:border-amber-600/60 outline-none"
                        {...register("caminhao_id" , {required : true})}
                        placeholder="Caminhões"
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
                    <button type="submit" className="py-3 px-8 rounded shadow bg-amber-600 text-white">Adicionar</button>
                    <StateComponent 
                        states={states!}
                    />
                </div>
            </form>
        )}
    </RegisterModal>;
}

export {Register};