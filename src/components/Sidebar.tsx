import { Link, useLocation } from 'react-router-dom';
import { Book, LibraryBig, CirclePlus, UserCheck } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ to, icon: Icon, children }: { to: string; icon: any; children: React.ReactNode }) => (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        isActive(to)
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
      }`}
    >
      <Icon size={20} />
      <span>{children}</span>
    </Link>
  );

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-8">
        <LibraryBig className="text-blue-600" size={32} />
        <span className="text-xl font-semibold text-gray-800">BookBuddy</span>
      </div>

      <nav className="space-y-2">
        <NavItem to="/" icon={Book}>
          Daftar Buku
        </NavItem>
        <NavItem to="/peminjaman" icon={UserCheck}>
          Peminjaman
        </NavItem>
        <NavItem to="/tambah-buku" icon={CirclePlus}>
          Tambah Buku
        </NavItem>
      </nav>
    </div>
  );
}
