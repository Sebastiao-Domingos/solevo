import Link from "next/link";


function Page(){
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="flex justify-between w-[80%]">
                <div className="w-[50%] flex">
                    <div className="m-auto space-y-5">
                        <h2 className="text-4xl font-bold text-amber-800 pl-2 border-l-2">Sistema de gestão de Fazendas</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci odio facere quia itaque eligendi quis! Dolores illum veniam dolore tenetur officia, dolorem dolorum non laboriosam nobis consequatur? Necessitatibus, quo hic.</p>
                    </div>
                </div>
                <div className="w-[48%] min-h-[25rem] rounded shadow-sm px-4 py-8 space-y-10">
                    <h2 className="w-full text-center text-4xl font-bold text-amber-800">Log In</h2>
                    <form action="" className="flex flex-col gap-5">
                        <div className="w-full flex flex-col gap-3">
                            <label className="text-xl" htmlFor="email">Email <span className="text-red-500">*</span></label>
                            <input className="p-3 text-xl outline-none border rounded" type="email" name="email" id="email" 
                               placeholder="Email do Administrador"
                             />
                        </div>
                        <div className="w-full flex flex-col gap-3">
                            <label className="text-xl" htmlFor="pass">Palavra passe <span className="text-red-500">*</span></label>
                            <input className="p-3 text-xl outline-none border rounded" type="password" name="pass" id="pass" 
                               placeholder="Palavra passe"
                            />
                        </div>

                        <div className="space-x-7 mt-8">
                            <button type="submit" className="py-3 w-[45%] rounded bg-green-600 text-white shadow">
                                Entrar
                            </button>
                            <Link href="#" className="text-slate-400 italic hover:text-amber-900" >Esqui a palavra passe</Link>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Page;