
import useFetch from "../hooks/useFetch";

import { Link } from "react-router-dom";

const Home = () => {

    const { data: list, isLoading, error } = useFetch('http://localhost:8000/items')

    return (
        <div className="home">
            <h1>Home component</h1>
            <br />

            {error && <div>{error}</div>}

            {isLoading && <div>...loading</div>}

            {list && list.map((item) =>
            (<div key={item.id} className="list">
                <div>
                    <h3>{item.title}</h3>
                    <h5>Name: {item.author}</h5>
                </div>
                <Link to={`/item/${item.id}`}>
                    <button>Go</button>
                </Link>
            </div>)
            )}
        </div>
    );
}

export default Home;