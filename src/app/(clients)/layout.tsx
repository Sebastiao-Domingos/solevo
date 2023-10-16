import Footer from "@/components/Footer";
import Header from "@/components/Menu";
import React from "react";


interface LayoutProps{
    children : React.ReactNode;
}

function Layout({children}:LayoutProps){
    return <div>
        <Header />
        {children}
        <Footer />
    </div>
}

export default Layout;