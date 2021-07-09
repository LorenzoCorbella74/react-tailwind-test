import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="flex justify-between py-4 items-center">
            <h3 className="text-gray-800 text-4xl">React + Tailwind</h3>
            <div className="flex">
                <div className="rounded-full py-3 px-2 uppercase text-xs font-bold tracking-wider cursor-pointer mr-4 bg-yellow-400 text-gray-800">
                    <Link to="/">Home</Link>
                </div>
                <Link to="/Create">
                    <div className="rounded-full p-2 cursor-pointer bg-yellow-400">
                        <svg className="w-6 h-6 animate-ping  text-xs font-bold text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    </div>
                </Link>

            </div>
        </nav>
    );
}

/* className="rounded-full py-2 px-3 uppercase text-xs font-bold tracking-wider cursor-pointer bg-yellow-400 " */

export default Navbar;