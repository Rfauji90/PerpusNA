export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  type: string;
  imageUrl?: string;
  status: 'available' | 'borrowed';
  borrower?: string;
  borrowDate?: string;
  returnDate?: string;
}
