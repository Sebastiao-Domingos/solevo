"use client"
import Link from "next/link";

function Screen() {
    return ( 
        <div className="relative w-full h-[100vh] flex justify-center items-center">
            <header className="absolute top-0 left-0 right-0 w-full">
            <nav className="p-6 flex justify-between">
                <span className="text-2xl italic text-amber-800 font-bold">Logo</span>
                <ul>
                    <li><Link href="/login" className="flex items-center gap-3 px-4 py-3 border border-amber-800 text-amber-800 rounded hover:bg-amber-800 hover:text-white" >
                       <i className="ri-login-circle-line"></i>Log in
                    </Link></li>
                </ul>
            </nav>
            </header>
            <div className="w-[65%] h-[400px] flex justify-center items-center">
            <div className="text-center space-y-6">
               <h1 className="text-4xl uppercase text-amber-800 font-bold">
                Sistema de gestão de Fazendas
               </h1>
               <p className="">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. At temporibus sit possimus expedita aliquam a eligendi, odio ullam nesciunt beatae sapiente accusantium voluptatibus placeat ipsum officiis, corporis eveniet, porro cumque!
               </p>
            </div>
            </div>
            <footer className="absolute bottom-0 left-0 right-0 w-full flex items-center justify-center">
               <p className="italic text-slate-400 pb-4">Todos os direitos reservados</p>
            </footer>
        </div>
     );
}

export default Screen;