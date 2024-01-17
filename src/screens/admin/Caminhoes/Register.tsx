import { RegisterModal } from "@/components/Modals/RegisterModal";
import StateComponent, { StatesType } from "@/components/State/StateComponent";
import { useActionAdmin } from "@/hooks/useAdmin";
import { useActionCaminhao } from "@/hooks/useCaminhao";
import { CaminhaoData } from "@/services/caminhao/CaminhaoService";
import { useState } from "react";
import { useForm } from "react-hook-form";


function Register() {  
    const {register, handleSubmit } = useForm<CaminhaoData>();
    const {mutationCreate} = useActionCaminhao()
    const [states , setStates ] =useState<StatesType>({
        isLoading : false, isSuccess : false , isError : false
    })

    const handleData = (data : CaminhaoData)=>{
        
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
        title="Adicionar administrador"
        btnIcon="ri-user-add-line"
        btnText="Adiconar"
    >
        <form action="" className="space-y-3" onSubmit={handleSubmit(handleData)}>
            <div className="flex flex-col gap-1">
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" placeholder="Nome" 
                    className="p-2 rounded border border-amber-600/30 focus:border-amber-600/60 outline-none"
                    {...register("nome" , {required : true})}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="marca">Marca</label>
                <input type="text" id="marca" placeholder="Marca" 
                    className="p-2 rounded border border-amber-600/30 focus:border-amber-600/60 outline-none"
                    {...register("marca" , {required : true})}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="ano">Ano de Fabricação</label>
                <input type="text" id="ano"  placeholder="Ano de fabricação"
                    className="p-2 rounded border border-amber-600/30 focus:border-amber-600/60 outline-none"
                    {...register("ano_fabricacao" , { required : true})}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="kilometragem">Kilometragem</label>
                <input type="number" id="kilometragem"  placeholder="Kilometragem"
                    className="p-2 rounded border border-amber-600/30 focus:border-amber-600/60 outline-none"
                    {...register("km_rodado" , { required : true})}
                />
            </div>
            <div className="pt-4 relative">
                <button type="submit" className="py-3 px-8 rounded shadow bg-amber-600 text-white">Adicionar</button>
                <StateComponent 
                    states={states!}
                />
            </div>
        </form>
    </RegisterModal>;
}

export {Register};