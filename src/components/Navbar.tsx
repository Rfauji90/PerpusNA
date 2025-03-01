import { Link } from 'react-router-dom';
import { Book, Settings, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <Book />
          Perpustakaan Sekolah
        </Link>
        <div className="flex gap-4">
          <Link to="/" className="hover:text-blue-200 flex items-center gap-1">
            <Book size={18} />
            Daftar Buku
          </Link>
          <Link to="/peminjaman" className="hover:text-blue-200 flex items-center gap-1">
            <User size={18} />
            Peminjaman
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/admin" className="hover:text-blue-200 flex items-center gap-1">
                <Settings size={18} />
                Admin Panel
              </Link>
              <button 
                onClick={logout}
                className="hover:text-blue-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/admin/login" className="hover:text-blue-200 flex items-center gap-1">
              <Settings size={18} />
              Admin Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
