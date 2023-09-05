import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../hooks/useFetch";

const Show = () => {


    const {id} = useParams();
    const history = useHistory();

    const {data: gym, isPending, error} = useFetch('http://localhost:8000/gyms/' + id, "GET", {})
    
    const handleDelete = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:8000/gyms/' + id,
            {
                method: 'DELETE',
            });
        history.push('/gyms');
    }


    return (
        <div>
        {isPending && <div>Loading...</div>}
        { error && <div>{ error }</div> }
        {gym && 
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card mb-3">
                        <img src={gym.image} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">
                                {gym.name}
                            </h5>
                            <p className="card-text">
                                {gym.description}
                            </p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item text-muted">
                                {gym.location}
                            </li>
                            <li className="list-group-item">${gym.price}/month</li>
                        </ul>
                        <div className="card-body">
                            <Link className="card-link btn btn-warning" to={`/gyms/${gym._id}/edit`}>
                                edit
                            </Link>
                            <form className='d-inline' onSubmit={handleDelete}>
                                <button className='btn btn-danger' type="submit">Delete</button>
                            </form>
                        </div>
                        <div className="card-footer text-muted">
                            <Link to="/gyms"> all gyms</Link>
                        </div>
                    </div>
                </div>
            </div>
        }
        
        </div>);
    
}

export default Show;