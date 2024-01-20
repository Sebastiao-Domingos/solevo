import { api } from "@/infra/api"
import axios from "axios"


export type EnderecoData = {
    id?: number,
    bairro: string,
    rua: string,
    motorista_id: number
}

export type PneuDataResponse = EnderecoData & {
    motorista: {
        id: number,
        nome: string,
        numero_carta_conducao: string,
        telefone: string
    }
}

class EnderecService {
    private static readonly BASE_URL = "/endereco"
    /**
     * crate
     */
    public async create( endereco : EnderecoData) {
        console.log("Service : ",endereco);
        
        const response = await api
        .post<{},{data:EnderecoData}>(EnderecService.BASE_URL, endereco )
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
        const response = await api.get<{},{data:EnderecoData[]}>(EnderecService.BASE_URL)
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
        const response = await api.get<{},{data:PneuDataResponse}>(`${EnderecService.BASE_URL}/${id}`)
        .then( res => res.data)

        return {
            status : 200,
            response
        }
    }

    /**
     * update
     */
    public async update(data :EnderecoData) {
        const response  = await api.put<{},{data  : EnderecoData }>(`${EnderecService.BASE_URL}/${data}`, data)
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
        const response = await api.delete<{},{data : EnderecoData}>(`${EnderecService.BASE_URL}/${id}`)
        .then( res => res.data);

        return {
            status : 200, response
        }
    }
}


export default EnderecService