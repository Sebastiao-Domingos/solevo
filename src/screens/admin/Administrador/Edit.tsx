import { EditModal } from "@/components/Modals/EditModal";
import StateComponent, { StatesType } from "@/components/State/StateComponent";
import { useActionAdmin } from "@/hooks/useAdmin";
import { AdminData } from "@/services/users/AdminService";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as AlertDialog from '@radix-ui/react-alert-dialog';


function Edit( {admin} : {admin : AdminData}) {  
    const {register, handleSubmit } = useForm<AdminData>({
        defaultValues : {
            name : admin.name, email : admin.email, senha : admin.senha
        }
    });
    const {mutationUpdate} = useActionAdmin()
    const [states , setStates ] =useState<StatesType>({
        isLoading : false, isSuccess : false , isError : false
    })

    const handleData = (data : AdminData)=>{
        data.id = Number(admin.id);
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
        title="Atualizar administrador"
        btnText=""
    >
        <form action="" className="space-y-3" onSubmit={handleSubmit(handleData)}>
            <div className="flex flex-col gap-1">
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" placeholder="Nome do administrador" 
                    className="p-2 rounded border border-amber-600/30 focus:border-amber-600/60 outline-none"
                    {...register("name" , {required : true})}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input type="emial" id="email" placeholder="Email do Administrador" 
                    className="p-2 rounded border border-amber-600/30 focus:border-amber-600/60 outline-none"
                    {...register("email" , {required : true})}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="senha">Senha</label>
                <input type="password" id="senha"  placeholder="Senha do Administrador"
                    className="p-2 rounded border border-amber-600/30 focus:border-amber-600/60 outline-none"
                    {...register("senha" , { required : true})}
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