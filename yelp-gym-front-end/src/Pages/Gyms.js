import GymCard from '../Components/GymCard';
import  useFetch  from '../hooks/useFetch'

const Gyms = () => {
    console.log('loading gym')
    const {data, isPending, error} = useFetch('http://localhost:8000/gyms', 'GET', {})


    return (
        <div className="all-gyms">
            {isPending && <p>loading...</p>}
            {error && <p>Error: {error}</p>}
            {data && data.map((gym) => {return <GymCard key={gym._id} gym={gym}/>})}
        </div>

      );
}

export default Gyms;
