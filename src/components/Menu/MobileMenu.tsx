"use client"
import Link from "next/link";
import { HTMLAttributes } from "react";

const links = [
    {
        title : "Home",
        icon : "ri-home-3-line",
        url : "/home",
    }, {
        title : "Promoção",
        icon : "ri-apple-line",
        url : "/prod",
    }, 
    {
        title : "Compras",
        icon : "ri-shopping-cart-2-line",
        url : "/cards",
    },
    {
        title : "Perfil",
        icon : "ri-user-shared-2-line",
        url : "/user",
    }, 
]



function MobileMenu(){

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-green-600 h-[4rem] md:hidden">
            <nav className="flex gap-3 items-center justify-center px-2 h-full w-full">
                { links.map( (item,index) => (
                    <ItemMobileMenu key={index} icon={item.icon} title={item.title} url={item.url}/>
                ))}
            </nav>
        </div>
    )
}

export default MobileMenu;


interface PropsItemMobile extends HTMLAttributes<HTMLDivElement>{
    title : string;
    icon : string;
    url : string;
}

function ItemMobileMenu({title , icon,url } : PropsItemMobile ){

    return (
        <Link href={url} className="flex flex-col gap-[2px] text-white">
             <i className={icon}></i>
             <span className="text-xs">{title}</span>
        </Link>
    )
}