import { HTMLAttributes } from "react";


interface HeaderProps extends HTMLAttributes<HTMLButtonElement> {
    title : string,
    icon : string
}

function Header({icon, title , children} : HeaderProps) {
    return ( 
        <div className="w-full flex justify-between px-4 py-8 shadow-sm rounded">
            <h2 className="flex gap-4 text-amber-600 text-2xl">
                <i className={icon}></i>
                <span>{title}</span>
            </h2>
            <div>
                {children}
            </div>
        </div>
     );
}

export default Header;