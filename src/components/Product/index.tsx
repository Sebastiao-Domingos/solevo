import Image from "next/image";
import Link from "next/link";

function Product(){

    return (
        <div className="w-[20rem] h-[26rem] border border-green-600 shadow rounded pt-2 mb-4" >
            <div className="relative w-full h-[11rem] flex items-center justify-center p-2">
                <button className="absolute top-0 left-2 text-green-600">
                    <i className="ri-heart-line"></i>
                </button>
                <Link href="#">
                    <Image className="w-full h-full" src="/images/imagem.png" alt="product"  width={100} height={100}/>
                </Link>
            </div>
            <div className="">
                <div className="space-y-2 px-2">
                    <div className="flex justify-between">
                         <span className="w-5 h-5 text-[10px] p-1 border border-dashed border-green-600 rounded-full flex justify-center items-center text-primary">N</span>
                         <span className="bg-green-400/50 p-1 text-[10px] text-primary rounded"><i className="ri-truck-line mr-1"></i>Entrega grátis</span>
                    </div>
                    <div>
                        <h3 className="uppercase">Fertilizante para ortas de construcas</h3>
                        <p className="text-xs text-slate-500 italic">disponivel para todos os directos</p>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <p className="text-xl text-green-600">14.233,00 kz</p>
                            <span className="text-xs text-slate-400">Loja : 14.200, 00kz</span>
                        </div>
                        <div className="flex flex-col justify-between text-xl text-green-500">
                            <i className="ri-stack-line"></i>
                            <i className="ri-shopping-cart-line"></i>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-200 mt-7 text-center p-2">
                    <p>Entrega até 4 julho</p>
                </div>
            </div>
        </div>
    )
}

export default Product;