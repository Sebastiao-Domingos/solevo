import { api } from "@/infra/api"
import axios from "axios"


export type AdminData ={
    id? : number
    email :string 
    name  :string
    senha :string
}
  



class AdminService {
    private static readonly BASE_URL = "/administrador"
    /**
     * crate
     */
    public async crate( admin : AdminData) {
        const response = await api
        .post<{},{data:AdminData}>(AdminService.BASE_URL, admin)
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
        const response = await api.get<{},{data:AdminData[]}>(AdminService.BASE_URL)
        .then( res => res.data)

        return {
            status : 200,
            response
        }
    }
    /**
     * update
     */
   
     public async update(data :AdminData) {
        data.id = Number(data.id)
        const response  = await api.put<{},{data  : AdminData }>(`${AdminService.BASE_URL}/${data.id}`, data)
        .then( res => res.data);

        return {
            status : 200,
            response
        }
    }

    /**
     * delete
     */
    public async delete(id : number) {
        
        const response = await api.delete<{},{data : AdminData}>(`${AdminService.BASE_URL}/${id}`)
        .then( res => res.data);

        return {
            status : 200, response
        }
    }
}


export default AdminService