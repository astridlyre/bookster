export default function ReviewList({ reviews }) {
  return (
    <div data-test="reviews-container">
      {reviews.map(review => (
        <div key={review.name + review.date} className="review">
          {review.name}
        </div>
      ))}
    </div>
  );
}
