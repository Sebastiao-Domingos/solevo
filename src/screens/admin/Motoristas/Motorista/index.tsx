"use client"

import { useGetDadosMotorista } from "@/hooks/useMotorista"
import { useRouter } from "next/navigation";
import { HTMLAttributes } from "react";
import { Edit } from "../Edit";

function Motorista({params} : {params : {motorista : number}}){
    const {data , result} = useGetDadosMotorista(params.motorista);
    const navigator = useRouter();
    return (
        <div>
            { result.isSuccess && result.isFetched && (
            <>
                <HeaderDetail 
                    backUrl="/dashboard/motoristas"
                    nome={data?.nome!}
                    icon="ri-user-line"
                >
                    <Edit
                        motorista={{
                            id:data?.id! , 
                            nome : data?.nome! , 
                            numero_carta_conducao : data?.numero_carta_conducao!,
                            telefone : data?.telefone!}}
                    />
                </HeaderDetail>

                <div>
                    <ul className="space-y-2 mt-6">
                        <li className=""> <span className="text-slate-400">Nome : </span> {data?.nome } </li>
                        <li className=""> <span className="text-slate-400">Número da carta de condução : </span> {data?.numero_carta_conducao } </li>
                        <li className=""> <span className="text-slate-400">Número de telefone : </span> {data?.telefone } </li>
                    </ul>

                    <div className="w-full flex gap-4 mt-5">
                        <div className="w-[50%]">
                            <h3 className="text-xl"><span className="text-slate-300 border-r pr-2 mr-3"><i className="ri-map-line"></i></span> <span className="text-amber-500">Endereço</span></h3>
                            { data?.enderenco! && (
                                <div>
                                    {data?.enderenco.map( (endereco , index) => (
                                        <ul key={endereco.id} className="space-y-2 mt-6">
                                            <li className="text-slate-200">{index +1} º </li>
                                            <li className="ml-4"> <span className="text-slate-400">Bairro : </span> {endereco.bairro } </li>
                                            <li className="ml-4"> <span className="text-slate-400">Rua </span> {endereco.rua} </li>
                                        </ul>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="w-[50%]">
                            <h3 className="text-xl"><span className="text-slate-300 border-r pr-2 mr-3"><i className="ri-car-line"></i></span> <span className="text-amber-500">Viagem</span></h3>
                            { data?.viagem && (
                                <div>
                                    {data?.viagem.map( (viagem , index) => (
                                        <ul key={viagem.id} className="space-y-2 mt-6">
                                            <li className="text-slate-200">{index +1} º </li>
                                            <li className="ml-4"> <span className="text-slate-400">Data de Início : </span> {viagem.data_inicio } </li>
                                            <li className="ml-4"> <span className="text-slate-400">Data Final : </span> {viagem.data_fim} </li>
                                            <li className="ml-4"> <span className="text-slate-400">Origem : </span> {viagem.origem } </li>
                                            <li className="ml-4"> <span className="text-slate-400">Destino : </span> {viagem.destino } </li>
                                            <li className="ml-4"> <span className="text-slate-400">Distância da Viagem : </span> {viagem.kilometragem } </li>
                                        </ul>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
            )}

            { result.isLoading &&
                <div className="w-full justify-center">
                    <p className="text-slate-400 italic text-center">Carregando...</p>
                </div>
            }
        </div>
    )
}

interface DetailProps extends HTMLAttributes<HTMLDivElement> {
    nome : string,
    backUrl : string,
    icon? : string
}
export function HeaderDetail({nome , backUrl , icon , children}:DetailProps){
    const navigator = useRouter();
    return (
        <div className="w-full flex justify-between border-b border-amber-100 py-6">
            <div className="flex gap-6 items-center">
                <h2 className="text-2xl"><span className="text-slate-300 border-r pr-2 mr-3"><i className={icon}></i></span> <span className="text-amber-500">{nome}</span></h2>
                <div>
                    {children}
                </div>
            </div>
            <button className="text-xl hover:text-amber-600 active:text-2xl" 
                onClick={() => navigator.push(backUrl)}
            ><i className="ri-close-line"></i></button>
        </div>
    )
}

export default Motorista;