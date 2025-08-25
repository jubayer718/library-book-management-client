import Container from "@/components/Shared/Container";


const CreateBooks = () => {
  return (
    <Container className="my-12">
      <div>
      <h1>Create a New Book</h1>
      <form>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" name="author" required />
        </div>
        <div>
          <label htmlFor="summary">Summary:</label>
          <textarea id="summary" name="summary" required></textarea>
        </div>
        <button type="submit">Create Book</button>
      </form> 
    </div>
    </Container>
  );
};

export default CreateBooks;