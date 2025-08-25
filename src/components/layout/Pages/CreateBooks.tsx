import Container from "@/components/Shared/Container";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm,  type FieldValues, type SubmitHandler } from "react-hook-form";


const CreateBooks = () => {

  const form = useForm();
  const onSubmit:SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <Container className="mt-20 max-w-3xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gradient-to-tr from-cyan-200 to-blue-50 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Book</h2 >
          {/* Title */}
        <FormField
          control={form.control}
          name="username"
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


          {/* TODO */}
          {/* Genre */}


          {/* isbn */}
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
                <Input placeholder="Enter number of copies" {...field} />
              </FormControl>
            </FormItem>
          )}
          />
{/* TODO */}
          {/* Available */}
        <FormField
          control={form.control}
          name="available"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Available</FormLabel>
              <FormControl>
                <Input placeholder="Enter number of available copies" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  

    </Container>
  );
};

export default CreateBooks;