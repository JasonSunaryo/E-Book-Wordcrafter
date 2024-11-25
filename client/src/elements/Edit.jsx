import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Home, Save, Loader2, BookOpen } from "lucide-react";

function Edit() {
  const [values, setValues] = useState({
    name: "",
    genre: "",
    pages: "",
    prices: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/get_book/${id}`)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setValues(res.data[0]);
          if (res.data[0].image) {
            setCurrentImage(`http://localhost:5000/uploads/${res.data[0].image}`);
          }
        }
      })
      .catch((err) => console.error("Error fetching book details:", err));
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("genre", values.genre);
    formData.append("pages", values.pages);
    formData.append("prices", values.prices);
    
    if (image) {
      formData.append("image", image);
    }

    axios
      .put(`http://localhost:5000/update_book/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setLoading(false);
        navigate("/home");
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto mt-[5rem]">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <BookOpen className="text-blue-600 h-8 w-8" />
              <h1 className="text-3xl font-bold text-gray-900">Edit Book</h1>
            </div>
            <Link
              to="/home"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Home size={20} />
              Home
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Book Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={values.name}
                onChange={(e) =>
                  setValues((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 px-4 py-2.5 bg-gray-50"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="genre"
                className="block text-sm font-medium text-gray-700"
              >
                Genre
              </label>
              <input
                type="text"
                name="genre"
                id="genre"
                required
                value={values.genre}
                onChange={(e) =>
                  setValues((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 px-4 py-2.5 bg-gray-50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label
                  htmlFor="pages"
                  className="block text-sm font-medium text-gray-700"
                >
                  Number of Pages
                </label>
                <input
                  type="number"
                  name="pages"
                  id="pages"
                  required
                  value={values.pages}
                  onChange={(e) =>
                    setValues((prevState) => ({
                      ...prevState,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 px-4 py-2.5 bg-gray-50"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="prices"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="prices"
                  id="prices"
                  required
                  value={values.prices}
                  onChange={(e) =>
                    setValues((prevState) => ({
                      ...prevState,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 px-4 py-2.5 bg-gray-50"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Book Cover Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 px-4 py-2.5 bg-gray-50"
              />
              {(imagePreview || currentImage) && (
                <div className="mt-4">
                  <img
                    src={imagePreview || currentImage}
                    alt="Book Cover Preview"
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    Update Book
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edit;