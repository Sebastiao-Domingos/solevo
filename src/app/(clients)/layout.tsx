import { HTMLAttributes } from "react";



interface LayoutProps extends HTMLAttributes<HTMLDivElement>{}
export default function Layout({children}:LayoutProps){
    return <div>
        {children}
        <span>Footer</span>
    </div>
}