import Container from "@/components/Shared/Container";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
            <FormItem  >
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Genre to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
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
            <FormItem  >
              <FormLabel>Available</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  

    </Container>
  );
};

export default CreateBooks;