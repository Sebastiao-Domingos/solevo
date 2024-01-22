"use client"

import { useGetDadosMotorista } from "@/hooks/useMotorista"
import { useRouter } from "next/navigation";
import { Edit } from "../Edit";
import { HeaderDetail } from "../../Motoristas/Motorista";
import { useGetCaminhaoById } from "@/hooks/useCaminhao";

function Caminhao({params} : {params : {caminhao : number}}){
    const {data , result} = useGetCaminhaoById(params.caminhao);
    const navigator = useRouter();
    return (
        <div>
            { result.isSuccess && result.isFetched && (
            <>
                <HeaderDetail 
                    backUrl="/dashboard/caminhoes"
                    nome={data?.nome!}
                    icon="ri-user-line"
                >
                    <Edit
                        caminhao={{
                            id:data?.id! , 
                            nome : data?.nome! , 
                            ano_fabricacao : data?.ano_fabricacao!,
                            km_rodado : data?.km_rodado!,
                            marca : data?.marca!
                        }}
                    />
                </HeaderDetail>

                <div>
                    <ul className="space-y-2 mt-6">
                        <li className=""> <span className="text-slate-400">Nome : </span> {data?.nome } </li>
                        <li className=""> <span className="text-slate-400">Marca : </span> {data?.marca } </li>
                        <li className=""> <span className="text-slate-400">Data de fabricação : </span> {data?.ano_fabricacao } </li>
                        <li className=""> <span className="text-slate-400">Kilometragem : </span> {data?.km_rodado } </li>
                    </ul>

                    <div className="w-full flex gap-4 mt-5">
                        <div className="w-[50%]">
                            <h3 className="text-xl"><span className="text-slate-300 border-r pr-2 mr-3"><i className="ri-map-line"></i></span> <span className="text-amber-500">Endereço</span></h3>
                            { data?.pneu! && (
                                <div>
                                    {data && data?.pneu.map( (pneu , index) => (
                                        <ul key={pneu.id} className="space-y-2 mt-6">
                                            <li className="text-slate-200">{index +1} º </li>
                                            <li className="ml-4"> <span className="text-slate-400">Marca : </span> {pneu.marca } </li>
                                            <li className="ml-4"> <span className="text-slate-400">Duração </span> {pneu.durancao} </li>
                                        </ul>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="w-[50%]">
                            <h3 className="text-xl"><span className="text-slate-300 border-r pr-2 mr-3"><i className="ri-car-line"></i></span> <span className="text-amber-500">Viagem</span></h3>
                            { data && data?.viagem && (
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

export default Caminhao;