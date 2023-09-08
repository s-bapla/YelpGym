import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const history = useHistory();
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [err, setErr] = useState("")

    useEffect(() => {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')
        

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                setErr("")
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    }, [])

    async function handleSubmit(event) {
        try {
            event.preventDefault();
            const gym = { name, location, price, description, image: imageURL };
            const response = await fetch('http://localhost:8000/gyms', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(gym) });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Unknown error');
            }            
            history.push('/gyms');
        } catch (e) {
            console.log('There was an error:', e.message);
            
            setErr("Price must be a number");
            const form = document.querySelector('.needs-validation');
            form.classList.remove('was-validated') 
            
        }

    }

    return (
        <div>
            {
                err &&
                <div className="alert alert-danger" role="alert">
                    {err}
                </div>
            }

            <h1 className="text-center">New Gym</h1>
            <div className="col-6 offset-3">
                <form onSubmit={handleSubmit} className='needs-validation' noValidate>

                    <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={name}
                            onChange={e => { setName(e.target.value) }} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Price:</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">$ / Month</span>
                            <input type="text"
                                required
                                className='form-control'
                                value={price}
                                onChange={e => { setPrice(e.target.value) }} />
                        </div>

                    </div>

                    <div className="mb-3">
                        <label className="form-label">Location:</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={location}
                            onChange={e => { setLocation(e.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Image URL:</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={imageURL}
                            onChange={e => { setImageURL(e.target.value) }} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description:</label>
                        <textarea type="text"
                            required
                            className="form-control"
                            value={description}
                            onChange={e => { setDescription(e.target.value) }} />
                    </div>
                    <button className='btn btn-success mb-5'>Submit</button>
                </form>

            </div>
        </div>

    );
}

export default Create;