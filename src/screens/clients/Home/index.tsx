"use client"

import Product from "../../../components/Product";

// import Slider from "@/components/Slider/index";



function Home(){

    return <div className="p-4">
        
        <h2>Home of products</h2>


        <div className="w-full">
            <div className="w-full grid grid-cols-3 gap-1 md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] items-start md:gap-6 px-2 lg:px-4 mt-8">
                { Array(6).fill('').map( (_,index) => (
                    <Product key={index}  />
                ))}
            </div>
        </div>
    </div>
}





export default Home;