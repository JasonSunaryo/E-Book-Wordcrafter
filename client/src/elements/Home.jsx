// Di komponen Home, update bagian rendering gambar
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Edit, Trash2, PlusCircle, ImageOff } from "lucide-react";
import "../output.css";

function Home() {
  const [deleted, setDeleted] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (deleted) {
      setDeleted(false);
      axios
        .get("http://localhost:5000/book")
        .then((res) => {
          console.log("Fetched Books:", res.data);
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [deleted]);

  function handleDelete(id) {
    axios
      .delete(`http://localhost:5000/delete/${id}`)
      .then((res) => {
        console.log(res.data.success);
        setDeleted(true);
      })
      .catch((err) => console.log(err));
  }

  // Function to handle image error
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/150?text=No+Image";
  };

  // Function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    return `http://localhost:5000/uploads/${imagePath.split('/').pop()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-8 ">
      {/* Rest of the component stays the same until the image rendering part */}
      <div className="max-w-7xl mx-auto mt-[5rem]">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-blue-900">
              Books Management
            </h1>
            <Link
              to="/create"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
            >
              <PlusCircle size={20} />
              Add Book
            </Link>
          </div>

          {data.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 text-lg">No books available</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg shadow-md">
              <table className="w-full text-left border-collapse bg-white">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="px-6 py-3 font-semibold">ID</th>
                    <th className="px-6 py-3 font-semibold">Image</th>
                    <th className="px-6 py-3 font-semibold">Name</th>
                    <th className="px-6 py-3 font-semibold">Genre</th>
                    <th className="px-6 py-3 font-semibold">Pages</th>
                    <th className="px-6 py-3 font-semibold">Prices</th>
                    <th className="px-6 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((book) => (
                    <tr
                      key={book.id}
                      className="hover:bg-gray-50 transition-all"
                    >
                      <td className="px-6 py-4">{book.id}</td>
                      <td className="px-6 py-4">
                        {book.image ? (
                          <img
                            src={getImageUrl(book.image)}
                            alt={book.name}
                            className="w-24 h-24 object-cover rounded-md"
                            onError={handleImageError}
                          />
                        ) : (
                          <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center">
                            <ImageOff className="text-gray-400" size={32} />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium">{book.name}</td>
                      <td className="px-6 py-4">{book.genre}</td>
                      <td className="px-6 py-4">{book.pages}</td>
                      <td className="px-6 py-4">{book.prices}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          <Link
                            to={`/read/${book.id}`}
                            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition-all"
                          >
                            <BookOpen size={16} />
                            Read
                          </Link>
                          <Link
                            to={`/edit/${book.id}`}
                            className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow transition-all"
                          >
                            <Edit size={16} />
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(book.id)}
                            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition-all"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;