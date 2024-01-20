import { AdminData } from "@/services/users/AdminService"
import axios from "axios";


class AdminController {
    private static readonly URL = "/api/administrador"

    /**
     * adicionar
     */
    public async adicionar( motorista : AdminData) {
        
        const data = await fetch( AdminController.URL , {
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
    public async atualizar( admin : AdminData) {
        console.log("controller motorista : ", admin);
        
        const data = await fetch( AdminController.URL , {
            method : "PUT",
            body : JSON.stringify(admin),
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

        const data = await fetch( `${AdminController.URL}` , {
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
        
        const response = await fetch(AdminController.URL).then(res => res.json())
        
        const json:AdminData[] = await response
    
        return json
    }
}


// class AdminController {
//     private readonly url = "/api/administrador"

//     /**
//      * adicionar
//      */
//     public async adicionar( adimin : AdminData) {
        
//         const data = await axios.post(`http://localhost:3333/administrador` , adimin).then(res => res)

//         return data.data;
//     }

//     /**
//      * atualizar
//      */
//     public async atualizar( adimin : AdminData) {
        
//         const data = await axios.put(`http://localhost:3333/administrador/${adimin.id!}` , adimin).then(res => res)
//         return data.data;
//     }

//     /**
//      * eliminar
//      */
//     public async eliminar(id : number) {
//         const data = await axios.delete(`http://localhost:3333/administrador/${id}`).then(res => res)
//         return data.data;
//     }
//     /**
//      * obter
//      */
//     public async listar() {
        
//         console.log("Estou aqui");
//         const response = await fetch('/api/administrador').then(res => res.json())

        
//         const json:AdminData[] = await response
    
//         return json
//     }
// }



export {AdminController}