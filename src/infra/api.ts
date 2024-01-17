import axios from "axios"

const api = axios.create({
    baseURL: process.env.BASE_API_URL,
    headers : {
        "Content-Type" : "Aplication/json",
        "Accept-Type": "application/json",
    }
})


export{api}