import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../hooks/useFetch";
import { useState } from 'react'

const Show = () => {


    const { id } = useParams();
    const history = useHistory();
    const [deleteError, setDeleteError] = useState('')
    const { data: gym, isPending, error } = useFetch('http://localhost:8000/gyms/' + id, "GET", {})

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await fetch('http://localhost:8000/gyms/' + id,
                {
                    method: 'DELETE',
                });
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
            {gym.name !== undefined &&
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
                                <Link className="card-link btn btn-warning ms-3" to={`/gyms/${gym._id}/edit`}>
                                    edit
                                </Link>
                                <form className='d-inline' onSubmit={handleDelete}>
                                    <button className='btn btn-danger ms-1' type="submit">Delete</button>
                                </form>
                            </div>

                        </div>

                        <div className="btn btn-success mb-3 ms-3">
                            <Link to="/gyms"> Back to all gyms</Link>
                        </div>
                    </div>
                </div>
            }

        </div>);

}

export default Show;