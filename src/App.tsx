import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import BorrowingPage from './pages/BorrowingPage';
import AddBookPage from './pages/AddBookPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <main className="flex-1 p-8 ml-64">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/peminjaman" element={<BorrowingPage />} />
            <Route path="/tambah-buku" element={<AddBookPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
