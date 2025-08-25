import type { IBook } from "@/interfaces/interfaces";
import { useGetUniqueBooksQuery, useUpdateBookMutation } from "@/redux/api/baseApi";
import { toast } from "react-hot-toast";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect } from "react";

interface BooksEditProps {
  id: string;
}

const BooksEdit = ({ id }: BooksEditProps) => {
  const { data, isLoading, error } = useGetUniqueBooksQuery(id);
  const [updateBook, { isLoading: updating }] = useUpdateBookMutation();

  const form = useForm({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      copies: 0,
      available: "true",
    },
  });

  const book: IBook = data?.data;

  // ✅ Reset form when book data loads
  useEffect(() => {
  if (book) {
    form.reset({
      ...book,
      available: book.available ? "true" : "false",
    });
  }
}, [book, form]);


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching book</p>;

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {

    try {
      await updateBook({
        id: book._id,
        body: {
          title: values.title,
          author: values.author,
          genre: values.genre,
          isbn: values.isbn,
          description: values.description,
          copies: Number(values.copies),
          available: values.available === "true",
        },
      }).unwrap();

      toast.success("Book updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update book!");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gradient-to-tr from-cyan-200 to-blue-50 p-8 rounded-lg shadow-md w-full h-full"
      >
      

        <div className="lg:grid grid-cols-2 gap-4">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter book title" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Author */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Enter author name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Genre */}
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Genre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent >
                    <SelectItem value="FICTION">Fiction</SelectItem>
                    <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
                    <SelectItem value="SCIENCE">Science</SelectItem>
                    <SelectItem value="FANTASY">Fantasy</SelectItem>
                    <SelectItem value="HISTORY">History</SelectItem>
                    <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* ISBN */}
          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input placeholder="Enter ISBN number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter book description" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Copies */}
          <FormField
            control={form.control}
            name="copies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Copies</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter number of copies" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Available */}
          <FormField
            control={form.control}
            name="available"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={updating}>
          {updating ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
};

export default BooksEdit;
