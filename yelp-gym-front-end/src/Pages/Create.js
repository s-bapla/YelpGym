import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useHistory } from "react-router-dom";

const Create = () => {
    const history = useHistory();
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [imageURL, setImageURL] = useState('')
    
    async function handleSubmit(e) {
        e.preventDefault();
        const gym = { name, location, price, description, image: imageURL };
        const res = await fetch('http://localhost:8000/gyms', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(gym) });
        history.push('/gyms');
    }
    
    return (
        <div>
            <h1 className="text-center">New Gym</h1>
            <div className="col-6 offset-3">
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input type="text"
                            className="form-control"
                            value={name}
                            onChange={e => {setName(e.target.value)}} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Price:</label>
                        <div className="input-group mb-3">      
                            <span className="input-group-text" id="basic-addon1">$ / Month</span>
                            <input type="text"
                                className="form-control"
                                value={price}
                                onChange={e => {setPrice(e.target.value)}} />
                        </div>

                    </div>

                    <div className="mb-3">
                        <label className="form-label">Location:</label>
                        <input type="text"
                            className="form-control"
                            value={location}
                            onChange={e => {setLocation(e.target.value)}} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Image URL:</label>
                        <input type="text"
                            className="form-control"
                            value={imageURL}
                            onChange={e => {setImageURL(e.target.value)}} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description:</label>
                        <textarea type="text"
                            className="form-control"
                            value={description}
                            onChange={e => {setDescription(e.target.value)}} />
                    </div>
                    <button className='btn btn-success mb-5'>Submit</button>
                </form>
                
            </div>
        </div>

    );
}

export default Create;