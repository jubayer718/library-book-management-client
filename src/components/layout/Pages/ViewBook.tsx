import Container from "@/components/Shared/Container";
import type { IBook } from "@/interfaces/interfaces";
import { useGetUniqueBooksQuery } from "@/redux/api/baseApi";
import { useParams } from "react-router";


const ViewBook = () => {
  const { id } = useParams<string>(); 
  const { data, isLoading } = useGetUniqueBooksQuery(id);
  const availabilityLabel = (copies: number) => (copies > 0 ? "In stock" : "Unavailable");
const availabilityBadgeClass = (copies: number) =>
  copies > 0
    ? "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200"
    : "bg-rose-100 text-rose-800 ring-1 ring-rose-200";
    if (isLoading) return <p>Loading...</p>;
  const book: IBook = data?.data;
  console.log(book)
  return (
   <Container className="my-16">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
        <p className="text-gray-700 mb-2"><span className="font-semibold">Author:</span> {book.author}</p>
        <p className="text-gray-700 mb-2"><span className="font-semibold">Genre:</span> {book.genre}</p>
        <p className="text-gray-700 mb-2"><span className="font-semibold">ISBN:</span> {book.isbn}</p>
        <p className="text-gray-700 mb-2"><span className="font-semibold">Copies:</span> {book.copies}</p>
        <p className="text-gray-700 mb-4"><span className="font-semibold">Description:</span> {book.description}</p>
        
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${availabilityBadgeClass(
            book.copies ?? 0
          )}`}
        >
          {availabilityLabel(book.copies ?? 0)}
        </span>
      </div>
    </Container>
  );
};

export default ViewBook;