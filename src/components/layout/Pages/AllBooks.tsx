import Container from "@/components/Shared/Container";
import type { IBook } from "@/interfaces/interfaces";
import { useGetBooksQuery } from "@/redux/api/baseApi";


const AllBooks = () => {

  const { data: books, isLoading, error } = useGetBooksQuery(undefined)
  if(isLoading) return <p>Loading...</p>
  return (
    <Container className="my-12">
      <h1>Welcome to the Library Management System</h1>
     
      {error && <p>Error fetching books</p>}
      {books && (
        <ul>
          {books.data.map((book:IBook) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default AllBooks;