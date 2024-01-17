import { api } from "@/infra/api"
import axios from "axios"


export type CaminhaoData ={
    id? : number
    nome  :        string,
    ano_fabricacao : string,
    km_rodado    :  number,
    marca     :     string
}

export type CaminhaoDataResponse = CaminhaoData & {
    pneus : []
}

class CaminhaoService {
    private static readonly BASE_URL = "/caminhao"
    /**
     * crate
     */
    public async create( caminhao : CaminhaoData) {
        console.log("Service : ",caminhao);
        
        const response = await api
        .post<{},{data:CaminhaoData}>(CaminhaoService.BASE_URL, caminhao)
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
        const response = await api.get<{},{data:CaminhaoData[]}>(CaminhaoService.BASE_URL)
        .then( res => res.data)

        return {
            status : 200,
            response
        }
    }
    /**
     * getById
     */
    public async getById(id : number) {
        const response = await api.get<{},{data:CaminhaoDataResponse}>(`${CaminhaoService.BASE_URL}/${id}`)
        .then( res => res.data)

        return {
            status : 200,
            response
        }
    }
}


export default CaminhaoService