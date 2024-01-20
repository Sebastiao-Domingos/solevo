import { CaminhaoController } from "@/controllers/caminhao/CaminhaoController";
import { PneuController } from "@/controllers/pneu/PneuController";
import { useMutation, useQuery, useQueryClient } from "react-query";


const controller = new PneuController();

function useGetPneus(){

    const {data , ...result} = useQuery({
        queryKey : ["pneus"],
        queryFn : controller.listar
    })

    return {
        result , data
    }

}

function useActionPneu(){
    const query = useQueryClient();
    
    const mutationUpdate = useMutation({
        mutationFn: controller.atualizar,
        mutationKey :["pneus"],
        onSuccess(){
            query.invalidateQueries({queryKey:["pneus"]})
        }
    })
    const mutationCreate = useMutation({
        mutationFn: controller.adicionar,
        mutationKey :["pneus"],
        onSuccess(){
            query.invalidateQueries({queryKey:["pneus"]})
        }
    })
    const mutationDelete = useMutation({
        mutationFn: controller.eliminar,
        mutationKey :["pneus"],
        onSuccess(){
            query.invalidateQueries({queryKey:["pneus"]})
        }
    })


    return {mutationCreate , mutationUpdate , mutationDelete}
}


export {useGetPneus, useActionPneu }