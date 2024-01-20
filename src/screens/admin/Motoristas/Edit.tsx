"use client"
import { EditModal } from "@/components/Modals/EditModal";
import StateComponent, { StatesType } from "@/components/State/StateComponent";
import { useActionMotorista } from "@/hooks/useMotorista";
import { MotoristaData } from "@/services/motorista/MotoristaService";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as AlertDialog from '@radix-ui/react-alert-dialog';



function Edit( {motorista} : {motorista : MotoristaData}) {  
    
    const {register, handleSubmit } = useForm<MotoristaData>({
        defaultValues : {
            nome : motorista.nome,
            numero_carta_conducao : motorista.numero_carta_conducao, 
            telefone : motorista.telefone,
            id  : motorista.id
        }
    });
    const {mutationUpdate} = useActionMotorista()
    const [states , setStates ] =useState<StatesType>({
        isLoading : false, isSuccess : false , isError : false
    })
    
    const handleData = (data : MotoristaData)=>{
        data.id = motorista.id;
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
                <input type="number" {...register("id") } className="hidden" />
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" placeholder="Nome do motorista" 
                    className="p-2 rounded border border-amber-600/30 focus:border-amber-600/60 outline-none"
                    {...register("nome" , {required : true})}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="email">Numero da carta</label>
                <input type="text" id="email" placeholder="Carta de condução" 
                    className="p-2 rounded border border-amber-600/30 focus:border-amber-600/60 outline-none"
                    {...register("numero_carta_conducao" , {required : true})}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="senha">Telefone</label>
                <input type="text" id="senha"  placeholder="Telefone"
                    className="p-2 rounded border border-amber-600/30 focus:border-amber-600/60 outline-none"
                    {...register("telefone" , { required : true})}
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