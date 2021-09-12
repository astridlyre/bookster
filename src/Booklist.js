export default function Booklist({ books, loading, error }) {
  if (error) {
    return <p>Error</p>;
  }

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <div data-test="book-list">
      {books.map(book => (
        <div key={book.id} className="book-item">
          <h2 className="title" title={book.title}>
            {book.title}
          </h2>
          <a href={`/books/${book.id}`} title="View Details">
            View Details
          </a>
        </div>
      ))}
    </div>
  );
}
