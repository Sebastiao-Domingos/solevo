import PneuService, { PneuData } from "@/services/pneu/PneuService";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

const service = new PneuService();    

async function POST( request :  NextRequest) {

    const data: PneuData = await request.json();
    
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

async function PUT( request :  NextRequest) {

    const data: PneuData = await request.json();
    
    try {
        const response = await service.update(data)
        const body = response.response;
        return NextResponse.json({body})
    } catch (error) {
        console.log(error);
        
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

async function DELETE( request :  NextRequest) {

    const data: { id : number} = await request.json();
    
    try {
        const response = await service.delete(data.id)
        const body = response.response;
        return NextResponse.json({body})
    } catch (error) {
        console.log(error);
        
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
export {GET , POST , DELETE , PUT}