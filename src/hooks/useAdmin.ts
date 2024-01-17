import { AdminController } from "@/controllers/users/AdminController";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";


const controller = new AdminController();

function useGetAdmin(){

    const {data , ...result} = useQuery({
        queryKey : ["administrador"],
        queryFn : controller.listar
    })

    return {
        result , data
    }

}

function useActionAdmin(){
    const query = useQueryClient();
    
    const mutationUpdate = useMutation({
        mutationFn: controller.atualizar,
        mutationKey :["administrador"],
        onSuccess(){
            query.invalidateQueries({queryKey:["administrador"]})
        }
    })
    const mutationCreate = useMutation({
        mutationFn: controller.adicionar,
        mutationKey :["administrador"],
        onSuccess(){
            query.invalidateQueries({queryKey:["administrador"]})
        }
    })


    return {mutationCreate , mutationUpdate}
}


export {useGetAdmin , useActionAdmin}