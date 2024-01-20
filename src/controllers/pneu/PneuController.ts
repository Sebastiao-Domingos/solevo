import { PneuData } from "@/services/pneu/PneuService";
import axios from "axios";


class PneuController {
    private static readonly url = "/api/pneu"

    /**
     * adicionar
     */
    public async adicionar( pneu : PneuData) {
        
        const data = await fetch( PneuController.url , {
            method : "POST",
            body : JSON.stringify(pneu),
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
    public async atualizar( pneu : PneuData) {
        
        const data = await fetch(PneuController.url , {
            method : "PUT",
            body : JSON.stringify(pneu),
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

        const data = await fetch( `${PneuController.url}` , {
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
        
        const response = await fetch(PneuController.url).then(res => res.json())
        
        const json:PneuData[] = await response
    
        return json
    }
}


export {PneuController}