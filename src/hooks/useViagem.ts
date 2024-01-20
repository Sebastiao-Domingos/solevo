import { ViagemController } from "@/controllers/viagem/ViagemController";
import { useMutation, useQuery, useQueryClient } from "react-query";


const controller = new ViagemController();

function useGetViagens(){

    const {data , ...result} = useQuery({
        queryKey : ["viagens"],
        queryFn : controller.listar
    })

    return {
        result , data
    }

}

function useActionViagem(){
    const query = useQueryClient();
    
    const mutationUpdate = useMutation({
        mutationFn: controller.atualizar,
        mutationKey :["viagens"],
        onSuccess(){
            query.invalidateQueries({queryKey:["viagens"]})
        }
    })
    const mutationCreate = useMutation({
        mutationFn: controller.adicionar,
        mutationKey :["viagens"],
        onSuccess(){
            query.invalidateQueries({queryKey:["viagens"]})
        }
    })
    const mutationDelete = useMutation({
        mutationFn: controller.eliminar,
        mutationKey :["viagens"],
        onSuccess(){
            query.invalidateQueries({queryKey:["viagens"]})
        }
    })


    return {mutationCreate , mutationUpdate , mutationDelete}
}


export {useGetViagens, useActionViagem }