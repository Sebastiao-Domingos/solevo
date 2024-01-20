import { CaminhaoData } from "@/services/caminhao/CaminhaoService";
import { PneuData } from "@/services/pneu/PneuService";
import { ViagemData } from "@/services/viagem/ViagemService";
import axios from "axios";


class EnderecoController {
    private static readonly url = "/api/endereco"

    /**
     * adicionar
     */
    public async adicionar( viagem : ViagemData) {
        
        const data = await fetch( EnderecoController.url , {
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
        
        const data = await axios.put(`${EnderecoController.url}/${viagem.id!}` , viagem).then(res => res)
        return data.data;
    }

    /**
     * eliminar
     */
    public async eliminar(id : number) {
        const data = await axios.delete(`${EnderecoController.url}/${id}`).then(res => res)
        return data.data;
    }
    /**
     * obter
     */
    public async listar() {
        
        const response = await fetch(EnderecoController.url).then(res => res.json())
        
        const json:ViagemData[] = await response
    
        return json
    }
}


export {EnderecoController }