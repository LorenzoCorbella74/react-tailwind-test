import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <h3>React test app</h3>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/Create"> + </Link>
            </div>
        </div>
    );
}

export default Navbar;