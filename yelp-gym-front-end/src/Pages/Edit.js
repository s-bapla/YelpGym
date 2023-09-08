import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

const Edit = () => {

    console.log('render');

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
    const [validationError, setValidationError] = useState('')
    const [validGym, setValidGym] = useState(true)

    function addFormEventListener() {
        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    }

    if(validGym) {
        addFormEventListener();
    }

    useEffect(() => {
        const abortCont = new AbortController();

        async function fetchData() {

            try {
                const response = await fetch("http://localhost:8000/gyms/" + id, { method: "GET", signal: abortCont.signal });
                const gym = await response.json();
                if (!response.ok) {
                    throw new Error(gym.message || "Error");
                }
                setValidGym(true);
                setGym(gym);
                setIsPending(false);
                setError('')

            }
            catch (e) {
                if (e.name === 'AbortError') {
                    console.log('Fetch aborted')
                    setIsPending(false);
                    setError('fetch aborted')
                    setValidGym(false)
                }
                else {
                    setIsPending(false);
                    setError("Gym Not Found");
                    setValidGym(false)
                    console.log(e);
                }
            }
        }

        fetchData();
        return () => { abortCont.abort() }
    }, [])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setGym((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    async function handleSubmit(e) {

        try {
            e.preventDefault();
            const gymData = { name: gym.name, location: gym.location, price: gym.price, description: gym.description, image: gym.image };
            const res = await fetch('http://localhost:8000/gyms/' + id, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(gymData) });
            if (!res.ok) {
                const error = await res.json()
                throw new Error(error.message || "UNKNOWN ERROR")
            }
            history.push('/gyms');
        } catch (e) {
            console.log('There was an error:', e.message);
            setValidationError(e.message);
            const form = document.querySelector('.needs-validation');
            form.classList.remove('was-validated')
        }
    }



    return (
        <div>
            {validationError &&
                <div className="alert alert-danger" role="alert">
                    {validationError}
                </div>}
            {isPending && <div>loading...</div>}
            {gym &&
                <div>
                    <h1 className="text-center">Edit Gym</h1>
                    <div className="col-6 offset-3">
                        <form onSubmit={handleSubmit} className="needs-validation" noValidate>

                            <div className="mb-3">
                                <label className="form-label">Name:</label>
                                <input type="text"
                                    required
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
                                        required
                                        name="price"
                                        className="form-control"
                                        value={gym.price}
                                        onChange={handleChange} />
                                </div>

                            </div>

                            <div className="mb-3">
                                <label className="form-label">Location:</label>
                                <input type="text"
                                    required
                                    name="location"
                                    className="form-control"
                                    value={gym.location}
                                    onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Image URL:</label>
                                <input type="text"
                                    required
                                    name="image"
                                    className="form-control"
                                    value={gym.image}
                                    onChange={handleChange} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Description:</label>
                                <textarea type="text"
                                    required
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