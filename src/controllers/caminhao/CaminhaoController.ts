import { CaminhaoData, CaminhaoDataResponse } from "@/services/caminhao/CaminhaoService";
import { AdminData } from "@/services/users/AdminService"
import axios from "axios";


class CaminhaoController {
    private static readonly url = "/api/caminhao"

    /**
     * adicionar
     */
    public async adicionar( caminhao : CaminhaoData) {
        
        caminhao.km_rodado = Number(caminhao.km_rodado)
        
        const data = await fetch( CaminhaoController.url , {
            method : "POST",
            body : JSON.stringify(caminhao),
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
      public async atualizar( caminhao : CaminhaoData) {
        
        const data = await fetch(CaminhaoController.url , {
            method : "PUT",
            body : JSON.stringify(caminhao),
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

        const data = await fetch( `${CaminhaoController.url}` , {
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
    public async listar() : Promise<CaminhaoData[]>{
        
        const response = await fetch(CaminhaoController.url).then(res => res)
        
        const json = await response.json()
        
        if(!response.ok){
            throw new Error("Erro ao pegar dados");
        }
        return json
    }
    /**
     * obter by id
     */
    public async obterById(id : number) : Promise<CaminhaoDataResponse> {
        
        const response = await fetch(`${CaminhaoController.url}?id=${id}`).then(res => res)
        
        const json = await response.json();

        if(!response.ok){
            throw new Error("Erro ao pegar dado do caminhao");
        }
    
        return json
    }
}


export {CaminhaoController}