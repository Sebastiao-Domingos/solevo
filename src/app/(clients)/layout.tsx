import React from "react";


interface LayoutProps{
    children : React.ReactNode;
}

function Layout({children}:LayoutProps){
    return <div>
        {children}
        <span>Footer</span>
    </div>
}

export default Layout;