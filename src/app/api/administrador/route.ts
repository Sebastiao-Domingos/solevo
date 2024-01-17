import AdminService, { AdminData } from "@/services/users/AdminService";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

const service = new AdminService();    

async function POST( request :  NextRequest) {

    const data: AdminData = await request.json();

    try {
        const response = await service.crate(data)
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