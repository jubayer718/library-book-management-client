import Container from "@/components/Shared/Container";
import type { TBorrow } from "@/interfaces/interfaces";
import { useGetBorrowedBooksQuery } from "@/redux/api/baseApi";


const BorrowSummary = () => {
  // Call API with RTK Query
  const { data, isLoading, error } = useGetBorrowedBooksQuery(undefined)

  if (isLoading) return <p>Loading summary...</p>;
  if (error) return <p>Failed to load borrow summary.</p>;

  // Extract borrowed summary data
  const summary = data?.data || [];

  return (
    <Container className="my-12">
      <h1 className="text-2xl font-bold mb-6">Borrow Summary</h1>

      {summary.length === 0 ? (
        <p className="text-gray-600">No borrowed books yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-3">Book Title</th>
                <th className="px-4 py-3">ISBN</th>
                <th className="px-4 py-3">Total Quantity Borrowed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {summary.map((item:TBorrow) => (
                <tr key={item.book} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {item.bookDetails?.title}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">
                    {item.bookDetails?.isbn}
                  </td>
                  <td className="px-4 py-3">{item.totalQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
};

export default BorrowSummary;
