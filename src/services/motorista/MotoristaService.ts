import { api } from "@/infra/api"
import axios from "axios"


export type MotoristaData ={
    id: number,
    nome: string,
    numero_carta_conducao: string,
    telefone: string
}

export type MotoristaResponse ={
    id: number,
    nome: string,
    numero_carta_conducao: string,
    telefone: string,
    enderenco: [
        {
            id: number,
            bairro: string,
            rua: string,
            motorista_id: number
        },
        {
            id: number,
            bairro: string,
            rua: string,
            motorista_id: number
        }
    ],
    viagem: [
        {
            id: number,
            origem: string,
            destino: string,
            kilometragem: number,
            data_inicio: string,
            data_fim: string,
            caminhao_id: number,
            motorista_id: number
        }
    ]
}

class MotoristaService {
    private static readonly BASE_URL = "/motorista"
    /**
     * crate
     */
    public async create( motorista : MotoristaData) {
        console.log("Service : ",motorista);
        
        const response = await api
        .post<{},{data:MotoristaData}>(MotoristaService.BASE_URL, motorista )
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
        const response = await api.get<{},{data:MotoristaData[]}>(MotoristaService.BASE_URL)
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
        const response = await api.get<{},{data:MotoristaResponse}>(`${MotoristaService.BASE_URL}/${id}`)
        .then( res => res.data)

        return {
            status : 200,
            response
        }
    }

    /**
     * update
     */
    public async update(data :MotoristaData) {
        
        const response  = await api.put<{},{data  : MotoristaData }>(`${MotoristaService.BASE_URL}/${data.id}`, data)
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
        console.log("Eliminar : " , id);
        
        const response = await api.delete<{},{data : MotoristaData}>(`${MotoristaService.BASE_URL}/${id}`)
        .then( res => res.data);

        return {
            status : 200, response
        }
    }
}


export default MotoristaService