import React from "react";


export default function Layout({children} : {children : React.ReactNode}){
    return (
        <div className="w-full">
            <div className="fixed top-0 left-0 w-[300px] h-full bg-white/60 p-4 shadow">
                <div className="flex justify-between">
                    <h2 className="text-green-600 font-bold text-2xl">Fazendas</h2>
                    <button className="p-2 rounded shadow text-xl"><i className="ri-arrow-left-s-line"></i></button>
                </div>
                
                <nav className="">
                    Menu verical
                </nav>
            </div>

            <div className="ml-[300px]">
                <div className="w-full p-6 bg-white/60 shadow flex items-center justify-between">
                    <p className="italic">Dashboard</p>
                    
                    <div className="flex gap-8">
                        <button>Notificação</button>
                        <button className="flex items-center gap-2 p-2 rounded-full bg-green-500 text-white"><i className="ri-login-circle-line"></i> Login</button>
                    </div>
                </div>
                <div className="p-6">
                    {children}

                </div>
            </div>
        </div>
    )
}