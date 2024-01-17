import { CaminhaoController } from "@/controllers/caminhao/CaminhaoController";
import { useMutation, useQuery, useQueryClient } from "react-query";


const controller = new CaminhaoController();

function useGetCaminhoes(){

    const {data , ...result} = useQuery({
        queryKey : ["caminhao"],
        queryFn : controller.listar
    })

    return {
        result , data
    }

}

function useActionCaminhao(){
    const query = useQueryClient();
    
    const mutationUpdate = useMutation({
        mutationFn: controller.atualizar,
        mutationKey :["caminhao"],
        onSuccess(){
            query.invalidateQueries({queryKey:["caminhao"]})
        }
    })
    const mutationCreate = useMutation({
        mutationFn: controller.adicionar,
        mutationKey :["caminhao"],
        onSuccess(){
            query.invalidateQueries({queryKey:["caminhao"]})
        }
    })


    return {mutationCreate , mutationUpdate}
}


export {useGetCaminhoes, useActionCaminhao }