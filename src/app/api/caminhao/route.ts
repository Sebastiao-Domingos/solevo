import CaminhaoService, { CaminhaoData } from "@/services/caminhao/CaminhaoService";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

const service = new CaminhaoService();    

async function POST( request :  NextRequest) {

    const data: CaminhaoData = await request.json();
    console.log(data);
    
    try {
        const response = await service.create(data)
        const body = response.response;
        return NextResponse.json({body})
    } catch (error) {
        if( isAxiosError(error) && error.response?.status ){
            return NextResponse.json(error.response?.data,{
                status : error.response?.status
            })
        }

        return NextResponse.json({
            error : "Erro desconhecido",
            status : 500
        })
    }
}


async function GET() {
    
    try {        
        const response = await service.get()
        const body = response.response
        
        return NextResponse.json(body)
    } catch (error) {
        if(isAxiosError(error) && error.response?.status){
            return NextResponse.json(error.response.data , {
                status : error.response.status
            })
        }
        return NextResponse.json({
            status : 500,
            error : "Erro desconhecido"
        })
    }   
}

export {GET , POST}