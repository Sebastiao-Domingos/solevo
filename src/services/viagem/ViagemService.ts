import { api } from "@/infra/api"
import axios from "axios"


export type ViagemData ={
    id?: number,
    origem: string,
    destino: string,
    kilometragem: number,
    data_inicio: string,
    data_fim: string,
    caminhao_id: number,
    motorista_id: number
}

export type PneuDataResponse = ViagemData & {
    caminhao: {
        id: number,
        nome: string,
        ano_fabricacao: string,
        km_rodado: number,
        marca: string
    },
    motorista: {
        id: number,
        nome: string,
        numero_carta_conducao: string,
        telefone: string
    }
}

class ViagemService {
    private static readonly BASE_URL = "/viagem"
    /**
     * crate
     */
    public async create( caminhao : ViagemData) {
        caminhao.kilometragem = Number(caminhao.kilometragem);
        caminhao.motorista_id = Number(caminhao.motorista_id)
        caminhao.caminhao_id = Number(caminhao.caminhao_id);
        
        const response = await api
        .post<{},{data:ViagemData}>(ViagemService.BASE_URL, caminhao )
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
        const response = await api.get<{},{data:ViagemData[]}>(ViagemService.BASE_URL)
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
        const response = await api.get<{},{data:PneuDataResponse}>(`${ViagemService.BASE_URL}/${id}`)
        .then( res => res.data)

        return {
            status : 200,
            response
        }
    }

    /**
     * update
     */
    public async update(data :ViagemData) {
        data.id = Number(data.id)
        data.kilometragem = Number(data.kilometragem);
        data.motorista_id = Number(data.motorista_id)
        data.caminhao_id = Number(data.caminhao_id);
        const response  = await api.put<{},{data  : ViagemData }>(`${ViagemService.BASE_URL}/${data.id}`, data)
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
        const response = await api.delete<{},{data : ViagemData}>(`${ViagemService.BASE_URL}/${id}`)
        .then( res => res.data);

        return {
            status : 200, response
        }
    }
}


export default ViagemService