import { useState, useEffect } from 'react';
import { Book } from '../types/Book';
import { db } from '../firebase/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';

const INITIAL_BOOKS: Book[] = [
  {
    id: '1',
    title: 'Matematika Kelas X',
    author: 'Departemen Pendidikan',
    isbn: '978-602-1234-11-1',
    type: 'Pelajaran',
    status: 'available'
  },
  {
    id: '2',
    title: 'Biologi Kelas X',
    author: 'Departemen Pendidikan',
    isbn: '978-602-1234-11-2',
    type: 'Pelajaran',
    status: 'available'
  },
  {
    id: '3',
    title: 'Fisika Kelas X',
    author: 'Departemen Pendidikan',
    isbn: '978-602-1234-11-3',
    type: 'Pelajaran',
    status: 'available'
  },
  {
    id: '4',
    title: 'Kimia Kelas X',
    author: 'Departemen Pendidikan',
    isbn: '978-602-1234-11-4',
    type: 'Pelajaran',
    status: 'available'
  }
];

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // Get books from Firestore
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const booksCollection = collection(db, 'books');
        const q = query(booksCollection, orderBy('title'));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          // Initialize with sample books if collection is empty
          await initializeBooks();
        } else {
          const bookData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Book[];
          
          setBooks(bookData);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Initialize Firestore with sample books if empty
  const initializeBooks = async () => {
    try {
      const booksCollection = collection(db, 'books');
      const initialBookPromises = INITIAL_BOOKS.map(book => {
        // Remove the id as Firestore will generate one
        const { id, ...bookData } = book;
        return addDoc(booksCollection, bookData);
      });
      
      const docRefs = await Promise.all(initialBookPromises);
      
      // Create books array with Firestore IDs
      const initializedBooks = INITIAL_BOOKS.map((book, index) => ({
        ...book,
        id: docRefs[index].id
      }));
      
      setBooks(initializedBooks);
    } catch (error) {
      console.error("Error initializing books:", error);
    }
  };

  const addBook = async (book: Omit<Book, 'id' | 'status'>) => {
    try {
      setLoading(true);
      const newBook = {
        ...book,
        status: 'available' as const
      };
      
      const booksCollection = collection(db, 'books');
      const docRef = await addDoc(booksCollection, newBook);
      
      const bookWithId = {
        ...newBook,
        id: docRef.id,
      };
      
      setBooks(prevBooks => [...prevBooks, bookWithId]);
    } catch (error) {
      console.error("Error adding book:", error);
    } finally {
      setLoading(false);
    }
  };

  const borrowBook = async (bookId: string, borrower: string) => {
    try {
      setLoading(true);
      const bookRef = doc(db, 'books', bookId);
      
      const updateData = {
        status: 'borrowed' as const,
        borrower,
        borrowDate: new Date().toLocaleDateString('id-ID')
      };
      
      await updateDoc(bookRef, updateData);
      
      setBooks(prevBooks =>
        prevBooks.map(book =>
          book.id === bookId
            ? { ...book, ...updateData } as Book
            : book
        )
      );
    } catch (error) {
      console.error("Error borrowing book:", error);
    } finally {
      setLoading(false);
    }
  };

  const returnBook = async (bookId: string) => {
    try {
      setLoading(true);
      const bookRef = doc(db, 'books', bookId);
      
      const updateData = {
        status: 'available' as const,
        borrower: null,
        borrowDate: null
      };
      
      await updateDoc(bookRef, updateData);
      
      setBooks(prevBooks =>
        prevBooks.map(book =>
          book.id === bookId
            ? {
                ...book,
                status: 'available' as const,
                borrower: undefined,
                borrowDate: undefined
              } as Book
            : book
        )
      );
    } catch (error) {
      console.error("Error returning book:", error);
    } finally {
      setLoading(false);
    }
  };

  return { books, addBook, borrowBook, returnBook, loading };
}
