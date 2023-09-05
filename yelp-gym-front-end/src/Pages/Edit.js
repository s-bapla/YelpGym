import useFetch from "../hooks/useFetch";
import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

const Edit = () => {

    const { id } = useParams();

    const history = useHistory();

    const [gym, setGym] = useState({
        name: '',
        price: '',
        location: '',
        image: '',
        description: ''
    });
    const [error, setError] = useState("")
    const [isPending, setIsPending] = useState(true)

    



    useEffect(() => {
        const abortCont = new AbortController();

        async function fetchData() {

            try {
                const data = await fetch("http://localhost:8000/gyms/" + id, { method: "GET", signal: abortCont.signal });
                const gym = await data.json();
                setGym(gym);
                setIsPending(false);
                setError('')
    
            }
            catch (e) {
                if (e.name === 'AbortError') {
                    console.log('Fetch aborted')
                    setIsPending(false);
                    setError('fetch aborted')
                }
                else {
                    setIsPending(false);
                    setError(e.message);
                    console.log(e);
                }
            }
        }


        console.log("fetching")
        fetchData();
        return () => {
            console.log('aborting')
            abortCont.abort() }
    }, [])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setGym((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };





    async function handleSubmit(e) {
        e.preventDefault();
        const gymData = { name: gym.name, location: gym.location, price: gym.price, description: gym.description, image: gym.image };
        const res = await fetch('http://localhost:8000/gyms', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(gymData) });
        history.push('/gyms');
    }



    return (
        <div>

            {isPending && <div>loading...</div>}
            {gym &&
                <div>
                    <h1 className="text-center">Edit Gym</h1>
                    <div className="col-6 offset-3">
                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label">Name:</label>
                                <input type="text"
                                    name="name"
                                    className="form-control"
                                    value={gym.name}
                                    onChange={handleChange} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Price:</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">$ / Month</span>
                                    <input type="text"
                                        name="price"
                                        className="form-control"
                                        value={gym.price}
                                        onChange={handleChange} />
                                </div>

                            </div>

                            <div className="mb-3">
                                <label className="form-label">Location:</label>
                                <input type="text"
                                    name="location"
                                    className="form-control"
                                    value={gym.location}
                                    onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Image URL:</label>
                                <input type="text"
                                    name="image"
                                    className="form-control"
                                    value={gym.image}
                                    onChange={handleChange} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Description:</label>
                                <textarea type="text"
                                    name="description"
                                    className="form-control"
                                    value={gym.description}
                                    onChange={handleChange} />
                            </div>
                            <button className='btn btn-success mb-5'>Submit</button>
                        </form>

                    </div>
                </div>}
            {error && <div>{error}</div>}
        </div>
    );
}

export default Edit;