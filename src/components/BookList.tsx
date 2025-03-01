import { Book } from '../types/Book';
import { BookOpen, UserCheck } from 'lucide-react';

interface BookListProps {
  books: Book[];
  onBorrow: (book: Book) => void;
  onReturn: (book: Book) => void;
}

export default function BookList({ books, onBorrow, onReturn }: BookListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <div key={book.id} className="bg-white p-4 rounded-lg shadow">
          {book.imageUrl && (
            <div className="mb-4">
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
          )}
          <h3 className="text-lg font-semibold">{book.title}</h3>
          <p className="text-gray-600">Penulis: {book.author}</p>
          <p className="text-gray-600">ISBN: {book.isbn}</p>
          <div className="mt-4 flex items-center justify-between">
            <span
              className={`px-2 py-1 rounded text-sm ${
                book.status === 'available'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {book.status === 'available' ? 'Tersedia' : 'Dipinjam'}
            </span>
            {book.status === 'available' ? (
              <button
                onClick={() => onBorrow(book)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center gap-1"
              >
                <UserCheck size={16} />
                Pinjam
              </button>
            ) : (
              <button
                onClick={() => onReturn(book)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1"
              >
                <BookOpen size={16} />
                Kembalikan
              </button>
            )}
          </div>
          {book.status === 'borrowed' && (
            <div className="mt-2 text-sm text-gray-600">
              <p>Peminjam: {book.borrower}</p>
              <p>Tanggal Pinjam: {book.borrowDate}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
