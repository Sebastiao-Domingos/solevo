import { HTMLAttributes } from "react";

interface TableProps extends HTMLAttributes<HTMLTableElement>{}

function Table({children , ...others}: TableProps) {
    return ( 
        <table className="w-full" {...others}>
            {children}
        </table>
     );
}

interface THeadProps extends HTMLAttributes<HTMLTableRowElement>{}
export function THead({children , ...others}:THeadProps){
    return (
        <thead  className="w-full">
            <tr className="border-b bg-amber-200 uppercase" {...others}>
                {children}
            </tr>
        </thead>
    )
}


interface TBodyProps extends HTMLAttributes<HTMLTableSectionElement>{}
export function TBody({children , ...others}:TBodyProps){

    return (
        <tbody {...others}>{children}</tbody>
    )
}

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement>{}
export function TableRow({children , ...others} :TableRowProps ){
    return (
        <tr  {...others} className="border-b border-slate-300/10 last:border-none hover:bg-amber-600/10">
           {children}
        </tr>
    )
}

export default Table;