import { RegisterModal } from "@/components/Modals/RegisterModal";
import StateComponent, { StatesType } from "@/components/State/StateComponent";
import { useActionAdmin } from "@/hooks/useAdmin";
import { AdminData } from "@/services/users/AdminService";
import { useState } from "react";
import { useForm } from "react-hook-form";


function Register() {  
    const {register, handleSubmit } = useForm<AdminData>();
    const {mutationCreate} = useActionAdmin()
    const [senha , setSenha ] = useState("");
    const [senhaDiferente , setSenhaDiferente ] = useState(false);
    const [states , setStates ] =useState<StatesType>({
        isLoading : false, isSuccess : false , isError : false
    })

    const handleData = (data : AdminData)=>{
        
        if(data.senha === senha){
            setSenhaDiferente(false);
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
        }else {
            setSenhaDiferente(true);
        }
    }
    
    return <RegisterModal
        title="Adicionar administrador"
        btnIcon="ri-user-add-line"
        btnText="Adiconar"
    >
        <p className="text-red-500 italic">{senhaDiferente && "As senhas deve ser iguais!"}</p>
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
            <div className="flex flex-col gap-1">
                <label htmlFor="senha1">Confirmar a senha</label>
                <input type="password" id="senha1"  placeholder="Confirmar a senha do Administrador"
                    className="p-2 rounded border border-amber-600/30 focus:border-amber-600/60 outline-none"
                    required
                    value={senha}
                    onInput={e => setSenha(e.currentTarget.value)}
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