import { useState } from 'react';
import BookList from '../components/BookList';
import BorrowForm from '../components/BorrowForm';
import { Book } from '../types/Book';
import { useBooks } from '../hooks/useBooks';

export default function HomePage() {
  const { books, borrowBook, returnBook, loading } = useBooks();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleBorrow = (book: Book) => {
    setSelectedBook(book);
  };

  const handleBorrowSubmit = (borrower: string, book: Book) => {
    borrowBook(book.id, borrower);
    setSelectedBook(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Daftar Buku Perpustakaan</h1>
      <BookList
        books={books}
        onBorrow={handleBorrow}
        onReturn={(book) => returnBook(book.id)}
      />
      <BorrowForm
        selectedBook={selectedBook}
        onSubmit={handleBorrowSubmit}
        onCancel={() => setSelectedBook(null)}
      />
    </div>
  );
}
