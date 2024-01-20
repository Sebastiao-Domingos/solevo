import { api } from "@/infra/api"
import axios from "axios"


export type PneuData ={
    id? : number
    durancao :   number
    marca     :     string
    caminhao_id: number
}

export type PneuDataResponse = PneuData & {
    caminhao: {
        id: number,
        nome: string,
        ano_fabricacao: string,
        km_rodado: number,
        marca: string
    }
}

class PneuService {
    private static readonly BASE_URL = "/pneu"
    /**
     * crate
     */
    public async create( pneu : PneuData) {
        pneu.caminhao_id = Number(pneu.caminhao_id);
        pneu.durancao = Number(pneu.durancao)
        
        const response = await api
        .post<{},{data:PneuData}>(PneuService.BASE_URL, pneu )
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
        const response = await api.get<{},{data:PneuData[]}>(PneuService.BASE_URL)
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
        const response = await api.get<{},{data:PneuDataResponse}>(`${PneuService.BASE_URL}/${id}`)
        .then( res => res.data)

        return {
            status : 200,
            response
        }
    }

    /**
     * update
     */
    public async update(data :PneuData) {
        data.caminhao_id = Number(data.caminhao_id);
        data.durancao = Number(data.durancao);
        data.id = Number(data.id)
        const response  = await api.put<{},{data  : PneuData }>(`${PneuService.BASE_URL}/${data.id}`, data)
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
        const response = await api.delete<{},{data : PneuData}>(`${PneuService.BASE_URL}/${id}`)
        .then( res => res.data);

        return {
            status : 200, response
        }
    }
}


export default PneuService