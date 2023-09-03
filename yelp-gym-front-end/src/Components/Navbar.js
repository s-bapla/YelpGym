import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">YelpGym</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link active" to="/">Home</Link>
                        <Link className="nav-link" to="/gyms">Gyms</Link>
                        <Link className="nav-link" to="/gyms/new">New Gym</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;