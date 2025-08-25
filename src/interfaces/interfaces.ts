export interface IBook{
  _id: string
  title: string;
  author: string;
  genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export interface TBorrow{
  book: string;
  quantity: number;
  dueDate: string;
  bookDetails?: IBook; // Optional detailed info about the book
  totalQuantity?: number; // For summary, total quantity borrowed of this book
}