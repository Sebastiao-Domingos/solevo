import { CaminhaoData } from "@/services/caminhao/CaminhaoService";
import { ViagemData } from "@/services/viagem/ViagemService";


class ViagemController {
    private static readonly url = "/api/viagem"

    /**
     * adicionar
     */
    public async adicionar( viagem : ViagemData) {
        
        const data = await fetch( ViagemController.url , {
            method : "POST",
            body : JSON.stringify(viagem),
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
     public async atualizar( viagem : ViagemData) {
        
        const data = await fetch(ViagemController.url , {
            method : "PUT",
            body : JSON.stringify(viagem),
        }).then(res => res)

        const json = data.json();

        if(!data.ok){
            throw new Error("Erro ao atualizar")
        }

        return json;
    }

    /**
     * eliminar
     */
    public async eliminar(id : number) {

        const data = await fetch( `${ViagemController.url}` , {
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
        
        const response = await fetch(ViagemController.url).then(res => res.json())
        
        const json:ViagemData[] = await response
    
        return json
    }
}


export {ViagemController}