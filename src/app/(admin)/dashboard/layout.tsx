import Link from "next/link";
import React from "react";


const links = [
    {
        group : "Markiting",
        menu : {
            title : "Home",
            link : "#",
            icon : "",
        },
        submenus : [
            {
                title : "Fazendas",
                link : "#",
                icon : "",
            },
            {
                title : "Produtos",
                link : "#",
                icon : "",
            },
            {
                title : "Proprietarios",
                link : "#",
                icon : "",
            },
            {
                title : "Markiting",
                link : "#",
                icon : "",
            },
        ]
    }
]


export default function Layout({children} : {children : React.ReactNode}){
    return (
        <div className="w-full">
            <div className="fixed top-0 left-0 w-[300px] h-full bg-white/60 p-4 shadow">
                <div className="flex justify-between">
                    <h2 className="text-amber-600 font-bold text-2xl">Fazendas</h2>
                    <button className="p-2 rounded shadow text-xl"><i className="ri-arrow-left-s-line"></i></button>
                </div>
                <Menu></Menu>
            </div>

            <div className="ml-[300px]">
                <div className="w-full p-6 bg-white/60 shadow flex items-center justify-between">
                    <p className="italic text-green-600">Dashboard</p>
                    
                    <div className="flex gap-8">
                        <button>Notificação</button>
                        <button className="flex items-center gap-2 p-2 rounded-full bg-amber-600 text-white"><i className="ri-logout-circle-line"></i> Logout</button>
                    </div>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    )
}



function Menu(){
    return (
        <nav>
            { links.map( ( link , index ) => (
                <div className="w-full">
                <h3 className="mb-4 ">{link.group}</h3>    
                <ul className="w-full flex flex-col gap-3 text-xl">
                    <li className="w-full flex">
                        <Link className="w-full p-3 hover:bg-amber-600/40 rounded" href={link.menu.link}>{link.menu.title}</Link>
                    </li>
                    <li className="w-full flex">
                        <Link className="w-full p-3 hover:bg-amber-600/40 rounded" href={"#"}>Fazendas</Link>
                    </li>
                    <li className="w-full flex">
                        <Link className="w-full p-3 hover:bg-amber-600/40 rounded" href={"#"}>Produtos</Link>
                    </li>
                    <li className="w-full flex">
                        <Link className="w-full p-3 hover:bg-amber-600/40 rounded" href={"#"}>Proprientarios</Link>
                    </li>
                </ul>
                </div>
            ))}
        </nav>
    )
}