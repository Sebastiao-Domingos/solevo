import Link from "next/link";


function  Header(){
    return <div className="w-full p-4 text-center bg-green-600">
        <Link href={"/home"}>
            <h3 className="italic text-white">My logo</h3>
        </Link>
    </div>
}

export default Header;