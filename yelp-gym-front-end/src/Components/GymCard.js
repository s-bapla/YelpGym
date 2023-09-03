import { Link } from 'react-router-dom';

const GymCard = ({gym}) => {
    return (
        <div className="card">
            <img src="..." alt="Gym Photo" />
            <div className="card-body">
                <p className="card-title">{gym.name}</p>
                <p className="card-subtitle mb-2 text-body-seconday">{gym.location}</p>
                <p className="card-text">{gym.description}</p>
                <Link to='...' className='btn btn-primary'>View Gym</Link>
            </div>
        </div>
      );
}
 
export default GymCard;