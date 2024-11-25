import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, ShoppingCart } from 'lucide-react';

// Custom Card Component
const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-gray-900 text-white p-6 m-4 rounded-xl shadow-xl ${className}`}>
      {children}
    </div>
  );
};

const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/300x400?text=No+Image';
  return `http://localhost:5000/uploads/${imagePath.split('/').pop()}`;
};

// Shopping Cart Modal
const ShoppingCartModal = ({ isOpen, onClose, selectedBook }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (selectedBook && !cartItems.find(item => item.id === selectedBook.id)) {
      setCartItems(prev => [...prev, { ...selectedBook, quantity: 1 }]);
    }
  }, [selectedBook]);

  useEffect(() => {
    const newTotal = cartItems.reduce((sum, item) => sum + item.prices * item.quantity, 0);
    setTotal(newTotal);
  }, [cartItems]);

  const updateQuantity = (bookId, change) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.id === bookId) {
            const newQuantity = Math.max(0, item.quantity + change);
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter(item => item.quantity > 0)
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            <h2 className="text-xl font-bold">Shopping Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div
              className="space-y-4 mb-6 overflow-y-auto"
              style={{ maxHeight: '300px' }} // You can adjust the height here
            >
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg"
                >
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    className="w-20 h-28 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-400">{item.genre}</p>
                    <p className="text-red-500 font-bold mt-1">${item.prices}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    {/* Updated and smaller styling for 'month access' */}
                    <span className="w-20 text-center text-sm font-medium bg-gray-600 rounded-full py-1 text-white">
                      {item.quantity} month access
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg">Total:</span>
                <span className="text-2xl font-bold text-red-500">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={() => {
                  // Handle checkout logic here
                  alert('Proceeding to checkout...');
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default ShoppingCartModal;
