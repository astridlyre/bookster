export default function BookDetail({ book, loading, error }) {
  if (error) {
    return <p>Error</p>;
  }
  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <div className="detail">
      <h2 className="book-title">{book.title}</h2>
    </div>
  );
}
