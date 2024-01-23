import { MotoristaController } from "@/controllers/motorista/MotoristaController";
import { useMutation, useQuery, useQueryClient } from "react-query";


const controller = new MotoristaController();

function useGetMotoristas( ){
    const {data , ...result} = useQuery({
        queryKey : ["motoristas"],
        queryFn : controller.listar,
    })
    
    return {
        result , data
    }
}

function useGetDadosMotorista( id : number ){
    const {data , ...result} = useQuery({
        queryKey : ["motoristas"],
        queryFn : ()=>controller.obterData(id),
    })
    return {
        result , data
    }
    
}
function useActionMotorista(){
    const query = useQueryClient();
    
    const mutationUpdate = useMutation({
        mutationFn: controller.atualizar,
        mutationKey :["motoristas"],
        onSuccess(){
            query.invalidateQueries({queryKey:["motoristas"]})
        }
    })
    const mutationCreate = useMutation({
        mutationFn: controller.adicionar,
        mutationKey :["motoristas"],
        onSuccess(){
            query.invalidateQueries({queryKey:["motoristas"]})
        }
    })
    const mutationDelete = useMutation({
        mutationFn: controller.eliminar,
        mutationKey :["motoristas"],
        onSuccess(){
            query.invalidateQueries({queryKey:["motoristas"]})
        }
    })


    return {mutationCreate , mutationUpdate , mutationDelete}
}


export {useGetMotoristas, useActionMotorista , useGetDadosMotorista }