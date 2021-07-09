
import useFetch from "../hooks/useFetch";

import { Link } from "react-router-dom";

const Home = () => {

    const { data: list, isLoading, error } = useFetch('http://localhost:8000/items')

    return (
        <div className="border rounded-sm p-10 bg-gray-50">
            <h1 className="decoration">List component </h1>
            <br />

            {error && <div>{error}</div>}

            {isLoading && <div>...loading</div>}

            {list && list.map((item) =>
            (<div key={item.id} className="border shadow-md p-4 mb-4 flex justify-between items-center">
                <div>
                    <h2 className="text-gray-700 text-xl font-bold">{item.title}</h2>
                    <h4 className="text-gray-400 text-lg mb-4">Author: {item.author}</h4>
                </div>
                <div>
                    <Link to={`/item/${item.id}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </Link>
                </div>
            </div>)
            )}
        </div>
    );
}

export default Home;