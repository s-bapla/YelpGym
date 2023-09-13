import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from 'react'
import Reviews from '../Components/Reviews'

const Show = () => {


    const { id } = useParams();
    const history = useHistory();
    const [deleteError, setDeleteError] = useState('');

    const { data: gym, isPending, error } = useFetch('http://localhost:8000/gyms/' + id, "GET", {});

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/gyms/' + id,
                {
                    method: 'DELETE',
                });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Unknown error');
            }
            history.push('/gyms');
        } catch (e) {
            setDeleteError('Item does not exist')
        }

    }

    return (
        <div>
            {deleteError && <div>{deleteError}</div>}
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {gym &&
                <div className="row">
                    <div className="col-6">
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
                                    Edit
                                </Link>
                                <form className='d-inline' onSubmit={handleDelete}>
                                    <button className='btn btn-danger ms-1' type="submit">Delete</button>
                                </form>
                                
                                <Link to="/gyms" className="btn btn-success ms-1"> Back to all gyms</Link>
                            
                            </div>

                        </div>


                    </div>
                    <Reviews gym={gym}/>
                </div>
            }

        </div>);

}

export default Show;