import { useState, useEffect } from 'react';
import { Book, Bookmark, ShoppingCart } from 'lucide-react';
import ShoppingCartModal from './Shopping';

const BooksSection = () => {
  const [books, setBooks] = useState([]); // Menyimpan data buku
  const [loading, setLoading] = useState(true); // Status loading
  const [filter, setFilter] = useState('all'); // Filter genre buku
  const [selectedBook, setSelectedBook] = useState(null); // Buku yang dipilih
  const [isCartOpen, setIsCartOpen] = useState(false); // Status modal keranjang

  // Menangani penambahan buku ke keranjang
  const handleAddToCart = (book) => {
    setSelectedBook(book);
    setIsCartOpen(true);
  };

  // Menutup modal keranjang
  const handleCloseCart = () => {
    setIsCartOpen(false);
    setSelectedBook(null);
  };

  // Fetch data buku dari server
  useEffect(() => {
    fetch('http://localhost:5000/book')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBooks(data); // Pastikan data adalah array
        } else {
          console.error('Invalid data format:', data);
          setBooks([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching books:', err);
        setBooks([]);
        setLoading(false);
      });
  }, []);

  // Mendapatkan URL gambar buku
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/300x400?text=No+Image';
    return `http://localhost:5000/uploads/${imagePath.split('/').pop()}`;
  };

  // Genre unik untuk filter
  const genres = ['all', ...new Set(books.map(book => book.genre))];

  // Buku yang difilter berdasarkan genre
  const filteredBooks = filter === 'all' 
    ? books 
    : books.filter(book => book.genre.toLowerCase() === filter.toLowerCase());

  // Menampilkan status loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-red-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading books...</div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-red-900 py-20 px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Explore Our Collection</h2>
          <p className="text-white/80 text-base max-w-xl mx-auto">
            Discover our carefully curated selection of books across various genres.
          </p>
        </div>

        {/* Genre Filter */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => setFilter(genre)}
              className={`px-5 py-1.5 rounded-full text-sm transition-all duration-300 ${
                filter === genre
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/50'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </button>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredBooks.map(book => (
            <div
              key={book.id}
              className="group bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={getImageUrl(book.image)}
                  alt={book.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <h3 className="text-lg font-bold text-white truncate">{book.name}</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-white/80 text-sm">
                    <Book className="w-3.5 h-3.5 mr-2" />
                    <span>{book.genre}</span>
                  </div>
                  <div className="flex items-center text-white/80 text-sm">
                    <Bookmark className="w-3.5 h-3.5 mr-2" />
                    <span>{book.pages} pages</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-xl font-bold text-white">${book.prices}</span>
                  <button
                    className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md transition-colors duration-300 text-sm"
                    onClick={() => handleAddToCart(book)}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No books found */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/80 text-lg">No books found in this category</p>
          </div>
        )}
      </div>

      {/* Shopping Cart Modal */}
      <ShoppingCartModal 
        isOpen={isCartOpen} 
        onClose={handleCloseCart} 
        selectedBook={selectedBook} 
      />
    </section>
  );
};

export default BooksSection;
