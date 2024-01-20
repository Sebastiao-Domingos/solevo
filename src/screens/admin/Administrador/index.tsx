"use client"
import Header from "@/components/Headers/Header";
import { useActionAdmin, useGetAdmin } from "@/hooks/useAdmin";
import { Register } from "./Register";
import { Edit } from "./Edit";
import { DeleteModal } from "@/components/Modals/DeleteModal";
import { StatesType } from "@/components/State/StateComponent";
import { useState } from "react";


function Administradores() {
    const {data , result} = useGetAdmin();
    
    const {mutationDelete} = useActionAdmin()
    const [states , setStates ] =useState<StatesType>({
        isLoading : false, isSuccess : false , isError : false
    })
    
    const handleData = ( id : number)=>{
        
        setStates({...states , isLoading:true});
        mutationDelete.mutate( id, {
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
    return (  
        <div>
            <Header 
                icon="ri-user-line"
                title="Administrador"
            >
                <Register />
            </Header>
           
           <div className="pt-8">
                {result.isSuccess && 
                    <ul className="space-y-4">
                        {data?.map( (admin ) =>(
                            <li key={admin.id} className="flex justify-between items-center p-4 border-b last:border-b-0">
                                <span className="space-x-10">
                                    <span><i className="ri-user-line"></i></span>
                                    <button>
                                        <span>{admin.name}</span>
                                    </button>
                                    <button>
                                        <span>{admin.email}</span>
                                    </button>
                                </span>
                                <span className="space-x-8">
                                    <Edit admin={admin} />
                                    <DeleteModal 
                                        handleDelete={() => handleData(admin.id!)}
                                        status={states}                                    
                                    />
                                </span>
                            </li>
                        ))}
                    </ul>
                }
                { result.isLoading &&
                    <div className="w-full justify-center">
                        <p className="text-slate-400 italic">Carregando...</p>
                    </div>
                }
           </div>
        </div>
    );
}

export default Administradores;