import { MotoristaData, MotoristaResponse } from "@/services/motorista/MotoristaService";
import axios from "axios";


class MotoristaController {
    private static readonly url = "/api/motorista"

    /**
     * adicionar
     */
    public async adicionar( motorista : MotoristaData) {
        
        const data = await fetch( MotoristaController.url , {
            method : "POST",
            body : JSON.stringify(motorista),
        }).then(res => res)

        const json = data.json();

        if(!data.ok){
            throw new Error("Erro ao cadastrar")
        }

        return json;
    }

    /**
     * atualizar
     */
    public async atualizar( motorista : MotoristaData) {
        console.log("controller motorista : ", motorista);
        
        const data = await fetch( MotoristaController.url , {
            method : "PUT",
            body : JSON.stringify(motorista),
        }).then(res => res)

        const json = data.json();

        if(!data.ok){
            throw new Error("Erro ao cadastrar")
        }

        return json;
    }

    /**
     * eliminar
     */
    public async eliminar(id : number) {

        const data = await fetch( `${MotoristaController.url}` , {
            method : "DELETE",
            body : JSON.stringify({id : id })
        }).then(res => res)

        const json = data.json();

        if(!data.ok){
            throw new Error("Erro ao eliminar")
        }

        return json;
    }
    /**
     * obter
     */
    public async listar() {
        
        const response = await fetch(MotoristaController.url).then(res => res.json())
        
        const json:MotoristaData[] = await response
    
        return json
    }

     /**
     * obter
     */
     public async obterData(
        id : number
    ): Promise<MotoristaResponse> {
        
        const response = await fetch(`${MotoristaController.url}/?id=${id}`);
        const data = await response.json();

        if(!response.ok){
            throw new Error(data.error);
        }

        return data;
    }
}


export {MotoristaController }