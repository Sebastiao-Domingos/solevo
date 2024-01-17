import { api } from "@/infra/api"
import axios from "axios"


export type AdminData ={
    id? : number
    email :string 
    name  :string
    senha :string
}
  



class AdminService {

    /**
     * crate
     */
    public async crate( admin : AdminData) {
        const response = await api
        .post<{},{data:AdminData}>("/administrador", admin)
        .then( res => res.data);
        
        return {
            status : 200,
            response
        }
    }

    /**
     * get
     */
    public async get() {
        const response = await api.get<{},{data:AdminData[]}>("/administrador")
        .then( res => res.data)

        return {
            status : 200,
            response
        }
    }
    /**
     * update
     */
    public async update(data : AdminData) {
        const response = await api.put<{},{data:AdminData}>(`/administrador/${data.id!}`, data)
        .then( res => res.data)

        return {
            status : 200,
            response
        }
    }
}


export default AdminService