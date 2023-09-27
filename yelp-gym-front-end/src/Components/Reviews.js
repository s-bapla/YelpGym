import { useEffect, useState } from 'react';

const Reviews = ({ gym }) => {

    const [review, setReview] = useState('');
    const [rating, setRating] = useState(3);
    const [reviewError, setReviewError] = useState('');
    const [reviews, setReviews] = useState(gym.reviews)

    useEffect(() => {
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
        addFormEventListener();
    }, [gym])

    const handleDelete = async (e, reviewId) => {
        
        try{
            e.preventDefault();
            
            const response = await fetch('http://localhost:8000/gyms/' + gym._id + '/reviews/' + reviewId, {method: 'DELETE'});
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Unknown error');
            }
            setReviews(reviews => reviews.filter((item) => {return item._id !== reviewId}))

        } catch(e) {
            setReviewError(e.message)
        }


    }

    const handleReview = async (e) => {

        try {
            e.preventDefault();
            const response = await fetch('http://localhost:8000/gyms/' + gym._id + '/reviews',
                {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ body: review, rating: rating })

                });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Unknown error');
            }
            const data = await response.json();
            console.log(data)
            setReviews(prevData => [...prevData, data]);
            setReviewError('')
        } catch (e) {
            setReviewError(e.message);
        }

    }


    return (
        <div className='col-6'>
            {
                reviewError &&
                <div className="alert alert-danger" role="alert">
                    {reviewError}
                </div>
            }
            {gym &&
                <div>
                    <form className='needs-validation' onSubmit={handleReview} noValidate>
                        <h2>Leave a Review</h2>
                        <div className="mb-3">
                            <label className="form-label">Rating:</label>
                            <input onChange={e => setRating(e.target.value)} name='rating' type="range" min='1' max='5' className='form-control' required value={rating}/>
                            <label className="form-label">Review:</label>
                            <textarea onChange={e => setReview(e.target.value)} name='review' cols="30" rows="4" className='form-control mb-3' required></textarea>
                            <button className='btn btn-success' type="submit">Submit Review</button>
                        </div>
                    </form>
                    <h2>Reviews</h2>
                    <div>
                        {reviews.map((review) => {
                            return (
                                <div className='card mb-3' key={review._id}>
                                    <div className='card-body'>
                                        <h5 className='card-title'>Rating: {review.rating}</h5>
                                        <p className='card-text'>Review: {review.body}</p>
                                        <form onSubmit={(e) => {return handleDelete(e, review._id)}}>
                                            <button type='submit' className='btn btn-sm btn-danger'>Delete</button>
                                        </form>
                                    </div>

                                </div>)
                        })}
                    </div>

                </div>
            }
        </div>);
}

export default Reviews;