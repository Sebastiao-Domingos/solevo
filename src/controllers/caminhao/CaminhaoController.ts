import { CaminhaoData } from "@/services/caminhao/CaminhaoService";
import { AdminData } from "@/services/users/AdminService"
import axios from "axios";


class CaminhaoController {
    private static readonly url = "/api/caminhao"

    /**
     * adicionar
     */
    public async adicionar( caminhao : CaminhaoData) {
        
        caminhao.km_rodado = Number(caminhao.km_rodado)
        
        const data = await fetch(`http://localhost:3333/caminhao` , {
            method : "POST",
            body : JSON.stringify(caminhao)
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
        
        const data = await axios.put(`${CaminhaoController.url}/${caminhao.id!}` , caminhao).then(res => res)
        return data.data;
    }

    /**
     * eliminar
     */
    public async eliminar(id : number) {
        const data = await axios.delete(`${CaminhaoController.url}/${id}`).then(res => res)
        return data.data;
    }
    /**
     * obter
     */
    public async listar() {
        
        const response = await fetch(CaminhaoController.url).then(res => res.json())
        
        const json:CaminhaoData[] = await response
    
        return json
    }
}


export {CaminhaoController}