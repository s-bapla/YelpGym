import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const GymCard = ({ gym }) => {

    const history = useHistory();
    
    const onClickView = () => {
        
        history.push('/show');
    }


    return (
        <div className="card mb-3">
            <div className="row">
                <div className="col-md-4">
                    <img className="img-fluid" src={gym.image} alt="Gym Photo" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <p className="card-title">{gym.name}</p>
                        <p className="card-subtitle mb-2 text-body-seconday">{gym.location}</p>
                        <p className="card-text">{gym.description}</p>
                        <Link to={`/gyms/${gym._id}/view`} className='btn btn-primary'>View Gym</Link>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default GymCard;