import { RegisterModal } from "@/components/Modals/RegisterModal";
import StateComponent, { StatesType } from "@/components/State/StateComponent";
import { useActionMotorista } from "@/hooks/useMotorista";
import { MotoristaData } from "@/services/motorista/MotoristaService";
import { useState } from "react";
import { useForm } from "react-hook-form";


function Register() {  
    const [states , setStates ] =useState<StatesType>({
        isLoading : false, isSuccess : false , isError : false
    })
    const {register, handleSubmit } = useForm<MotoristaData>();
    const {mutationCreate} = useActionMotorista()

    const handleData = (data : MotoristaData)=>{
        
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
        <form action="" className="space-y-3" onSubmit={handleSubmit(handleData)}>
            <div className="flex flex-col gap-1">
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" placeholder="Nome" 
                    className="p-2 rounded border border-amber-600/30 focus:border-amber-600/60 outline-none"
                    {...register("nome" , {required : true})}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="marca">Número da carta</label>
                <input type="text" id="marca" placeholder="Número da carta" 
                    className="p-2 rounded border border-amber-600/30 focus:border-amber-600/60 outline-none"
                    {...register("numero_carta_conducao" , {required : true})}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="ano">Telefone</label>
                <input type="text" id="ano"  placeholder="Telefone"
                    className="p-2 rounded border border-amber-600/30 focus:border-amber-600/60 outline-none"
                    {...register("telefone" , { required : true})}
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