import { EditModal } from "@/components/Modals/EditModal";
import StateComponent, { StatesType } from "@/components/State/StateComponent";
import { useActionCaminhao } from "@/hooks/useCaminhao";
import { CaminhaoData } from "@/services/caminhao/CaminhaoService";
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useState } from "react";
import { useForm } from "react-hook-form";


function Edit( {caminhao} : {caminhao : CaminhaoData}) {  
    const {register, handleSubmit } = useForm<CaminhaoData>({
        defaultValues : {
            ano_fabricacao : caminhao.ano_fabricacao,
            km_rodado : caminhao.km_rodado,
            marca : caminhao.marca,
            nome : caminhao.nome,
            id : caminhao.id
        }
    });
    const {mutationUpdate} = useActionCaminhao()
    const [states , setStates ] =useState<StatesType>({
        isLoading : false, isSuccess : false , isError : false
    })

    const handleData = (data : CaminhaoData)=>{
        data.id = caminhao.id
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
        title="Atualizar caminhão"
        btnText=""
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