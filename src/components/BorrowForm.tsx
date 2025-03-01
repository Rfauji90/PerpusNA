import { useState } from 'react';
import { Book } from '../types/Book';

interface BorrowFormProps {
  onSubmit: (borrower: string, book: Book) => void;
  selectedBook: Book | null;
  onCancel: () => void;
}

export default function BorrowForm({ onSubmit, selectedBook, onCancel }: BorrowFormProps) {
  const [borrower, setBorrower] = useState('');

  if (!selectedBook) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(borrower, selectedBook);
    setBorrower('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Form Peminjaman Buku</h2>
        <p className="mb-4">
          Buku: <span className="font-semibold">{selectedBook.title}</span>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nama Peminjam</label>
            <input
              type="text"
              value={borrower}
              onChange={(e) => setBorrower(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Konfirmasi Peminjaman
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
