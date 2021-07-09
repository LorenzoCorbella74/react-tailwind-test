
import useFetch from "../hooks/useFetch";

import { Link } from "react-router-dom";

const Home = () => {

    const { data: list, isLoading, error } = useFetch('http://localhost:8000/items')

    return (
        <div className="border rounded-sm p-10 bg-gray-50">
            <h1 className="text-bold text-center">List component </h1>
            <br />

            {error && <div
                className="px-4 py-3 leading-normal text-red-100 bg-red-900 rounded-lg" role="alert">
                <p>{error}</p>
            </div>}

            {isLoading && <div className="flex">
                <span>
                    {/* https://codepen.io/aurer/pen/jEGbA */}
                    <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        className="w-6 h-6" viewBox="0 0 50 50">
                        <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                            <animateTransform attributeType="xml"
                                attributeName="transform"
                                type="rotate"
                                from="0 25 25"
                                to="360 25 25"
                                dur="0.6s"
                                repeatCount="indefinite" />
                        </path>
                    </svg>
                </span>
                <span className="ml-4">
                    ...loading
                </span>
            </div>}

            {list && list.map((item) =>
            (<div key={item.id} className="border shadow-md p-4 mb-4 flex justify-between items-center">
                <div>
                    <h2 className="text-gray-700 text-xl font-bold">{item.title}</h2>
                    <h4 className="text-gray-400 text-lg mb-4">Author: {item.author}</h4>
                </div>
                <div>
                    <div className="rounded-full p-2 cursor-pointer bg-yellow-400">
                        <Link to={`/item/${item.id}`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </Link>
                    </div>

                </div>
            </div>)
            )}
        </div>
    );
}

export default Home;