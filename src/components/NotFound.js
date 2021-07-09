import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div>
            <h2>Sorry</h2>
            <p style={{'marginBottom': '1rem'}}>The page was not found</p>
            <Link to="/">BAck to Home....</Link>
        </div >

    );
}

export default NotFound;