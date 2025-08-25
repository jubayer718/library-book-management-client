/* eslint-disable @typescript-eslint/no-unused-vars */
import BooksEdit from "@/actions/BooksEditForm";
import Container from "@/components/Shared/Container";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { IBook } from "@/interfaces/interfaces";
import { useBorrowBookMutation, useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";


// Utility to derive Availability label from copies
const availabilityLabel = (copies: number) => (copies > 0 ? "In stock" : "Unavailable");
const availabilityBadgeClass = (copies: number) =>
  copies > 0
    ? "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200"
    : "bg-rose-100 text-rose-800 ring-1 ring-rose-200";

const AllBooks = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [deleteBook] = useDeleteBookMutation();
  const [borrowBook] = useBorrowBookMutation();
  const { data, isLoading, error } = useGetBooksQuery(undefined);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openBorrowDialog, setOpenBorrowDialog] = useState(false);

  // Borrow form states
  const [borrowQuantity, setBorrowQuantity] = useState(1);
  const [borrowDueDate, setBorrowDueDate] = useState("");
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);

   const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching books</p>;

  const books: IBook[] = data?.data || [];

  // ============= HANDLERS =============

  const handleBorrow = (book: IBook) => {
    setSelectedBook(book);
    setBorrowQuantity(1);
    setBorrowDueDate("");
    setOpenBorrowDialog(true);
  };

  const submitBorrow = async () => {
    if (!selectedBook) return;

    // Business rules
    if (borrowQuantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }
    if (borrowQuantity > (selectedBook.copies ?? 0)) {
      toast.error("Quantity cannot exceed available copies");
      return;
    }
    if (!borrowDueDate) {
      toast.error("Please select a due date");
      return;
    }

    try {
      await borrowBook({
        book: selectedBook,
        quantity: borrowQuantity,
        dueDate: borrowDueDate,
      }).unwrap();

      toast.success("Book borrowed successfully!");
      setOpenBorrowDialog(false);

      // redirect to summary page
      navigate("/summary");
 
    } catch (err) {
      toast.error("Failed to borrow book");
    }
  };

  const handleEdit = (_id: string) => {
    setSelectedId(_id);
    setOpenDialog(true);
  };

  const handleDelete = (id: string) => {
    setSelectedId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteBook(selectedId).unwrap();
      toast.success("Book deleted successfully");
    } catch (err) {
      toast.error("Failed to delete book");
    } finally {
      setOpenDeleteDialog(false);
      setSelectedId(null);
    }
  };

  // ============= RENDER =============
  return (
    <Container className="my-12">
      <h1 className="text-2xl font-bold mb-6">Welcome to the Library Management System</h1>

      {/* Desktop Table */}
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
                      onClick={() => handleBorrow(b)}
                      className="rounded-xl border border-gray-300 px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
                    >
                      Borrow
                    </button>
                    <button
                      onClick={() => handleEdit(b._id)}
                      className="rounded-xl border border-gray-300 px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(b._id)}
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

        {/* Edit Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-center font-bold">Edit Book</DialogTitle>
            </DialogHeader>
            {selectedId && <BooksEdit id={selectedId} />}
          </DialogContent>
        </Dialog>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p className="mt-2 text-sm text-gray-600">
            Are you sure you want to delete this book? This action cannot be undone.
          </p>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setOpenDeleteDialog(false)}>
                Cancel
              </Button>
            </DialogClose>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Borrow Dialog */}
      <Dialog open={openBorrowDialog} onOpenChange={setOpenBorrowDialog}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Borrow Book</DialogTitle>
          </DialogHeader>

          {selectedBook && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitBorrow();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium">Quantity</label>
                <input
                  type="number"
                  min={1}
                  max={selectedBook.copies ?? 0}
                  value={borrowQuantity}
                  onChange={(e) => setBorrowQuantity(Number(e.target.value))}
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                />
                <p className="text-xs text-gray-500">
                  Available copies: {selectedBook.copies ?? 0}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium">Due Date</label>
                <input
                  type="date"
                  value={borrowDueDate}
                  onChange={(e) => setBorrowDueDate(e.target.value)}
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                />
              </div>

              <DialogFooter className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Borrow</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default AllBooks;
