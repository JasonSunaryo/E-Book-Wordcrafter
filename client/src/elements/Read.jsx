import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ImageOff, Book, BookOpen } from "lucide-react";
import axios from "axios";

function Read() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/get_book/${id}`)
      .then((res) => {
        console.log('Book data:', res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Function to handle image error
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
  };

  // Function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    return `http://localhost:5000/uploads/${imagePath.split('/').pop()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto mt-[5rem]">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-blue-600">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Book className="h-6 w-6" />
                Book Details
              </h1>
              <Link
                to="/home"
                className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Home
              </Link>
            </div>
          </div>

          {data.map((book) => (
            <div key={book.id} className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {book.image ? (
                    <img
                      src={getImageUrl(book.image)}
                      alt={book.name}
                      className="w-full h-[400px] object-cover rounded-lg shadow-md"
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
                      <ImageOff className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-6 space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-500 font-medium">Book Name</label>
                      <p className="text-xl font-semibold text-gray-900">{book.name}</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-gray-500 font-medium">Genre</label>
                      <p className="text-lg text-gray-900">{book.genre}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-500 font-medium">Pages</label>
                        <p className="text-lg text-gray-900">{book.pages}</p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm text-gray-500 font-medium">Price</label>
                        <p className="text-lg font-medium text-blue-600">
                          ${Number(book.prices).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <div className="flex items-center gap-2 text-gray-500">
                        <BookOpen className="h-5 w-5" />
                        <span className="text-sm">Book ID: #{book.id}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Read;