
import BooksEdit from "@/actions/BooksEditForm";
import Container from "@/components/Shared/Container";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { IBook } from "@/interfaces/interfaces";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import { useState } from "react";
import toast from "react-hot-toast";

// Utility to derive Availability label from copies
const availabilityLabel = (copies: number) => (copies > 0 ? "In stock" : "Un Available");
const availabilityBadgeClass = (copies: number) =>
  copies > 0
    ? "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200"
    : "bg-rose-100 text-rose-800 ring-1 ring-rose-200";

const AllBooks = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data, isLoading, error } = useGetBooksQuery(undefined);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching books</p>;

  const books: IBook[] = data?.data || [];

  const handleView = (book: IBook) => {
    toast.success(` ${book.title} Successfully viewed book!`)
  };


  const handleEdit = (_id:string) => {
    setSelectedId(_id);
    setOpenDialog(true);
  };



  const handleDelete = (book: IBook) => {
    const ok = confirm(`Delete "${book.title}" ? This cannot be undone.`);
    if (ok) alert("Deleted (demo)");
  };



  return (
    <Container className="my-12">
      <h1 className="text-2xl font-bold mb-6">Welcome to the Library Management System</h1>

      <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Genre</th>
              <th className="px-4 py-3">ISBN</th>
              <th className="px-4 py-3">Copies</th>
              <th className="px-4 py-3">Availability</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {books.map((b) => (
              <tr key={b._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{b.title}</td>
                <td className="px-4 py-3">{b.author}</td>
                <td className="px-4 py-3">{b.genre}</td>
                <td className="px-4 py-3 font-mono text-xs">{b.isbn}</td>
                <td className="px-4 py-3">{b.copies ?? 0}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${availabilityBadgeClass(
                      b.copies ?? 0
                    )}`}
                  >
                    {availabilityLabel(b.copies ?? 0)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleView(b)}
                      className="rounded-xl border border-gray-300 px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(b._id)}
                      className="rounded-xl border border-gray-300 px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(b)}
                      className="rounded-xl border border-rose-300 px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

         {/* Dialog with BooksEdit component inside */}
      <Dialog  open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-center font-bold">Edit Book</DialogTitle>
          </DialogHeader>

          {selectedId && (
            <BooksEdit id={selectedId} /> 
          )}
        </DialogContent>
      </Dialog>
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden space-y-3 mt-4">
        {books.map((b) => (
          <div
            key={b._id}
            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold leading-snug">{b.title}</h2>
                <p className="text-sm text-gray-600">{b.author}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${availabilityBadgeClass(
                  b.copies ?? 0
                )}`}
              >
                {availabilityLabel(b.copies ?? 0)}
              </span>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <dt className="text-gray-500">Genre</dt>
                <dd className="font-medium">{b.genre}</dd>
              </div>
              <div>
                <dt className="text-gray-500">ISBN</dt>
                <dd className="font-mono text-xs">{b.isbn}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Copies</dt>
                <dd className="font-medium">{b.copies ?? 0}</dd>
              </div>
            </dl>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => handleView(b)}
                className="rounded-xl border border-gray-300 px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
              >
                View
              </button>
              <button
                onClick={() => handleEdit(b._id)}
                className="rounded-xl border border-gray-300 px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(b)}
                className="rounded-xl border border-rose-300 px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default AllBooks;
