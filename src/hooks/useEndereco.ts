import { EnderecoController } from "@/controllers/endereco/EnderecoController";
import { useMutation, useQuery, useQueryClient } from "react-query";


const controller = new EnderecoController();

function useGetEndereco(){

    const {data , ...result} = useQuery({
        queryKey : ["enderencos"],
        queryFn : controller.listar
    })

    return {
        result , data
    }

}

function useActionEndereco(){
    const query = useQueryClient();
    
    const mutationUpdate = useMutation({
        mutationFn: controller.atualizar,
        mutationKey :["enderencos"],
        onSuccess(){
            query.invalidateQueries({queryKey:["enderencos"]})
        }
    })
    const mutationCreate = useMutation({
        mutationFn: controller.adicionar,
        mutationKey :["enderencos"],
        onSuccess(){
            query.invalidateQueries({queryKey:["enderencos"]})
        }
    })
    const mutationDelete = useMutation({
        mutationFn: controller.eliminar,
        mutationKey :["enderencos"],
        onSuccess(){
            query.invalidateQueries({queryKey:["enderencos"]})
        }
    })


    return {mutationCreate , mutationUpdate , mutationDelete}
}


export {useGetEndereco , useActionEndereco  }