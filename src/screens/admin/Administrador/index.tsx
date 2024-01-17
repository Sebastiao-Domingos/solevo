"use client"
import Header from "@/components/Headers/Header";
import { useGetAdmin } from "@/hooks/useAdmin";
import { Register } from "./Register";
import { Edit } from "./Edit";


function Administradores() {
    const {data , result} = useGetAdmin();
    
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
                                    <button><i className="ri-delete-bin-line text-red-500"></i></button>
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