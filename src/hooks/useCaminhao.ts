import { CaminhaoController } from "@/controllers/caminhao/CaminhaoController";
import { useMutation, useQuery, useQueryClient } from "react-query";


const controller = new CaminhaoController();

function useGetCaminhoes(){

    const {data , ...result} = useQuery({
        queryKey : ["caminhoes"],
        queryFn : controller.listar
    })

    return {
        result , data
    }

}
function useGetCaminhaoById(id : number){

    const {data , ...result} = useQuery({
        queryKey : ["caminhoes"],
        queryFn : () => controller.obterById(id)
    })

    return {
        result , data
    }

}

// function useActionCaminhao(){
//     const query = useQueryClient();
    
//     const mutationUpdate = useMutation({
//         mutationFn: controller.atualizar,
//         mutationKey :["caminhao"],
//         onSuccess(){
//             query.invalidateQueries({queryKey:["caminhao"]})
//         }
//     })
//     const mutationCreate = useMutation({
//         mutationFn: controller.adicionar,
//         mutationKey :["caminhao"],
//         onSuccess(){
//             query.invalidateQueries({queryKey:["caminhao"]})
//         }
//     })


//     return {mutationCreate , mutationUpdate}
// }

function useActionCaminhao(){
    const query = useQueryClient();
    
    const mutationUpdate = useMutation({
        mutationFn: controller.atualizar,
        mutationKey :["caminhoes"],
        onSuccess(){
            query.invalidateQueries({queryKey:["caminhoes"]})
        }
    })
    const mutationCreate = useMutation({
        mutationFn: controller.adicionar,
        mutationKey :["caminhoes"],
        onSuccess(){
            query.invalidateQueries({queryKey:["caminhoes"]})
        }
    })
    const mutationDelete = useMutation({
        mutationFn: controller.eliminar,
        mutationKey :["caminhoes"],
        onSuccess(){
            query.invalidateQueries({queryKey:["caminhoes"]})
        }
    })


    return {mutationCreate , mutationUpdate , mutationDelete}
}


export {useGetCaminhoes, useActionCaminhao, useGetCaminhaoById }