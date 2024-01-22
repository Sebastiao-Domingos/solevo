"use client"
import Link from "next/link";
import React, { useState } from "react";
import * as Accordion from '@radix-ui/react-accordion';
import { QueryClient, QueryClientProvider } from "react-query";
import { useParams, usePathname } from "next/navigation";

const links = [
    {
        group : "Markiting",
        menus : [
            {
                title : "Dashboard",
                link : "/dashboard",
                icon : "ri-home-2-line",
                subMenus : [],
            },
            {
                title : "Caminhões",
                link : "/dashboard/caminhoes",
                icon : "ri-car-line",
                subMenus : [],
            },
            {
                title : "Pneus",
                link : "/dashboard/pneus",
                icon : "ri-car-line",
                subMenus : [],
            },
            {
                title : "Motoristas",
                link : "/dashboard/motoristas",
                icon : "ri-user-line",
                subMenus : [
                    {
                        title : "Localização",
                        link : "#",
                    }
                ],
            },
            {
                title : "Viagens",
                link : "/dashboard/viagens",
                icon : "ri-car-line",
                subMenus : [],
            }
        ]
    },
    {
        group : "Serviços",
        menus : [
            {
                title : "Definições",
                link : "#",
                icon : "ri-settings-4-line",
                subMenus : [{
                    title : "Administradores",
                    link : "/dashboard/administradores"
                }],
            },
        ]
    }
]



const client = new QueryClient();

export default function Layout({children} : {children : React.ReactNode}){
    
    return (
        <QueryClientProvider client={client}>
            <div className="w-full">
                <div className="fixed top-0 left-0 w-[300px] h-full bg-white/60 p-4 shadow">
                    <div className="flex justify-between">
                        <h2 className="text-amber-500 font-bold text-2xl uppercase">Transportadora</h2>
                        {/* <button className="p-2 rounded shadow text-xl"><i className="ri-arrow-left-s-line"></i></button> */}
                    </div>
                    <Menu></Menu>
                    <div className="absolute bottom-4 left-4">
                        <p className="space-x-3 border-b pb-2 text-amber-500"> 
                            <i className="ri-user-line"></i>
                            <span>sebastiao@gmail.com</span>
                        </p>
                        <button className="flex items-center gap-2 p-2 pt-2"><i className="ri-logout-circle-line"></i> Sair da conta</button>
                    </div>
                </div>

                <div className="ml-[300px]">
                    <div className="w-full p-6 bg-white/60 shadow flex items-center justify-between">
                        <p className="italic text-green-600">Dashboard</p>
                        
                        <div className="flex gap-8">
                            <button>Notificação</button>
                            <button className="flex items-center gap-2 p-2 rounded-full bg-amber-500 text-white"><i className="ri-logout-circle-line"></i> Logout</button>
                        </div>
                    </div>
                    <div className="p-6">
                        {children}
                    </div>
                </div>
            </div>
        </QueryClientProvider>
    )
}


function Menu(){
    const path = usePathname();

    const [active , setActive] = useState(false);
    return (
        <nav className="mt-6">
            { links.map( ( link , index ) => (
            <div key={index} className="w-full">
                <h3 className="mb-4 text-slate-400 font-bold">{link.group}</h3>    
                <div className="w-full flex flex-col gap-1 text-[18px]">
                    <Accordion.Root 
                       type="single"
                       defaultValue="item-1"
                       collapsible
                       className="w-ful flex flex-col gap-2"
                    >
                    {link.menus.map( (menu , index) => (
                        <Accordion.Item value={`item-${index}`}
                            key={menu.title} className="w-full flex flex-col"
                        >
                            <Accordion.Header className={`relative w-full flex justify-between items-center py-2 px-3 hover:bg-amber-100 rounded ${path === menu.link && "bg-amber-300"} `}>
                                <Link className="" href={menu.link}><i className={`${menu.icon}`}></i> {menu.title}</Link>
                                {menu.subMenus.length!==0 &&(
                                    <Accordion.Trigger onClick={ () => setActive(previus => !previus)}><i className={`ri-arrow-down-s-fill absolute ${ active && "rotate-180"} bottom-4 right-4`}></i></Accordion.Trigger>
                                )}
                            </Accordion.Header>
                            {menu.subMenus.length !== 0 && (
                                <Accordion.Content className="flex flex-col gap-1 pl-4">
                                    {menu.subMenus.map(submenu => (
                                        <Link href={submenu.link} key={submenu.title}
                                            className="py-2 px-3 hover:bg-amber-100 rounded"
                                        >{submenu.title}</Link>
                                    ))}
                                </Accordion.Content>
                            )}
                            </Accordion.Item>
                    ))}
                    </Accordion.Root>
                    {/* <li className="w-full flex">
                        <Link className="w-full p-3 hover:bg-amber-600/40 rounded" href={"#"}>Fazendas</Link>
                    </li>
                    <li className="w-full flex">
                        <Link className="w-full p-3 hover:bg-amber-600/40 rounded" href={"#"}>Produtos</Link>
                    </li>
                    <li className="w-full flex">
                        <Link className="w-full p-3 hover:bg-amber-600/40 rounded" href={"#"}>Proprientarios</Link>
                    </li> */}
                </div>
                </div>
            ))}
        </nav>
    )
}